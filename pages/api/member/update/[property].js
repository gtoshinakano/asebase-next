import { query, insertId } from '@lib/db';
import * as schemas from '@Utils/Schemas/User';
import { getSession } from 'next-auth/react';
import moment from 'moment';
import { JAPAN_PROVINCES } from '@Utils/StaticData/json-data';
import _ from 'lodash';
import { MemberEntity, NikkeiInfo } from '@entities/Member';
import { prepareConnection } from '@typeorm/db';


export default async (req, res) => {
  const { property } = req.query;
  const session = await getSession({ req });

  const db = await prepareConnection();

  const user = await db.getRepository(MemberEntity).findOne({
    relations: ["auth_id"],
    where: {
      blocked: 0,
      auth_id: {
        email: session.user.email
      }
    }, 
    select: ["id", "auth_id"]
  })

  const uid = user.id

  if (req.method === 'PUT') {
    if (user.id && user.auth_id && user.auth_id.id) {
      try {
        switch (property) {
          case 'name':
            await query(
              'UPDATE users SET name=?, updated_at=NOW() WHERE auth_id = ?',
              [req.body.name, uid]
            );
            return res.json({
              serverMessage:
                'Alteração visível somente após login. Clique no balão ao lado para re-autenticar',
            });

          case 'full_name': 
          case 'birth_city':
          case 'birth_state':
          case 'gender':
            return await resSingleUpdate(db, property, req.body[property], uid, res);
          case 'birth_date':
            return await resBirthDate(db, req.body, uid, res);
          case 'is_nikkei':
            return await resIsNikkei(db, req.body, uid, res);
          case 'nikkei_info':
            return await resNikkeiInfo(req.body, uid, res);
          case 'academic_profile':
            return await resAcademicProfile(req.body, uid, res);
          case 'professional_profile':
            return await resProfessionalProfile(req.body, uid, res);
          case 'exchange_profile':
            return await resExchangeInfo(req.body, uid, res);
          default:
            return res.status(400).json({ serverMessage: 'Bad Request' });
        }
      } catch (e) {
        res.json({ errorMessage: e.message });
      }
    } else {
      res.json({ errorMessage: 'Error checking credentials' });
    }
  } else if (req.method === 'DELETE') {
    if (!checkedUser.hasError) {
      try {
        switch (property) {
          case 'academic_profile':
            await query('DELETE FROM academic_info WHERE user_id = ?', [uid]);
            return res.status(200).json({ log: 'Delete Done' });
          case 'professional_profile':
            await query('DELETE FROM professional_data WHERE user_id = ?', [
              uid,
            ]);
            return res.status(200).json({ log: 'Delete Done' });
          case 'exchange_profile':
            await query('DELETE FROM exchange WHERE user_id = ?', [uid]);
            return res.status(200).json({ log: 'Delete Done' });
          default:
            return res.status(400).json({ serverMessage: 'Bad Request' });
        }
      } catch (e) {
        res.json({ errorMessage: e.message });
      }
    } else {
      res.json({ errorMessage: 'Error checking credentials' });
    }
  } else {
    res.json({ errorMessage: 'Bad Request' });
  }
};

const resBirthDate = async (db, body, uid, res) => {
  const date = moment(body.birth_date, 'DD/MM/YYYY', true);
  if (!date.isValid()) return res.status(400).json({ serverMessage: 'Invalid date' });
  else return await resSingleUpdate(db, "birth_date", date.format('YYYY-MM-DD HH:mm:ss'), uid, res)
};

const resSingleUpdate = async (db, field, value, uid, res) => {
  await db
    .getRepository(MemberEntity)
    .createQueryBuilder()
    .update(MemberEntity)
    .set({[field]: value})
    .where("id= :uid", {uid})
    .execute()
  return res.status(200).json({ log: 'Update Done' });
};

const resIsNikkei = async (db, body, uid, res) => {
  try {
    const { is_nikkei } = body;
    await db
      .getRepository(MemberEntity)
      .createQueryBuilder()
      .update(MemberEntity)
      .set({"is_nikkei": is_nikkei})
      .where("id= :uid", {uid})
      .execute()
    if (!is_nikkei) {
      await db
        .getRepository(NikkeiInfo)
        .createQueryBuilder()
        .delete()
        .from(NikkeiInfo)
        .where("user_id = :uid", { uid })
        .execute()
    }
    return res.status(200).json({ log: 'Update Done' });
  } catch (e) {
    return res.status(400).json({ serverMessage: JSON.stringify(e) });
  }
};

