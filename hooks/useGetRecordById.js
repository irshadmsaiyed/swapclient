import { useQuery } from '@tanstack/react-query';
import api from '../utils/axios';

function useGetRecordById(mainQueryKey, id, options = {}) {
  const getRecordById = async (mainQueryKey, empId) => {
    let url = `${mainQueryKey}/${empId}`;
    const response = await api.get(url);
    return response.data;
  };

  return useQuery([mainQueryKey, id], () => getRecordById(mainQueryKey, id), {
    ...options,
  });
}

export default useGetRecordById;
