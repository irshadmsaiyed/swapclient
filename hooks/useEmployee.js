import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addEmployee,
  getEmployees,
  getEmployeeById,
  editEmployee,
  removeEmployee,
} from '../services/EmployeeServices';

// ============= Create or add new employee =============
export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation(addEmployee, {
    onSuccess: () => {
      queryClient.invalidateQueries(['employee-list', [1, '']]);
    },
  });
};

// ============= Read or get all employees =============
export const useReadEmployees = (
  { pageIndex, pageLimit, searchText = '' },
  options = {}
) =>
  useQuery(
    ['employee-list', [pageIndex, searchText]],
    () => getEmployees(pageIndex, pageLimit, searchText),
    {
      ...options,
    }
  );

// ============= Read or get employee by Id =============
export const useReadEmployeeById = (id, isQueryEnabled) =>
  useQuery(['employee', id], () => getEmployeeById(id), {
    enabled: isQueryEnabled,
  });

// ============= Update or edit existing employee =============
export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation(editEmployee, {
    onSuccess: (data, variables) => {
      const { id } = variables;
      queryClient.invalidateQueries(['employee', id]);
      queryClient.invalidateQueries(['employee-list']);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['employee-list']);
    },
  });
};

// ============= Delete or remove existing employee =============
export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation(removeEmployee, {
    onSuccess: () => {
      queryClient.invalidateQueries(['employee-list', [1, '']]);
    },
  });
};
