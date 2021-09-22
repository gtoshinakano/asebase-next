import axios from 'axios'

export const handshake = async () => {
  const ret = await axios.get(`${process.env.NEXT_PUBLIC_API_ADDRESS}/api/handshake`)

  
  console.log(ret)
  return ret.data
}