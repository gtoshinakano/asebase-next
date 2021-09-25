import {query} from '@lib/db'
import {getSessionUserInfoId} from '@Helpers'
import jwt from 'next-auth/jwt';

const secret = process.env.SECRET;

export default async (req, res) => {

  const { property } = req.query
  const token = await jwt.getToken({ req, secret })
  
  if(req.method === "POST") {
    const checkedUser = await getSessionUserInfoId(token.sub)
    if(!checkedUser.hasError) {
      try {
        let mutationQuery
        switch (property) {
          case 'name':
            mutationQuery = await query("UPDATE users SET name=?, updated_at=NOW() WHERE id = ?", [req.body.name, token.sub])
            break;
        
          default:
            mutationQuery = ""
            break;
        }
        return res.json({serverMessage: "Alteração visível somente após login. Clique no balão ao lado para re-autenticar"})
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