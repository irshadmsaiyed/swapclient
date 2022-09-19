/* eslint-disable react/no-children-prop */
import React, { useState } from 'react';
import {
  HStack,
  Spacer,
  Table,
  TableContainer,
  Text,
  VStack,
} from '@chakra-ui/react';
import Title from '../data-table/Title';
import Search from '../data-table/search';
import Pagination from './Pagination';
import Columns from '../data-table/data-columns';
import Rows from '../data-table/data-rows';

export default function CustomTable() {
  const [page, setPage] = useState({
    pageIndex: 1,
    pageLimit: 2,
    queryKey: 'subject-list',
    searchText: '',
  });
  return (
    <VStack
      bgColor="white"
      borderRadius="16px"
      boxShadow="0 0.5rem 1rem rgb(0 0 0 / 15%)"
      overflow="hidden"
      spacing={0}
    >
      {/* title */}
      <Title title="Subject List" />

      {/* search */}
      <Search />

      <TableContainer w="full">
        <Table variant="striped" colorScheme="gray">
          {/* column heading */}
          <Columns />
          {/* data rows */}
          <Rows />
        </Table>
      </TableContainer>

      {/* pagination */}
      <HStack w="full" py={6} px={[4, 6]} bgColor="gray.50">
        <Text fontSize={['sm', 'md']}>Showing page 101 of 150</Text>
        <Spacer display={['none', 'block']} />
        <Pagination
          page={page}
          setPage={setPage}
          // totalPages={subjects?.totalPages}
          totalPages={4}
        />
      </HStack>
    </VStack>
  );
}
