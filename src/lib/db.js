// get the client
import mysql from 'serverless-mysql';

const config = {
  config: {
    host: process.env.DB_HOST,
    port:  parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  }
}

// create the connection to database
const db = mysql(config);

export async function query( q, values) {
  try {
    const results = await db.query(q, values)
    await db.end()
    return results
  } catch (e) {
    throw Error(e.message)
  }
}