import mysql from "mysql2/promise"

export const dbconnect = mysql.createPool({
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	user: process.env.DATABASE_USER,
	database: process.env.DATABASE_NAME,
	password: process.env.DATABASE_PASSWORD,
})