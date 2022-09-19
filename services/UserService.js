import api from '../utils/axios';

// ============= Create or add new subject =============
export const userLogin = async (user) => {
  const response = await api.post('auth/login', user);
  return response.data;
};
