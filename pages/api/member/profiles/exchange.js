import { query } from '@lib/db';
import {getToken} from 'next-auth/jwt';
import _ from 'lodash';

const secret = process.env.SECRET;

async function get(req, res) {
  const token = await getToken({ req, secret });
  try {
    if (!token.sub) {
      return res.status(400).json({ message: 'Not Signed' });
    }

    const result = await query(
      `
      SELECT e.province_code, e.year, e.type, e.started_in, e.started_year, e.ended_year, e.ended_in, e.exchange_place, e.organization_id, e.study_area, e.study_title, e.study_url, e.exchange_url, e.org_exch_ref, e.org_exch_title, o.org_name, p.name AS province_name
      FROM exchange e, organization o, japan_provinces p 
      WHERE e.user_id=? AND o.id=e.organization_id AND e.province_code=p.code
      ORDER BY e.year ASC
    `,
      [token.sub]
    );

    const toRet = result.map((i) => ({
      year: i.year,
      type: i.type,
      started_in: i.started_in,
      started_year: i.started_year,
      ended_in: i.ended_in,
      ended_year: i.ended_year,
      org_name: i.org_name,
      org_exch_ref: i.org_exch_ref,
      org_exch_title: i.org_exch_title,
      exchange_place: i.exchange_place,
      study_area: i.study_area,
      study_title: i.study_title,
      study_url: i.study_url,
      province_name: i.province_name,
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
  started_in: '',
  started_year: '',
  ended_in: '',
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
