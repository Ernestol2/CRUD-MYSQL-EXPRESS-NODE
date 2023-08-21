import { pool } from "../dbconnection.js";

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);

    if (rows.length <= 0)
      return res.status(404).json({
        message: "No Employee Found",
      });

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const createEmployee = async (req, res) => {
  const { name, salary } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO employee (name, salary) VALUES (?, ?)",
      [name, salary]
    );

    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query("DELETE FROM employee WHERE id = ?", [id]);
  try {
    if (rows.affectedRows <= 0)
      return res.status(404).json({
        message: "No Employee found under that id",
      });

    res.json({
      affectedRows: rows.affectedRows,
      message: `user with id: ${id} was deleted`,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
      [name, salary, id]
    );

    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "no user found",
      });

    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
