import { query } from '@lib/db';
import { getSession } from 'next-auth/react';
import { getConnection } from 'typeorm';
import { prepareConnection } from '@typeorm/db';
import _ from 'lodash';
import { UserEntity } from '@entities/Auth';
import { NikkeiInfo } from '@entities/Member';

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

    const nikkeiInfo = await db
      .getRepository(NikkeiInfo)
      .find({ where: { user_id: uid }, relations: ['province_code'] });

    const result = nikkeiInfo.map((i) => ({
      name: i.province_code.name,
      degree: i.degree,
    }));
    if (result.length > 0) {
      const degreeLength = _.map(result, (i) => i.degree).reduce((a, b) =>
        a.length > b.length ? a : b
      ).length;
      let form = {
        jp_generation: genByDegreeMaxLenght[degreeLength],
        jpFamilyMembers: _.map(result, (i) => i.degree),
        jpFamilyOrigins: _.reduce(
          result,
          (acc, cur) => {
            acc[cur.degree] = cur.name;
            return acc;
          },
          {}
        ),
      };
      return res.status(200).json(form);
    } else {
      return res
        .status(200)
        .json({ jp_generation: 2, jpFamilyMembers: [], jpFamilyOrigins: {} });
    }
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
}

export default get;

const genByDegreeMaxLenght = {
  1: 2,
  3: 3,
  5: 4,
  7: 5,
};
