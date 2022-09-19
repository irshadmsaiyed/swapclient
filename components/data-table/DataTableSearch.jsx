import React from 'react';
import { InputAdornment, Stack, TextField, Tooltip } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';

function DataTableSearch(props) {
  const { page, setPage } = props;

  const handleResetSearch = () => {
    setPage({ ...page, searchText: '' });
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={1}
      py={3}
      sx={{
        backgroundColor: '#f8f9fa',
        px: { xs: 2, sm: 3 },
      }}
    >
      <TextField
        size="medium"
        onChange={(e) => setPage({ ...page, searchText: e.target.value })}
        value={page.searchText}
        fullWidth
        name="searchText"
        label="Search"
        placeholder="Search here by Name..."
        variant="outlined"
        sx={{ backgroundColor: '#fff', color: '#343a40' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon color="disabled" fontSize="large" />
            </InputAdornment>
          ),
          endAdornment: (
            <Tooltip title="Reset">
              <InputAdornment
                onClick={handleResetSearch}
                position="end"
                sx={{
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
              >
                <RestartAltRoundedIcon color="info" fontSize="large" />
              </InputAdornment>
            </Tooltip>
          ),
        }}
      />
    </Stack>
  );
}

export default DataTableSearch;
