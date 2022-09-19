import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/axios';

function useDeleteRecord(queryKey) {
  const removeRecord = async (id) => {
    const response = await api.delete(`${queryKey}/${id}`);
    return response.data;
  };

  const queryClient = useQueryClient();
  return useMutation(removeRecord, {
    onSuccess: () => {
      queryClient.invalidateQueries([`${queryKey}`]);
    },
  });
}

export default useDeleteRecord;
