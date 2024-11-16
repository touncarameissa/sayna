import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart,removeItemFromCart } from './CartSlice';
import { Link } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';


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
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import UseFetch from '../services/UseFetch';
import NumberWithSeparator from './NumberWithSeparator';

const ITEMS_PER_PAGE = 6;

const ProductPage = () => {
  
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [page, setPage] = useState(1);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Nouvel état pour le terme de recherche
  const [message,setMessage]=useState('')
  const [color,setColor]=useState("")


  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  }

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
  const productsData = UseFetch(`${process.env.PUBLIC_URL}/datas/products.json`);
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
        message={message}
        type={color}
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
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon color="success" />
                    </InputAdornment>
                ),
                sx: {
                    borderRadius: '20px',
                    backgroundColor: '#f5f5f5',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#4caf50',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#4caf50',
                    },
                },
            }}
            sx={{
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '20px',
            }}
        />
        <Typography variant="h4" fontWeight="medium" mb={3} textAlign="center">
          Nos Produits
        </Typography>
         {/* Pagination */}
         <Box mt={4} display="flex" justifyContent="center" sx={{paddingBottom:6}}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handleChangePage}
            color="success"
          />
        </Box>
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
                  sx={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "15px",
                  }}
                    component="img"
                    height="194"
                    image={`${process.env.PUBLIC_URL}${product.image}`}
                    alt={product.name}
                />
                <CardContent>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    <NumberWithSeparator number={product.price} />
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
                  <IconButton onClick={() => handleRemoveItem(product.id)} 
                    disabled={!cartItems.some((item) => item.id === product.id)} title='Supprimer produit du panier' color="error">
                    <RemoveShoppingCartIcon />
                  </IconButton>
                  <IconButton color='info' aria-label="view details" title="Voir détails produit" component={Link} to={`/product/${product.id}`}>
                    <InfoIcon />
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
