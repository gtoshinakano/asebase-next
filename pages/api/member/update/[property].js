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
            await query(
              "UPDATE users_info SET full_name=?, updated_at=NOW() WHERE auth_id = ?", 
              [req.body.full_name, token.sub]
            )
            return res.status(200).json({log: "Update Done"})
          case 'birth_date':
            await query(
              "UPDATE users_info SET birth_date=?, updated_at=NOW() WHERE auth_id = ?", 
              [req.body.full_name, token.sub]
            )
            return res.status(200).json({log: "Update Done"})
      
          default:
            return res.status(400).json({serverMessage: "Bad Request"})
        }
        
      } catch (e) {
        res.json({ hasError: true, errorMessage: e.message })
      }
    }else{
      res.json({ hasError: true, errorMessage: "Error checking credentials" })
    }
  }else{
    res.json({ hasError: true, errorMessage: "Bad Request" })
  }

}

const handleBirthDate = async (body, sub) => {
  const date = moment(body.birth_date, "DD/MM/YYYY", true)

  await query(
    "UPDATE users_info SET birth_date=?, updated_at=NOW() WHERE auth_id = ?", 
    [date, sub]
  )
}