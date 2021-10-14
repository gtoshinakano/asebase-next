import axios from 'axios';

export const getPersonalProfile = async () => {
  const ret = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/member/profiles/personal`
  );
  return ret.data;
};

export const getNikkeiProfile = async () => {
  const ret = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/member/profiles/nikkei`
  );
  return ret.data;
};

export const getAcademicProfile = async () => {
  const ret = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/member/profiles/academic`
  );
  return ret.data;
};

export const getProfessionalProfile = async () => {
  const ret = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/member/profiles/professional`
  );
  return ret.data;
};

export const getExchangeProfile = async () => {
  const ret = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/member/profiles/exchange`
  );
  return ret.data;
};
