// src/components/CardItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Stack,
  Divider,
  Tooltip,
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BoltIcon from '@mui/icons-material/Bolt';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const CardItem = ({ card }) => {
  const { 
    name, 
    images, 
    hp, 
    types, 
    attacks, 
    weaknesses, 
    abilities,
    tcgplayer,
    cardmarket
  } = card;

  // Get the lowest price from TCGPlayer or Cardmarket
  const getLowestPrice = () => {
    const tcgPrice = tcgplayer?.prices?.holofoil?.low || 
                     tcgplayer?.prices?.reverseHolofoil?.low || 
                     tcgplayer?.prices?.normal?.low;
    
    const cardMarketPrice = cardmarket?.prices?.averageSellPrice || 
                           cardmarket?.prices?.lowPrice;
    
    if (tcgPrice && cardMarketPrice) {
      return Math.min(tcgPrice, cardMarketPrice);
    }
    return tcgPrice || cardMarketPrice || 'N/A';
  };

  const lowestPrice = getLowestPrice();

  return (
    <Link to={`/cards/${card.id}`} style={{ textDecoration: 'none' }}>

    <Card // Add to your Card component sx prop
    sx={{
      maxWidth: 300,
      backgroundColor: '#f8f8f8',
      border: '4px solid #3d7dca',
      borderRadius: '16px',
      transition: 'transform 0.3s',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)'
      }
    }}>
      <CardMedia
        component="img"
        height="200"
        image={images?.small}
        alt={name}
        sx={{ objectFit: 'contain', backgroundColor: '#f3f3f3' }}
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Tooltip title="Market Price">
            <Chip 
              icon={<AttachMoneyIcon />} 
              label={`$${lowestPrice}`} 
              color="success" 
              variant="outlined"
              size="small"
            />
          </Tooltip>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <BoltIcon fontSize="small" color="warning" />
          <Typography variant="body2">HP: {hp || 'N/A'}</Typography>
        </Stack>

        <Stack direction="row" spacing={1} mb={1}>
          {types?.map((type) => (
            <Chip key={type} label={type} color="primary" variant="outlined" />
          ))}
        </Stack>

        {abilities?.length > 0 && (
          <>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2" color="text.secondary">Abilities</Typography>
            {abilities.map((ab, i) => (
              <Tooltip title={ab.text} key={i}>
                <Chip
                  icon={<CatchingPokemonIcon />}
                  label={ab.name}
                  size="small"
                  variant="outlined"
                  sx={{ mt: 0.5 }}
                />
              </Tooltip>
            ))}
          </>
        )}

        {attacks?.length > 0 && (
          <>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2" color="text.secondary">Attacks</Typography>
            {attacks.map((atk, i) => (
              <Box key={i} sx={{ mt: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <FitnessCenterIcon fontSize="small" color="action" />
                  <Typography variant="body2">
                    <strong>{atk.name}</strong>: {atk.damage} dmg
                  </Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary">
                  {atk.text}
                </Typography>
              </Box>
            ))}
          </>
        )}

        {weaknesses?.length > 0 && (
          <>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2" color="text.secondary">Weaknesses</Typography>
            <Stack direction="row" spacing={1}>
              {weaknesses.map((w, i) => (
                <Chip
                  key={i}
                  label={`${w.type} ${w.value}`}
                  color="error"
                  variant="outlined"
                  size="small"
                />
              ))}
            </Stack>
          </>
        )}
      </CardContent>
    </Card>
    </Link>
  );
};

export default CardItem;