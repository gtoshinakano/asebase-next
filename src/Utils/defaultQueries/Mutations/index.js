import axios from 'axios'

const API_ADDRESS = process.env.NEXT_PUBLIC_API_ADDRESS

export const updateNickname = async (data) => {
  const ret = await axios.post(`${API_ADDRESS}/api/member/update/name`, data) //TODO handle errors properly
  return ret.data
}