import { query } from '@lib/db';
import {getSession} from 'next-auth/react';

async function get(req, res) {
  const session = await getSession({ req });
  try {
    if (!session) {
      return res.status(400).json({ message: 'Not Signed' });
    }

    const user_id = await query(
      'SELECT id FROM users WHERE email=?',
      session.user.email
    ); 

    const uid = user_id[0].id

    const result = await query(
      `
      SELECT full_name, gender, birth_date, birth_country, birth_state, birth_city, is_nikkei, jp_generation, map_latlng
      FROM users_info
      WHERE auth_id = ?
    `,
      [uid]
    );
    return res.status(200).json(result[0]);
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
}

export default get;
