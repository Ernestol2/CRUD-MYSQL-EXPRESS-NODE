import { pool } from '../dbconnection.js';

export const ping = async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()')
        res.status(200).json({
            message: 'pong',
            time: result.rows[0]
        })
    } catch (error) {
        return res.status(500).json('internal server error') 
    }
}
