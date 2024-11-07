// src/pages/HomePage.js
import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import UseFetch from "../services/UseFetch";
import { Link } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from './CartSlice';
import DisplayMessage from './DisplayMessage';

const HomePage = () => {
    const products = UseFetch("/datas/productfar.json");
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const handleAddToCart = (product) => {
        dispatch(addItemToCart(product));
            setShowSnackbar(true)
      };
      const handleCloseSnackbar = () => {
        setShowSnackbar(false);
      }

    return (
        <Box sx={{ backgroundColor: grey[100], padding: 2 }}>
            <DisplayMessage
                message="Produit ajouté au panier !"
                type="success"
                duration="6000"
                open={showSnackbar}
                onClose={handleCloseSnackbar}
            />
      
            {/* Section Héros */}
            <Box
                sx={{
                    textAlign: "center",
                    backgroundColor: green[400],
                    color: "white",
                    borderRadius: 2,
                    padding: 4,
                    marginTop: 4,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Influencer au maximum pour une planette pure et durable
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 300 }}>
                    Explorez notre sélection de produits respectueux de l’environnement.
                </Typography>
                <Button 
                    component={Link} to="/product"
                    variant="contained"
                    sx={{ backgroundColor: green[700], marginTop: 2 }}
                    size="large"
                >
                    Découvrir nos produits
                </Button>
            </Box>

            {/* Produits en vedette */}
            <Box sx={{ textAlign: "center", marginY: 5 }}>
                <Typography variant="h5" gutterBottom>
                    Nos produits phares
                </Typography>
                <Grid container spacing={3} sx={{ marginTop: 2 }}>
                    {products.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <Paper
                                elevation={3}
                                sx={{
                                    padding: 2,
                                    borderRadius: 2,
                                    textAlign: "center",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    height: "100%",
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{
                                        width: "100%",
                                        height: "300px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        marginBottom: "15px",
                                    }}
                                />
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography variant="body2" sx={{ color: grey[700], marginTop: 1 }}>
                                    {item.description}
                                </Typography>
                                <Typography variant="body2" sx={{ color: green[700], marginTop: 1 }}>
                                    Prix : {item.price}FCA
                                </Typography>
                                <CardActions disableSpacing>
                                <IconButton title="Ajouter au panier"
                                    aria-label="add to favorites"
                                    color='success'
                                    onClick={() => handleAddToCart(item)}
                                    disabled={cartItems.some((itemm) => itemm.id === item.id)}
                                >
                                    <AddShoppingCartIcon />
                                </IconButton>
                                <IconButton aria-label="view details" title="En savoir plus">
                                    <Link to={`/products/${item.id}`} className="detail-link">
                                    <InfoIcon />
                                    </Link>
                                </IconButton>
                                </CardActions>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default HomePage;
