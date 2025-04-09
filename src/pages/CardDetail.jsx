// src/pages/CardDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Paper, Divider, Chip } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const CardDetail = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [priceData, setPriceData] = useState([]);
  const [timeRange, setTimeRange] = useState('1year');

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        // Fetch card details
        const cardRes = await axios.get(`https://api.pokemontcg.io/v2/cards/${id}`);
        setCard(cardRes.data.data);
        
        // Fetch price history (mock - you'll need a real price history API)
        const mockPriceData = generateMockPriceData(timeRange);
        setPriceData(mockPriceData);
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };
    
    fetchCardData();
  }, [id, timeRange]);

  const generateMockPriceData = (range) => {
    // This is placeholder data - replace with real API calls
    const now = new Date();
    const dataPoints = {
      '10years': 120,
      '5years': 60,
      '2years': 24,
      '1year': 12,
      '5months': 5,
      '5days': 5
    };
    
    return Array.from({ length: dataPoints[range] }, (_, i) => ({
      date: new Date(now - (i * (365 * 24 * 60 * 60 * 1000) / (range.includes('year') ? 1 : 12))).toLocaleDateString(),
      price: (Math.random() * 50 + 10).toFixed(2)
    })).reverse();
  };

  if (!card) return <div>Loading...</div>;

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        {/* Card Image Column */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
            <img 
              src={card.images.large} 
              alt={card.name} 
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Paper>
        </Grid>
        
        {/* Card Details Column */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              {card.name}
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Chip label={`HP: ${card.hp}`} color="primary" sx={{ mr: 1 }} />
              {card.types?.map(type => (
                <Chip key={type} label={type} sx={{ mr: 1 }} />
              ))}
            </Box>
            
            {card.attacks?.map((attack, i) => (
              <Box key={i} sx={{ mb: 2 }}>
                <Typography variant="h6">
                  {attack.name} - {attack.damage} damage
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {attack.text}
                </Typography>
                <Divider sx={{ my: 1 }} />
              </Box>
            ))}
          </Paper>
        </Grid>
        
        {/* Price History Column */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Price History
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              {['5days', '5months', '1year', '2years', '5years', '10years'].map(range => (
                <Chip
                  key={range}
                  label={range}
                  onClick={() => setTimeRange(range)}
                  color={timeRange === range ? 'primary' : 'default'}
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
            
            <Box sx={{ height: 300 }}>
              <LineChart
                width={350}
                height={300}
                data={priceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#8884d8" />
              </LineChart>
            </Box>
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                Current Market Price: ${card.tcgplayer?.prices?.holofoil?.market || 'N/A'}
              </Typography>
              <Typography variant="body2">
                Lowest Price: ${card.tcgplayer?.prices?.holofoil?.low || 'N/A'}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardDetail;