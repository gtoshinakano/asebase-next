import { query } from '@lib/db';
import { getSessionUserInfoId } from '@Helpers';
import * as schemas from '@Utils/Schemas/User'
import jwt from 'next-auth/jwt';
import moment from 'moment';

const secret = process.env.SECRET;

export default async (req, res) => {
  const { property } = req.query;
  const token = await jwt.getToken({ req, secret });

  if (req.method === 'PUT') {
    const checkedUser = await getSessionUserInfoId(token.sub);
    if (!checkedUser.hasError) {
      try {
        switch (property) {
          case 'name':
            await query(
              'UPDATE users SET name=?, updated_at=NOW() WHERE auth_id = ?',
              [req.body.name, token.sub]
            );
            return res.json({
              serverMessage:
                'Alteração visível somente após login. Clique no balão ao lado para re-autenticar',
            });
          case 'full_name':
            return await resSingleUpdate(
              'full_name',
              req.body.full_name,
              token.sub,
              res
            );
          case 'birth_city':
            return await resSingleUpdate(
              'birth_city',
              req.body.birth_city,
              token.sub,
              res
            );
          case 'birth_state':
            return await resSingleUpdate(
              'birth_state',
              req.body.birth_state,
              token.sub,
              res
            );
          case 'gender':
            return await resSingleUpdate(
              'gender',
              req.body.gender,
              token.sub,
              res
            );
          case 'birth_date':
            return await resBirthDate(req.body, token.sub, res);
          case 'is_nikkei':
            return await resIsNikkei(req.body, token.sub, res);
          case '':
            return await resNikkeiInfo(req.body, token.sub, res)
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

const resBirthDate = async (body, sub, res) => {
  const date = moment(body.birth_date, 'DD/MM/YYYY', true);
  if (!date.isValid())
    return res.status(400).json({ serverMessage: 'Wrong Format' });
  else {
    await query(
      'UPDATE users_info SET birth_date=?, updated_at=NOW() WHERE auth_id = ?',
      [date.format('YYYY-MM-DD HH:mm:ss'), sub]
    );
    return res.status(200).json({ log: 'Update Done' });
  }
};

const resSingleUpdate = async (field, value, sub, res) => {
  await query(
    `UPDATE users_info SET ${field}=?, updated_at=NOW() WHERE auth_id = ?`,
    [value, sub]
  );
  return res.status(200).json({ log: 'Update Done' });
};

const resIsNikkei = async (body, sub, res) => {
  try {
    const [user] = await query(
      'SELECT id, blocked FROM users_info WHERE auth_id=?',
      sub
    );
    const { is_nikkei } = body;
    if (user && user.id > 0) {
      await query(
        'UPDATE users_info SET is_nikkei=?, updated_at=NOW() WHERE auth_id=?',
        [is_nikkei, sub]
      );
      if (!is_nikkei) {
        await query('DELETE FROM japanese_origins WHERE user_id=?', [user.id]);
      }
      return res.status(200).json({ log: 'Update Done' });
    } else return res.status(400).json({ serverMessage: 'Bad Request' });
  } catch (e) {
    return res.status(400).json({ serverMessage: JSON.stringify(e) });
  }
};

const resNikkeiInfo = async (body, sub, res) => {
  try{
    const error = schemas.NikkeiProfile.check(body)
    console.log(body, error)
    if(Object.values(error).filter(e=> e.hasError).length > 0 ) {
      return res.status(401).json({...error})
    }else{
      return res.status(200).json({ log: 'Update Done' })
    }
  }
  catch(e) {
   return res.status(401).json({serverMessage: JSON.stringify(e)})
  }

}