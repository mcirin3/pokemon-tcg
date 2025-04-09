// src/api/pokemonAPI.js
export const searchCards = async (query = '', set = '') => {
    let url = 'https://api.pokemontcg.io/v2/cards?';
    
    if (query) {
      url += `q=name:${query}`;
    } else {
      url += 'q=supertype:Pokémon';
    }
  
    if (set) {
      url += ` set.id:${set}`;
    }
  
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error('Error fetching cards:', error);
      return { data: [] };
    }
  };
  
  export const fetchSets = async () => {
    try {
      const response = await fetch('https://api.pokemontcg.io/v2/sets');
      return await response.json();
    } catch (error) {
      console.error('Error fetching sets:', error);
      return { data: [] };
    }
  };
  
  export const fetchPokemonNames = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
      const data = await response.json();
      return data.results.map(pokemon => pokemon.name);
    } catch (error) {
      console.error('Error fetching Pokémon names:', error);
      return [];
    }
  };