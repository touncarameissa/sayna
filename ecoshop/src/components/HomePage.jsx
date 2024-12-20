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
import { addItemToCart,removeItemFromCart } from './CartSlice';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import DisplayMessage from './DisplayMessage';
import CardMedia from '@mui/material/CardMedia';
import NumberWithSeparator from './NumberWithSeparator';

const HomePage = () => {
    const products = UseFetch(`${process.env.PUBLIC_URL}/datas/productfar.json`);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [message,setMessage]=useState('')
  const [color,setColor]=useState("")
  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
    setMessage("Produit ajouté au panier !")
    setColor('success');
    setShowSnackbar(true)
    };
    const handleRemoveItem = (itemId) => {
        dispatch(removeItemFromCart(itemId));
        setMessage("Produit supprimé du panier et choix actif dans la liste des produits !")
        setColor("warning");
        setShowSnackbar(true);
    };
    const handleCloseSnackbar = () => {
        setShowSnackbar(false);
    }

    return (
        <Box sx={{ backgroundColor: grey[100], padding: 2 }}>
            <DisplayMessage
                message={message}
                type={color}
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
                    Influencer au maximum pour une planète pure et durable
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
                        <Grid item xs={12} sm={6} md={4} key={item.id}
                            variant="outlined"
                            sx={{
                                transition: "transform 0.3s ease-in-out",
                                "&:hover": {
                                    animation: "bounce 0.6s ease-in-out",
                                    "@keyframes bounce": {
                                    "0%": { transform: "scale(1) translateY(0)" },
                                    "30%": { transform: "scale(1.05) translateY(-10px)" },
                                    "60%": { transform: "scale(0.98) translateY(5px)" },
                                    "100%": { transform: "scale(1) translateY(0)" },
                                    }
                                }
                            }}
                        >
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
                                <CardMedia
                                    sx={{
                                        width: "100%",
                                        height: "300px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        marginBottom: "15px",
                                    }}
                                    component="img"
                                    height="194"
                                    image={`${process.env.PUBLIC_URL}${item.image}`}
                                    alt={item.name}
                                />
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography variant="body2" sx={{ color: green[700], marginTop: 1 }}>
                                     <NumberWithSeparator number={item.price} />
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
                                <IconButton onClick={() => handleRemoveItem(item.id)} 
                                    disabled={!cartItems.some((itemm) => itemm.id === item.id)} title='Supprimer produit du panier' color="error">
                                    <RemoveShoppingCartIcon />
                                </IconButton>
                                <IconButton color='info' aria-label="view details" title="Voir détails produit" component={Link} to={`/product/${item.id}`}>
                                    <InfoIcon />
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
