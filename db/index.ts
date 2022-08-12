import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT) || 5432,
});

export default { query: (text: string,param?: (string|number)[]) => pool.query(text,param) };



// CREATE TABLE users(
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(30) NOT NULL UNIQUE,
//     email VARCHAR(254) UNIQUE,
//     firstname VARCHAR(30) NOT NULL,
//     lastname VARCHAR(30) NOT NULL,
//     passhash VARCHAR NOT NULL
// );