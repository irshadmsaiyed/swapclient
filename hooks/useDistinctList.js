import { useQuery } from '@tanstack/react-query';
import api from '../utils/axios';

function useDistinctList(mainQueryKey, subQueryKey = null, options = {}) {
  const getDistinctRecords = async (mainQueryKey, subQueryKey) => {
    const url = `${mainQueryKey}/${subQueryKey}`;
    const response = await api.get(url);
    return response.data;
  };

  return useQuery(
    [mainQueryKey, subQueryKey],
    () => getDistinctRecords(mainQueryKey, subQueryKey),
    {
      ...options,
      refetchOnMount: true,
    }
  );
}

export default useDistinctList;
