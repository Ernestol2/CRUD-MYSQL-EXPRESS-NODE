import { pool } from "../dbconnection.js";

export const createTable = async (req, res) => {
  try {
    const query = `CREATE TABLE employee( id SERIAL PRIMARY KEY, name VARCHAR(45), salary INT);`
    const [result] = await pool.query(query)
    console.log(result.rows[0]);
    res.status(200).json(result.rows[0])
} catch (error) {
    console.log(error);
    return res.status(500).json('internal server error') 
}
}

export const getEmployees = async (req, res) => {
  try {
    const query = 'SELECT * FROM employee';
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error retrieving data:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

export const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'SELECT * FROM employee WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rowCount <= 0)
      return res.status(404).json({
        message: "No Employee Found",
    });

    res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const createEmployee = async (req, res) => {
  const { name, salary } = req.body;
  try {
    const query = `
      INSERT INTO employee (name, salary)
      VALUES ($1, $2)
      RETURNING id
    `;
  
    const { rows } = await pool.query(query, [name, salary]);
  
    res.json({
      id: rows[0].id,
      name,
      salary,
    });
  } catch (error) {
    console.error('Error inserting data:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
  
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM employee WHERE id = $1;'
  try {
    const result = await pool.query(query, [id]);
    if (result.rowCount <= 0)
      return res.status(404).json({
        message: "No Employee found under that id",
    }); 
    res.json({
      affectedRows: result.rowCount,
      message: `user with id: ${id} was deleted`,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error"
    });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;

  try {
    const updateQuery = `
     UPDATE employee 
     SET name = COALESCE($1, name), salary = COALESCE($2, salary) 
     WHERE id = $3;
    `;
    const result = await pool.query(updateQuery, [name, salary, id]);
    if (result.rowCount <= 0)
      return res.status(404).json({
        message: "no user found",
      });

    const response = await pool.query("SELECT * FROM employee WHERE id = $1", [id]);
    res.json(response.rows[0]);
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  } 
};
