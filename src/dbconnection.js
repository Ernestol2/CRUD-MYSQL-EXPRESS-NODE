import pg from 'pg'
import {DATABASE_URL} from './config.js'

const connectionString = DATABASE_URL


export const pool = new pg.Pool({
    connectionString,
    
})
