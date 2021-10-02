import axios from 'axios';

export const getPersonalProfile = async () => {
  const ret = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/member/profiles/personal`
  );
  return ret.data;
};
