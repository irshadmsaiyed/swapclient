import { useQuery } from '@tanstack/react-query';
import api from '../utils/axios';

function useGetPaginatedData(
  { pageIndex, pageLimit, mainQueryKey, subQueryKey = null, searchText = null },
  options = {}
) {
  const getRecords = async (mainQueryKey, pageIndex, pageLimit, searchText) => {
    let url = `${mainQueryKey}?page=${pageIndex}&limit=${pageLimit}&searchByName=${searchText}`;
    if (!searchText) {
      url = `${mainQueryKey}?page=${pageIndex}&limit=${pageLimit}`;
    }
    const response = await api.get(url);
    return response.data;
  };

  let queryKey = [mainQueryKey];

  if (subQueryKey) {
    queryKey.push(subQueryKey);
  }

  if (searchText) {
    queryKey.push(searchText);
  }

  queryKey.push(pageIndex);

  return useQuery(
    queryKey,
    () => getRecords(mainQueryKey, pageIndex, pageLimit, searchText),
    {
      ...options,
      refetchOnMount: true,
    }
  );
}

export default useGetPaginatedData;
