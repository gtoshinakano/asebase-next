import { getSession } from 'next-auth/react';
import _ from 'lodash';
import { prepareConnection } from '@typeorm/db';
import { UserEntity } from '@entities/Auth';
import { AcademicInfo } from '@entities/Member';

async function get(req, res) {
  const session = await getSession({ req });

  try {
    if (!session) {
      return res.status(400).json({ message: 'Not Signed' });
    }

    const db = await prepareConnection();
    const user = await db
      .getRepository(UserEntity)
      .findOne({ where: { email: session.user.email } });

    const uid = user.id;

    const academicInfo = await db.getRepository(AcademicInfo).find({
      where: { user_id: uid },
      select: ['institution_name', 'subject', 'year', 'study_area'],
    });

    return res.status(200).json(academicInfo);

  } catch (e) {
    res.status(401).json({ message: e.message });
  }
}

export default get;
