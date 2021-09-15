// This is an example of how to read a JSON Web Token from an API route
import jwt from 'next-auth/jwt';

const secret = process.env.SECRET;

const get = async (req, res) => {
  const token = await jwt.getToken({ req, secret });

  if(!token) res.status(400).json({message: "I refuse to handshake with you"})
  else{
    res.status(200).json({message: "Hey, high five! ERROR✋"})
  }

};

export default get;
