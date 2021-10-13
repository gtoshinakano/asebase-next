import { query } from '@lib/db';
import jwt from 'next-auth/jwt';
import _ from 'lodash'

const secret = process.env.SECRET;

async function get(req, res) {
  const token = await jwt.getToken({ req, secret });
  try {
    if (!token.sub) {
      return res.status(400).json({ message: 'Not Signed' });
    }

    const result = await query(`
      SELECT start_year, end_year, position, company_name, current_job
      FROM  professional_data 
      WHERE user_id=?
      ORDER BY start_year ASC
    `,[token.sub]);
    return res.status(200).json(result);
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
}

export default get;