"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT) || 5432,
});
exports.default = { query: (text, param) => pool.query(text, param) };
// CREATE TABLE users(
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(30) NOT NULL UNIQUE,
//     email VARCHAR(254) UNIQUE,
//     firstname VARCHAR(30) NOT NULL,
//     lastname VARCHAR(30) NOT NULL,
//     passhash VARCHAR NOT NULL
// );
