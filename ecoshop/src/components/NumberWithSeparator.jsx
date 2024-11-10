import React from 'react';
import { Typography } from '@mui/material';

const NumberWithSeparator = ({ number }) => {
  // Formater le nombre avec un séparateur de milliers
  const formattedNumber = new Intl.NumberFormat('fr-FR').format(number);

  return (
    <Typography variant="body2">
      {formattedNumber} CFA
    </Typography>
  );
};

export default NumberWithSeparator;
