import { query } from '@lib/db';
import {getToken} from 'next-auth/jwt';

const secret = process.env.SECRET;

async function get(req, res) {
  const token = await getToken({ req, secret });
  try {
    if (!token.sub) {
      return res.status(400).json({ message: 'Not Signed' });
    }
    const result = await query(
      `
      SELECT full_name, gender, birth_date, birth_country, birth_state, birth_city, is_nikkei, jp_generation, map_latlng
      FROM users_info
      WHERE auth_id = ?
    `,
      [token.sub]
    );
    return res.status(200).json(result[0]);
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
}

export default get;
