// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress, Fade } from '@mui/material';
import SearchBar from '../components/SearchBar';
import CardList from '../components/CardList';
import { searchCards, fetchSets, fetchPokemonNames } from '../api/pokemonAPI';

const Home = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [sets, setSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [names, setsData] = await Promise.all([
        fetchPokemonNames(),
        fetchSets()
      ]);
      setPokemonList(names);
      setSets(setsData.data);
      const cardsData = await searchCards();
      setCards(cardsData.data);
    } catch (error) {
      console.error('Error initializing data:', error);
    }
    setLoading(false);
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    setLoading(true);
    try {
      const data = await searchCards(term, selectedSet);
      setCards(data.data);
      setNoResults(data.data.length === 0);
    } catch (error) {
      console.error('Error searching cards:', error);
      setCards([]);
      setNoResults(true);
    }
    setLoading(false);
  };

  const handleSetChange = async (setId) => {
    setSelectedSet(setId);
    setLoading(true);
    try {
      const data = await searchCards(searchTerm, setId);
      setCards(data.data);
      setNoResults(data.data.length === 0);
    } catch (error) {
      console.error('Error filtering by set:', error);
      setCards([]);
      setNoResults(true);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>  {/* Changed to "lg" */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={4}
      >
       <Typography 
  variant="h3" 
  sx={{
    fontFamily: '"Pokemon Solid", sans-serif',
    color: '#ffcb05',
    textShadow: '3px 3px 0 #2c70b7, -1px -1px 0 #2c70b7, 1px -1px 0 #2c70b7, -1px 1px 0 #2c70b7',
    letterSpacing: '4px',
    mb: 4
  }}
>
  Pokémon TCG Finder
</Typography>

        <SearchBar 
          onSearch={handleSearch} 
          pokemonList={pokemonList}
          sets={sets}
          onSetChange={handleSetChange}
          selectedSet={selectedSet}
        />

        {loading ? (
          <Box mt={4}>
            <CircularProgress />
          </Box>
        ) : noResults ? (
          <Typography variant="h6" color="text.secondary" mt={4}>
            No Pokémon cards found.
          </Typography>
        ) : (
          <Fade in>
            <Box width="100%" maxWidth="100%">  {/* Added maxWidth */}
              <CardList cards={cards} />
            </Box>
          </Fade>
        )}
      </Box>
    </Container>
  );
};

export default Home;