import api from '../utils/axios';

// ============= Create or add new subject =============
export const addSubject = async (subject) => {
  const response = await api.post('subject', subject);
  return response.data;
};

// ============= Read or get all subjects =============
export const getSubjects = async (pageIndex, pageLimit, searchText) => {
  let url = `subject?page=${pageIndex}&limit=${pageLimit}&searchByName=${searchText}`;
  if (!searchText) {
    url = `subject?page=${pageIndex}&limit=${pageLimit}`;
  }
  const response = await api.get(url);
  return response.data;
};

// ============= Read or get subject by Id =============
export const getSubjectById = async (id) => {
  const response = await api.get(`subject/${id}`);
  return response.data.rows;
};

// ============= Update or edit existing subject =============
export const editSubject = async (subject) => {
  const response = await api.put(`subject/${subject.id}`, {
    subjectName: subject.subjectName,
  });
  return response.data;
};

// ============= Delete or remove existing subject =============
export const removeSubject = async (id) => {
  const response = await api.delete(`subject/${id}`);
  return response.data;
};

// ============= Read or get distinct subjects =============
export const getDistinctSubjects = async () => {
  const response = await api.get(`subject/distinct`);
  return response.data.rows;
};
