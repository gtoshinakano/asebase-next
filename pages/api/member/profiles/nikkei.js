import { query } from '@lib/db';
import jwt from 'next-auth/jwt';
import _ from 'lodash'

const secret = process.env.SECRET;

async function get(req, res) {
  const token = await jwt.getToken({ req, secret });
  try {
    if (!token.sub) {
      return res.status(400).json({ message: 'Not Signed' });
    }

    const result = await query(`
      SELECT p.name, o.degree
      FROM japan_provinces p, japanese_origins o 
      WHERE p.code=o.province_code AND o.user_id=? 
    `,[token.sub]);

    if(result.length > 0){ 
      const degreeLength = _.map(result, i=>(i.degree))
      .reduce((a,b)=> a.length>b.length ? a: b).length
      let form = {
        jp_generation: genByDegreeMaxLenght[degreeLength],
        jpFamilyMembers: _.map(result, i=>(i.degree)),
        jpFamilyOrigins: _.reduce(result, (acc,cur) => {
          acc[cur.degree] = cur.name
          return acc
        }, {} ),
      }
      return res.status(200).json(form);
    }else{
      return res.status(200).json({jp_generation:2,jpFamilyMembers:[],jpFamilyOrigins:{}})
    }
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
}

export default get;

const genByDegreeMaxLenght = {
  "1" : 2,
  "3" : 3,
  "5" : 4,
  "7" : 5
} 