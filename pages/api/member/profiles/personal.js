import { getSession } from 'next-auth/react';
import { prepareConnection } from '@typeorm/db';
import { UserEntity } from '@entities/Auth';
import { MemberEntity } from '@entities/Member';

async function get(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(400).json({ message: 'Not Signed' });
  }
  try {

    const db = await prepareConnection();
    const user = await db
      .getRepository(UserEntity)
      .findOne({ where: { email: session.user.email } });

    const uid = user.id;

    const user_info = await db.getRepository(MemberEntity).findOne({
      where: { auth_id: uid },
      select: [
        'id',
        'blocked',
        'is_nikkei',
        'full_name',
        'gender',
        'birth_date',
        'birth_country',
        'birth_state',
        'birth_city',
        'jp_generation',
        'map_latlng',
      ],
    });

    return res.status(200).json(user_info);
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
}

export default get;
