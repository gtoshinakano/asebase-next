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
      SELECT e.province_code, e.year, e.type, e.started_in, e.ended_in, e.university_name, e.company_name, e.organization_id, e.exchange_title, e.study_area, e.study_title, e.study_description, e.exchange_url, e.exchange_name, o.org_name
      FROM exchange e, organization o
      WHERE e.user_id=? AND o.id=e.organization_id
      ORDER BY e.year ASC
    `,[token.sub]);
    return res.status(200).json(result);
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
}

export default get;