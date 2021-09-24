// This is an example of how to read a JSON Web Token from an API route
import jwt from 'next-auth/jwt';
import { getSession } from "next-auth/client"
import { query, insertId } from '@lib/db'

const secret = process.env.SECRET;

const get = async (req, res) => {
  const token = await jwt.getToken({ req, secret });
  const session = await getSession({ req });

  if(!token) res.status(400).json({message: "I refuse to handshake with you"})
  else{
    const user_info = await query("SELECT id, blocked FROM users_info WHERE id=?", token.sub) // WHERE blocked != 1 #TODO Adicionar user_verified

    if(user_info.length === 0){// There is no user_info, so let's create one
      const newId = await insertId("INSERT INTO users_info(auth_id, blocked) VALUES(?, ? )",[token.sub, 0]) 
      res.status(200).json({message: "User Info Created", uid: newId})  
    }else{
      const userInfo = user_info[0]

      if(userInfo.blocked) res.status(200).json({message: "You are blocked for transgress our Terms of Use", action: "force-sign-out-user" })
      else res.status(200).json({
        message: "High Five 🖐",  
        data: {
          ...userInfo, 
          ...session.user, 
          uid: userInfo.id,
          serverTime: new Date() 
          //TODO Adicionar user_verified
        } })
    }
    
  }

};

export default get;