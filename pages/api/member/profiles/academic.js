import { query } from '@lib/db';
import {getSession} from 'next-auth/react';
import _ from 'lodash';

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
      SELECT institution_name, subject, year, study_area
      FROM  academic_info 
      WHERE user_id=?
      ORDER BY year ASC
    `,
      [uid]
    );
    return res.status(200).json(result);
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
}

export default get;
