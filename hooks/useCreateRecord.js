import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/axios';

function useCreateRecord(queryKey, handleOpenAlert) {
  const addRecord = async (record) => {
    const response = await api.post(`${queryKey}`, record);
    return response.data;
  };

  const queryClient = useQueryClient();
  return useMutation(addRecord, {
    onSuccess: () => {
      queryClient.invalidateQueries([`${queryKey}`]);
      handleOpenAlert('Record inserted successfully.');
    },
  });
}

export default useCreateRecord;