const resNikkeiInfo = async (body, sub, res) => {
  try {
    const error = schemas.NikkeiProfile.check(body);
    if (Object.values(error).filter((e) => e.hasError).length > 0) {
      return res.status(401).json({ ...error });
    } else {
      await query('DELETE FROM japanese_origins WHERE user_id=?', [sub]);
      const { jpFamilyOrigins } = body;
      const promises = Object.keys(jpFamilyOrigins).map((key) => {
        const [jp_code] = _.filter(
          JAPAN_PROVINCES,
          (f) => f.name === jpFamilyOrigins[key]
        );
        return query('INSERT INTO japanese_origins VALUES(?, NULL, ?, ?)', [
          sub,
          key,
          jp_code.code,
        ]);
      });
      await Promise.all(promises);
      return res.status(200).json({ log: 'Update Done' });
    }
  } catch (e) {
    return res.status(401).json({ serverMessage: JSON.stringify(e) });
  }
};

const resAcademicProfile = async (body, sub, res) => {
  try {
    const error = schemas.AcademicList.check(body);
    if (Object.values(error).filter((e) => e.hasError).length > 0) {
      return res.status(401).json({ ...error });
    } else {
      await query('DELETE FROM academic_info WHERE user_id=?', [sub]);
      const promises = Object.values(body).map((item) => {
        return query('INSERT INTO academic_info(id, institution_name, user_id, subject, year, study_area) VALUES(NULL,?, ?, ?, ?, ?)', [
          item.institution_name,
          sub,
          item.subject,
          item.year,
          item.study_area,
        ]);
      });
      await Promise.all(promises).then((resp) => console.log(resp));
      return res.status(200).json({ log: 'Update Done' });
    }
  } catch (e) {
    return res.status(401).json({ serverMessage: JSON.stringify(e) });
  }
};

const resProfessionalProfile = async (body, sub, res) => {
  try {
    const error = schemas.ProfessionalList.check(body);
    if (Object.values(error).filter((e) => e.hasError).length > 0) {
      return res.status(401).json({ ...error });
    } else {
      await query('DELETE FROM professional_data WHERE user_id=?', [sub]);
      const promises = Object.values(body).map((item) => {
        return query(
          'INSERT INTO professional_data(id, start_year, end_year, position, company_name, current_job, user_id) VALUES(NULL,?, ?, ?, ?, ?, ?)',
          [
            item.start_year,
            item.end_year,
            item.position,
            item.company_name,
            item.current_job,
            sub,
          ]
        );
      });
      await Promise.all(promises).then((resp) => console.log(resp));
      return res.status(200).json({ log: 'Update Done' });
    }
  } catch (e) {
    return res.status(401).json({ serverMessage: JSON.stringify(e) });
  }
};

const resExchangeInfo = async (body, sub, res) => {
  const error = schemas.ExchangeList.check(body);
  if (Object.values(error).filter((e) => e.hasError).length > 0) {
    return res.status(401).json({ ...error });
  } else {
    try {
      await query('DELETE FROM exchanges WHERE user_id=?', [sub]);
      let promises = [];
      Object.values(body).forEach(async (item) => {
        const searchOrg = await query(
          'SELECT id FROM organizations WHERE org_name=?',
          [item.org_name]
        );
        let org_id;
        if (searchOrg.length === 1) org_id = searchOrg[0].id;
        else {
          org_id = await insertId(
            'INSERT INTO organizations (id, org_name, is_verified) VALUES(NULL, ?, ?)',
            [item.org_name, '', '']
          );
        }
        const [p_code] = _.filter(
          JAPAN_PROVINCES,
          (f) => f.name === item.province_name
        );
        promises.push(
          query(
            'INSERT INTO exchanges (id, user_id, province_code, year, type, started_month, started_year, ended_month, ended_year, exchange_place, organization_id, study_area, study_title, study_url, exchange_url, org_exch_ref, org_exch_title) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
              sub,
              p_code.code,
              item.year,
              item.type,
              item.started_month,
              item.started_year,
              item.ended_month,
              item.ended_year,
              item.exchange_place,
              org_id,
              item.study_area,
              item.study_title,
              item.study_url,
              item.exchange_url,
              item.org_exch_ref,
              item.org_exch_title,
            ]
          )
        );
      });
      return await Promise.all(promises).then(() => {
        res.status(200).json({ log: 'Update Done', data: Object.values(body) });
      });
    } catch (e) {
      console.log(e);
      return res.status(401).json({ serverMessage: JSON.stringify(e) });
    }
  }
};
