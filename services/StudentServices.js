import api from '../utils/axios';

// ============= Read or get student by Id =============
export const getStudentById = async (studentId) => {
  const { data } = await api.get(`student/${studentId}`);
  return data.rows;
};
