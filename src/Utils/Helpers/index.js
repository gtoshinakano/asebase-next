import { query } from '@lib/db';

const getSessionUserInfoId = async (id) => {
  const result = await query(
    'SELECT id FROM users_info WHERE blocked=0 AND auth_id=?',
    id
  );
  if (result.length === 1) return { ...result[0], hasError: false };
  else
    return { hasError: true, errorMessage: 'Blocked User or User not found' };
};

export { getSessionUserInfoId };
