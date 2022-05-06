import { getSession } from 'next-auth/react';
import _ from 'lodash';
import { prepareConnection } from '@typeorm/db';
import { UserEntity } from '@entities/Auth';
import { ExchangeEntity } from '@entities/Member';

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

    const exchange = await db.getRepository(ExchangeEntity)
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.organization_id','o','e.organization_id = o.id')
      .leftJoinAndSelect('e.province_code','p','e.province_code = p.code')
      .where('e.user_id = :uid', {uid})
      .getMany()

    const toRet = exchange.map((i) => ({
      year: i.year,
      type: i.type,
      started_month: i.started_month,
      started_year: i.started_year,
      ended_month: i.ended_month,
      ended_year: i.ended_year,
      org_name: i.organization_id.org_name,
      org_exch_ref: i.org_exch_ref,
      org_exch_title: i.org_exch_title,
      exchange_place: i.exchange_place,
      study_area: i.study_area,
      study_title: i.study_title,
      study_url: i.study_url,
      province_name: i.province_code.name,
    }));

    return res.status(200).json(toRet);
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
}

export default get;

export const _item = {
  year: '',
  type: 1,
  started_month: '',
  started_year: '',
  ended_month: '',
  ended_year: '',
  org_name: '',
  org_exch_ref: '',
  org_exch_title: '',
  exchange_place: '',
  study_area: 1,
  study_title: '',
  study_url: '',
  province_name: 'Japão',
};
