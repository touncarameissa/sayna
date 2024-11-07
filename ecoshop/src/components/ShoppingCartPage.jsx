import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart, clearCart, increaseItemQuantity, decreaseItemQuantity } from './CartSlice';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination, Typography, Box, TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DisplayMessage from './DisplayMessage';

const ShoppingCartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // État pour le terme de recherche

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
    setShowSnackbar(true);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseItemQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseItemQuantity(itemId));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Réinitialiser la page lorsque la recherche change
  };

  // Filtrer les articles en fonction du terme de recherche
  const filteredCartItems = cartItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.price.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ minWidth: 800, margin: 'auto', mt: 4 }}>
      <DisplayMessage
        message="Produit supprimé du panier et choix actif dans la liste des produits !"
        type="warning"
        duration="10000"
        open={showSnackbar}
        onClose={handleCloseSnackbar}
      />
      {/* Barre de recherche */}
      <TextField
        label="Rechercher dans le panier"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Entrez le nom d'un produit..."
      />
      <Typography variant="h4" align="center" gutterBottom>
        Panier
      </Typography>
      
      <TableContainer component={Paper}>
        <Table aria-label="cart table">
          <TableHead>
            <TableRow>
              <TableCell>Produit</TableCell>
              <TableCell>Image</TableCell>
              <TableCell align="center">Prix</TableCell>
              <TableCell align="center">Quantité</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCartItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <img src={item.image} alt={item.name} style={{ width: 50, height: 50, objectFit: 'cover',borderRadius:18 }} />
                </TableCell>
                <TableCell align="center">{item.price} CFA</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleDecreaseQuantity(item.id)} size="small">
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  {item.quantity}
                  <IconButton onClick={() => handleIncreaseQuantity(item.id)} size="small">
                    <AddIcon fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleRemoveItem(item.id)} color="primary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredCartItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Box mt={2} display="flex" justifyContent="space-between">
        <Typography  variant="h6">Montant total : {totalAmount} CFA</Typography>
        <IconButton
          onClick={handleClearCart}
          color="primary"
          sx={{ backgroundColor: '#28a745', color: '#fff', borderRadius: '5px', padding: '5px 10px' }}
        >
          Vider le panier
        </IconButton>
      </Box>
    </Box>
  );
};

export default ShoppingCartPage;
