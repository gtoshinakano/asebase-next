import axios from 'axios';

const API_ADDRESS = process.env.NEXT_PUBLIC_API_ADDRESS;

export const updateNickname = async (data) => {
  const ret = await axios.put(`${API_ADDRESS}/api/member/update/name`, data);
  return ret.data;
};

export const updateFullName = async (data) => {
  const ret = await axios.put(
    `${API_ADDRESS}/api/member/update/full_name`,
    data
  );
  return ret.data;
};

export const updateBirthDate = async (data) => {
  const ret = await axios.put(
    `${API_ADDRESS}/api/member/update/birth_date`,
    data
  );
  return ret.data;
};

export const updateGender = async (data) => {
  const ret = await axios.put(`${API_ADDRESS}/api/member/update/gender`, data);
  return ret.data;
};

export const updateBirthCity = async (data) => {
  const ret = await axios.put(
    `${API_ADDRESS}/api/member/update/birth_city`,
    data
  );
  return ret.data;
};

export const updateBirthState = async (data) => {
  const ret = await axios.put(
    `${API_ADDRESS}/api/member/update/birth_state`,
    data
  );
  return ret.data;
};

export const updateIsNikkei = async (data) => {
  const ret = await axios.put(
    `${API_ADDRESS}/api/member/update/is_nikkei`,
    data
  );
  return ret.data;
};

export const updateNikkeiProfile = async (data) => {
  const ret = await axios.put(
    `${API_ADDRESS}/api/member/update/nikkei_info`,
    data
  );
  return ret.data;
};

export const updateAcademicProfile = async body => {
  const {data} = await axios.put(`${API_ADDRESS}/api/member/update/academic_profile`, body)
  return data
}

export const updateProfessionalProfile = async body => {
  const {data} = await axios.put(`${API_ADDRESS}/api/member/update/professional_profile`, body)
  return data
}

export const updateExchangeProfile = async body => {
  const {data} = await axios.put(`${API_ADDRESS}/api/member/update/exchange_profile`, body)
  return data
}