import { getSession } from 'next-auth/react';
import { prepareConnection } from '@typeorm/db';
import { UserEntity } from '@entities/Auth';
import { MemberEntity } from '@entities/Member';
import { getConnection } from 'typeorm';

const get = async (req, res) => {
  const session = await getSession({ req });

  if (!session)
    res.status(401).json({ message: 'I refuse to shake hands with you' });
  else {
    const db = await prepareConnection();
    const user = await db
      .getRepository(UserEntity)
      .findOne({ where: { email: session.user.email } });

    const uid = user.id;

    const user_info = await db.getRepository(MemberEntity).findOne({
      where: { auth_id: uid },
      select: ['id', 'blocked', 'is_nikkei'],
    });

    if (!user_info) {
      // There is no user_info, so let's create one
      const inserted = await getConnection()
        .createQueryBuilder()
        .insert()
        .into('users_info')
        .values({ auth_id: uid, blocked: 0 })
        .execute();

      res.status(200).json({
        message: 'User Info Created',
        data: { uid: inserted.identifiers[0].id },
      });
    } else {
      if (user_info.blocked)
        res.status(403).json({
          message: 'You are blocked for transgressing our Terms of Use',
          action: 'force-sign-out-user',
        });
      else
        res.status(200).json({
          message: 'High Five 🖐',
          data: {
            ...user_info,
            ...session.user,
            uid: user_info.id,
            serverTime: new Date(),
          },
        });
    }
  }
};

export default get;
