import axios from 'axios'

const API_ADDRESS = process.env.NEXT_PUBLIC_API_ADDRESS;

export const deleteAcademicProfile = async () => {
  const {data} = await axios.delete(`${API_ADDRESS}/api/member/update/academic_profile`)
  return data
}

export const deleteProfessionalProfile = async () => {
  const {data} = await axios.delete(`${API_ADDRESS}/api/member/update/professional_profile`)
  return data
}