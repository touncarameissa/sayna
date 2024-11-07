import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from './CartSlice';
import { Link } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";


import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import { green } from '@mui/material/colors';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import DisplayMessage from './DisplayMessage';
import TextField from '@mui/material/TextField';
import UseFetch from '../services/UseFetch';

const ITEMS_PER_PAGE = 6;

const ProductPage = () => {
  
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [page, setPage] = useState(1);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Nouvel état pour le terme de recherche

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  }

  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product));
    setShowSnackbar(true)
  };
  const productsData = UseFetch("/datas/products.json")
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Réinitialise la page à 1 lors d'une nouvelle recherche
  };

  // Filtrer les produits en fonction du terme de recherche
  const filteredProducts = productsData.filter((product) => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.price.toString().toLowerCase().includes(searchTerm.toLowerCase())
);


  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <DisplayMessage
        message="Produit ajouté au panier !"
        type="success"
        duration="6000"
        open={showSnackbar}
        onClose={handleCloseSnackbar}
      />
      
      <Box sx={{ maxWidth: 1200, width: '100%', px: 2 }}>
        {/* Barre de recherche */}
        <TextField
          label="Rechercher un produit"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Entrez le nom d'un produit..."
        />
        <Typography variant="h4" fontWeight="medium" mb={3} textAlign="center">
          Produits
        </Typography>
      
        <Grid container spacing={3} justifyContent="center">
          {displayedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                variant="outlined"
                sx={{
                  padding: 2,
                  boxShadow: 1,
                  borderRadius: 2,
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
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
                      {product.name[0].toUpperCase()}
                    </Avatar>
                  }
                  title={product.name}
                />
                <CardMedia
                style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "15px",
                }}
                  component="img"
                  height="194"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {product.price} CFA
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton title="Ajouter au panier"
                    aria-label="add to favorites"
                    color='success'
                    onClick={() => handleAddToCart(product)}
                    disabled={cartItems.some((item) => item.id === product.id)}
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                  <IconButton aria-label="view details" title="En savoir plus">
                    <Link to={`/products/${product.id}`} className="detail-link">
                      <InfoIcon />
                    </Link>
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {/* Pagination */}
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={pageCount}
            page={page}
            onChange={handleChangePage}
            color="success"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductPage;
