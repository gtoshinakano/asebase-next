// get the client
import mysql from 'serverless-mysql';

const config = {
  config: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    timezone: 'Z',
  },
};

// create the connection to database
export const db = mysql(config);

export async function query(q, values) {
  try {
    const results = await db.query(q, values);
    await db.end();
    return results;
  } catch (e) {
    throw Error(e.message);
  }
}

export async function insertId(q, values) {
  try {
    const results = await db.query(q, values).then((r) => r.insertId);
    await db.end();
    return results;
  } catch (e) {
    throw Error(e.message);
  }
}
