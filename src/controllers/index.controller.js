import {pool} from '../dbconnection.js';

export const ping = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT "pong"  AS result')
        res.json(result[0])
    } catch (error) {
        return res.status(500).json('internal server error')
    }
}