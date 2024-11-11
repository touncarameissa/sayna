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
import { addItemToCart,removeItemFromCart } from './CartSlice';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import CardMedia from '@mui/material/CardMedia';
import NumberWithSeparator from './NumberWithSeparator';

const DetailProductPage = () => {
  const { id } = useParams(); // Récupère l'ID du produit depuis l'URL
  const productsData=UseFetch(`${process.env.PUBLIC_URL}/datas/products.json`);
  const product = productsData.find(product => product.id === parseInt(id)); // Trouve le produit par ID
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

  if (!product) {
    return <div>Produit non trouvé</div>; // Message si le produit n'existe pas
  }

  return (

     <Grid
      container
      justifyContent="center"
      alignItems="center"     
      sx={{ minHeight: "100vh", backgroundColor: grey[100], paddingTop:7 }}
    >
        <Grid item xs={12} sm={6} md={8} 
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
            }}>
            <DisplayMessage
                message={message}
                type={color}
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
                 <CardMedia
                    x={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "15px",
                      }}
                      component="img"
                      height="100%"
                      image={`${process.env.PUBLIC_URL}${product.image}`}
                      alt={product.name}
                  />
                <Typography variant="body2" sx={{ color: green[700], marginTop: 1 }}>
                    <NumberWithSeparator number={product.price} />
                </Typography>
                <CardActions disableSpacing>
                    <IconButton title="Ajouter au panier"
                        aria-label="add to favorites"
                        color='success'
                        onClick={() => handleAddToCart(product)}
                        disabled={cartItems.some((itemm) => itemm.id === product.id)}>
                        <AddShoppingCartIcon />
                    </IconButton>
                    <IconButton onClick={() => handleRemoveItem(product.id)} 
                      disabled={!cartItems.some((item) => item.id === product.id)} title='Supprimer produit du panier' color="error">
                      <RemoveShoppingCartIcon />
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
