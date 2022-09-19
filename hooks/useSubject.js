import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addSubject,
  getSubjects,
  editSubject,
  removeSubject,
  getDistinctSubjects,
} from '../services/SubjectService';

// ============= Create new subject hook =============
export const useCreateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation(addSubject, {
    onSuccess: () => {
      queryClient.invalidateQueries(['subject']);
    },
  });
};

// ============= Read all subjects hook =============
export const useReadSubjects = (
  { pageIndex, pageLimit, queryKey, searchText = '' },
  options = {}
) =>
  useQuery(
    ['subject', queryKey, pageIndex, searchText],
    () => getSubjects(pageIndex, pageLimit, searchText),
    {
      ...options,
      refetchOnMount: false,
    }
  );

// ============= Update existing subject hook =============
export const useUpdateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation(editSubject, {
    onSuccess: () => {
      queryClient.invalidateQueries(['subject']);
    },
  });
};

// ============= Delete existing subject hook =============
export const useDeleteSubject = () => {
  const queryClient = useQueryClient();
  return useMutation(removeSubject, {
    onSuccess: () => {
      queryClient.invalidateQueries(['subject']);
    },
  });
};

// ============= Read all distinct subjects hook =============
export const useDistinctSubjects = () =>
  useQuery(['subject', 'distinct'], () => getDistinctSubjects(), {
    refetchOnMount: false,
  });
