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
import { Link } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import { green, grey } from "@mui/material/colors";

const ShoppingCartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [message,setMessage]=useState('')

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
    setMessage("Produit supprimé du panier et choix actif dans la liste des produits !")
    setShowSnackbar(true);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setMessage("Panier vidé et choix de tous les produits  actif dans la liste des produits !")
    setShowSnackbar(true);
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
    setPage(0);
  };

  const filteredCartItems = cartItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.price.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ minWidth: 800, margin: 'auto', mt: 4 }}>
      <DisplayMessage
        message={message}
        type="warning"
        duration="10000"
        open={showSnackbar}
        onClose={handleCloseSnackbar}
      />
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
        Votre Panier
      </Typography>
      
      {cartItems.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          est vide
        </Typography>
      ) : (
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
                  <TableCell component={Link} to={`/product/${item.id}`}>
                    <img title='Voir détails produit' src={item.image} alt={item.name} style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 18 }} />
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
                    <Box display="flex" justifyContent="center" alignItems="center">
                      <IconButton aria-label="view details" title="Voir détails produit" color='primary' component={Link} to={`/product/${item.id}`}>
                        <InfoIcon />
                      </IconButton>
                      <IconButton onClick={() => handleRemoveItem(item.id)} title='Supprimer produit' color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
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
      )}

      {cartItems.length > 0 && (
        <Box mt={2} display="flex" justifyContent="space-between">
          <Typography variant="h6">Montant total : {totalAmount} CFA</Typography>
          <IconButton
            onClick={handleClearCart}
            sx={{ backgroundColor: green[700], borderRadius: '5px', color: grey[300], padding: '5px 10px' }}
          >
            Vider le panier
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default ShoppingCartPage;
