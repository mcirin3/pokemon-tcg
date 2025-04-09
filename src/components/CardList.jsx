// src/components/CardList.jsx
import React from 'react';
import CardItem from './CardItem';
import { Grid } from '@mui/material';

const CardList = ({ cards }) => (
  <Grid container spacing={2}>
    {cards.map((card) => (
      <Grid item xs={12} sm={6} md={3} key={card.id}> {/* 4 cards/row on md+ screens */}
        <CardItem card={card} />
      </Grid>
    ))}
  </Grid>
);

export default CardList;