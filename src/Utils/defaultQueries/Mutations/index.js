import axios from 'axios'

const API_ADDRESS = process.env.NEXT_PUBLIC_API_ADDRESS

export const updateNickname = async (data) => {
  const ret = await axios.post(`${API_ADDRESS}/api/member/update/name`, data)
  return ret.data
}

export const updateFullName = async (data) => {
  const ret = await axios.post(`${API_ADDRESS}/api/member/update/full_name`, data)
  return ret.data
}

export const updateBirthDate = async (data) => {
  const ret = await axios.post(`${API_ADDRESS}/api/member/update/birth_date`, data)
  return ret.data
}