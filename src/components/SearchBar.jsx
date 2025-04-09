// src/components/SearchBar.jsx
import React from 'react';
import { TextField, Autocomplete, Box } from '@mui/material';

const SearchBar = ({ onSearch, pokemonList, sets, onSetChange, selectedSet }) => {
  return (
    <Box display="flex" gap={2} width="100%">
      <Autocomplete
        freeSolo
        options={pokemonList}
        onInputChange={(event, value) => onSearch(value)}
        renderInput={(params) => (
          <TextField {...params} label="Search Pokémon" variant="outlined" fullWidth />
        )}
        sx={{ flex: 2 }}
      />
      <Autocomplete
        options={sets}
        getOptionLabel={(option) => option.name}
        onChange={(event, value) => onSetChange(value?.id || '')}
        value={sets.find(set => set.id === selectedSet) || null}
        renderInput={(params) => (
          <TextField {...params} label="Filter by Set" variant="outlined" fullWidth />
        )}
        sx={{ flex: 1 }}
      />
    </Box>
  );
};

export default SearchBar;