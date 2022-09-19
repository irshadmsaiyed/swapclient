import React, { useState } from 'react';
import { Box, Stack, Avatar, Typography, Pagination } from '@mui/material';

import useGetPaginatedRecords from '../../hooks/useGetPaginatedRecords';

function randomColor() {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16);
  const color = `#${hex}`;

  return color;
}

export default function LatestSubject() {
  const [page, setPage] = useState({
    pageIndex: 1,
    pageLimit: 4,
    mainQueryKey: 'subject',
    subQueryKey: 'recent',
  });

  const { data: subjects } = useGetPaginatedRecords(page, {
    keepPreviousData: true,
  });

  const handlePageIndex = (event, value) => {
    setPage({ ...page, pageIndex: value });
  };

  return (
    <Stack
      sx={{
        bgcolor: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: '0 0.5rem 1rem rgb(0 0 0 / 15%)',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          boxShadow: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)',
          px: '24px',
          py: '24px',
        }}
      >
        <Typography
          variant="subtitle1"
          letterSpacing={2}
          fontWeight={500}
          textTransform="uppercase"
        >
          Recent Subjects
        </Typography>
      </Box>
      <Stack spacing={2} sx={{ my: 4, px: '24px' }}>
        {subjects?.rows?.map((subject) => (
          <Stack
            direction="row"
            key={subject.id}
            alignItems="center"
            spacing={2}
          >
            <Avatar sx={{ backgroundColor: `${randomColor()}` }}>
              {subject.subject_name.charAt(0)}
            </Avatar>
            <Box>{subject.subject_name}</Box>
          </Stack>
        ))}
      </Stack>
      <Box
        sx={{
          px: '24px',
          py: '24px',
          display: 'flex',
          justifyContent: 'center',
          // backgroundColor: '#f7f7f7',
          backgroundColor: '#f8f9fa',
        }}
      >
        <Pagination
          count={subjects?.totalPages}
          page={page.pageIndex}
          onChange={handlePageIndex}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Stack>
  );
}
