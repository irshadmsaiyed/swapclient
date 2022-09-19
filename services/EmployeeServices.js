import api from '../utils/axios';

// ============= Create or add new employee =============
export const addEmployee = async (employee) => {
  const { data } = await api.post('employee', employee, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// ============= Read or get all employees =============
export const getEmployees = async (pageIndex, pageLimit, searchText) => {
  const { data } = await api.get(
    `employee?page=${pageIndex}&limit=${pageLimit}&searchByName=${searchText}`
  );
  return data;
};

// ============= Read or get employee by Id =============
export const getEmployeeById = async (empId) => {
  const { data } = await api.get(`employee/${empId}`);
  return data.rows;
};

// ============= Update or edit existing employee =============
export const editEmployee = async (employee) => {
  const { data } = await api.put(
    `employee/${employee.id}`,
    {
      ...employee,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return data;
};

// ============= Delete or remove existing employee =============
export const removeEmployee = async (id) => {
  const { data } = await api.delete(`employee/${id}`);
  return data;
};
