import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/axios';

function useUpdateRecord(queryKey, handleOpenAlert) {
  const updateRecord = async (record) => {
    const response = await api.put(`${queryKey}/${record.id}`, record);
    return response.data;
  };

  const queryClient = useQueryClient();
  useMutation();
  return useMutation(updateRecord, {
    onSuccess: () => {
      queryClient.invalidateQueries([`${queryKey}`]);
      handleOpenAlert('Record updated successfully.');
    },
  });
}

export default useUpdateRecord;
