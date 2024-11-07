/* eslint-disable no-unused-vars */
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Box, Typography } from '@mui/material';
import { green } from "@mui/material/colors";

const partnerLogos = [
  { id: 1, logo: '/partenaires/mondepure.png', name: 'Écologie & Nature' },
  { id: 2, logo: '/partenaires/responsable.png', name: 'Commerce Responsable' },
  { id: 3, logo: '/partenaires/soutenir.png', name: 'Produit Local' },
];

const AdBar = () => {
  return (
    <Carousel
      indicators={false}
      animation="slide"
      interval={4000}
      navButtonsAlwaysVisible
      navButtonsProps={{
        style: {
          backgroundColor: green[600], // Vert doux pour un effet écologique
          color: 'white',
          borderRadius: '50%',
        }
      }}
      navButtonsWrapperProps={{
        style: {
          top: '50%',
          transform: 'translateY(-50%)',
        }
      }}
    >
      {partnerLogos.map((partner) => (
        <Paper
          key={partner.id}
          elevation={3}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 200,
            backgroundColor: 'white', // Fond neutre pour bien faire ressortir les logos
          }}
        >
          <Box
            component="img"
            src={partner.logo}
            alt={partner.name}
            sx={{
              height: 80, // Ajuster la taille selon les logos
              maxWidth: '80%',
              objectFit: 'contain',
            }}
          />
          <Typography
            variant="subtitle1"
            color="textSecondary"
            sx={{
              mt: 1,
              textAlign: 'center',
              fontSize: 14,
              fontWeight: 'bold',
            }}
          >
            {partner.name}
          </Typography>
        </Paper>
      ))}
    </Carousel>
  );
};

export default AdBar;
