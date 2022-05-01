import { getSession } from 'next-auth/react';
import { query, insertId } from '@lib/db';

const get = async (req, res) => {
  const session = await getSession({ req });

  if (!session)
    res.status(401).json({ message: 'I refuse to shake hands with you' });
  else {
    const user_id = await query(
      'SELECT id FROM users WHERE email=?',
      session.user.email
    ); 

    const uid = user_id[0].id

    const user_info = await query(
      'SELECT id FROM users_info WHERE auth_id=?',
      [uid]
    ); 

    if (user_info.length === 0) {
      // There is no user_info, so let's create one
      const newId = await insertId(
        'INSERT INTO users_info(auth_id, blocked) VALUES(?, ?)',
        [uid, 0]
      );
      res.status(200).json({ message: 'User Info Created', uid: newId });
    } else {
      const userInfo = user_info[0];

      if (userInfo.blocked)
        res.status(403).json({
          message: 'You are blocked for transgressing our Terms of Use',
          action: 'force-sign-out-user',
        });
      else
        res.status(200).json({
          message: 'High Five 🖐',
          data: {
            ...userInfo,
            ...session.user,
            uid: userInfo.id,
            serverTime: new Date(),
          },
        });
    }
  }
};

export default get;
