import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import UseFetch from '../services/UseFetch';
import {  Typography, Grid, Paper } from "@mui/material";
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { green, grey } from "@mui/material/colors";
import { useDispatch, useSelector } from 'react-redux';
import DisplayMessage from './DisplayMessage';
import { addItemToCart } from './CartSlice';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';

const DetailProductPage = () => {
  const { id } = useParams(); // Récupère l'ID du produit depuis l'URL
  const productsData=UseFetch("/datas/products.json")
  const product = productsData.find(product => product.id === parseInt(id)); // Trouve le produit par ID
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

  if (!product) {
    return <div>Produit non trouvé</div>; // Message si le produit n'existe pas
  }

  return (

     <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh", backgroundColor: grey[100] }}
    >
        <Grid item xs={12} sm={6} md={8} >
            <DisplayMessage
                message="Produit ajouté au panier !"
                type="success"
                duration="6000"
                open={showSnackbar}
                onClose={handleCloseSnackbar}
            />
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
            }}>
                <CardHeader 
                  avatar={
                    <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
                      {product.name[0].toUpperCase()}
                    </Avatar>
                  }
                  title={product.name}
                />
                <img
                    src={product.image}
                    alt={product.name}
                    style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "15px",
                }}/>
                <Typography variant="body2" sx={{ color: green[700], marginTop: 1 }}>
                    Prix : {product.price}FCA
                </Typography>
                <CardActions disableSpacing>
                    <IconButton title="Ajouter au panier"
                        aria-label="add to favorites"
                        color='success'
                        onClick={() => handleAddToCart(product)}
                        disabled={cartItems.some((itemm) => itemm.id === product.id)}>
                        <AddShoppingCartIcon />
                    </IconButton>
                </CardActions>
                <Typography variant="body2" sx={{ color: grey[700], marginTop: 1 }}>
                    {product.description}
                </Typography>
            </Paper>
        </Grid>
    </Grid>
    
  );
};

export default DetailProductPage;
