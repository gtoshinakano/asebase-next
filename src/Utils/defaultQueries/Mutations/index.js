import axios from 'axios'

const API_ADDRESS = process.env.NEXT_PUBLIC_API_ADDRESS

export const changeNickname = async (data) => {
  const ret = await axios.post(`${API_ADDRESS}/api/member/change/name`, data) //TODO handle errors properly
  return ret.data
}