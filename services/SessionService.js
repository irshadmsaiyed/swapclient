import api from '../utils/axios';

// ============= Create or add new session =============
export const addSession = async (session) => {
  const response = await api.post('session', session);
  return response.data;
};

// ============= Read or get all sessions =============
export const getSessions = async (pageIndex, pageLimit, searchText) => {
  let url = `session?page=${pageIndex}&limit=${pageLimit}&searchByName=${searchText}`;
  if (!searchText) {
    url = `session?page=${pageIndex}&limit=${pageLimit}`;
  }
  const response = await api.get(url);
  return response.data;
};

// ============= Read or get session by Id =============
export const getSessionById = async (id) => {
  const response = await api.get(`session/${id}`);
  return response.data.rows;
};

// ============= Update or edit existing session =============
export const editSession = async (session) => {
  const response = await api.put(`session/${session.id}`, {
    ...session,
  });
  return response.data;
};

// ============= Delete or remove existing session =============
export const removeSession = async (id) => {
  const response = await api.delete(`session/${id}`);
  return response.data;
};

// ============= Read or get educational years =============
export const getEducationalYears = async () => {
  const response = await api.get(`session/years`);
  return response.data.rows;
};
