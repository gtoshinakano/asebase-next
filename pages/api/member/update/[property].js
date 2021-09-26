import {query} from '@lib/db'
import {getSessionUserInfoId} from '@Helpers'
import jwt from 'next-auth/jwt';
import moment from 'moment';

const secret = process.env.SECRET;

export default async (req, res) => {

  const { property } = req.query
  const token = await jwt.getToken({ req, secret })
  
  if(req.method === "POST") {
    const checkedUser = await getSessionUserInfoId(token.sub)
    if(!checkedUser.hasError) {
      try {
        switch (property) {
          case 'name':
            await query(
              "UPDATE users SET name=?, updated_at=NOW() WHERE auth_id = ?", 
              [req.body.name, token.sub]
            )
            return res.json({serverMessage: "Alteração visível somente após login. Clique no balão ao lado para re-autenticar"})
          case 'full_name':
            return await handleSingleUpdate('full_name', req.body.full_name, token.sub, res)
          case 'birth_city':
            return await handleSingleUpdate('birth_city', req.body.birth_city, token.sub, res)
          case 'birth_date':
            return await handleBirthDate(req.body, token.sub, res)
          default:
            return res.status(400).json({serverMessage: "Bad Request"})
        }
        
      } catch (e) {
        res.json({ errorMessage: e.message })
      }
    }else{
      res.json({ errorMessage: "Error checking credentials" })
    }
  }else{
    res.json({ errorMessage: "Bad Request" })
  }

}

const handleBirthDate = async (body, sub, res) => {
  
  const date = moment(body.birth_date, "DD/MM/YYYY", true)
  if(!date.isValid()) return res.status(400).json({serverMessage: "Wrong Format"})
  else{
    await query(
      "UPDATE users_info SET birth_date=?, updated_at=NOW() WHERE auth_id = ?", 
      [date.format("YYYY-MM-DD HH:mm:ss"), sub]
    )
    return res.status(200).json({log: "Update Done"})
  }
}

const handleSingleUpdate = async (field, value, sub, res) => {
  await query(
    `UPDATE users_info SET ${field}=?, updated_at=NOW() WHERE auth_id = ?`, 
    [value, sub]
  )
  return res.status(200).json({log: "Update Done"})
}