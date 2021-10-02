import axios from 'axios';

export const handshake = async () => {
  const ret = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ADDRESS}/api/handshake`
  );
  return ret.data;
};
