import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Fab, Badge, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from "react-redux";
import AdBar from "./AdBar";

const Header = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
   /*  const cartItemsCount = useSelector(state =>
        state.cart.cartItems.reduce((total, item) => total + item.quantity, 0)
    ); */
    const cartItemsCount = useSelector(state =>
        state.cart.cartItems.length // Compte uniquement les produits uniques
    );

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const scrollToPartners = () => {
        const partnersSection = document.getElementById("partners-section");
        if (partnersSection) {
            partnersSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const renderMenuItems = (isDrawer = false) => (
        <>
            <Button component={Link} to="/" color="inherit">Accueil</Button>
            <Button component={Link} to="/product" color="inherit">Produits</Button>
            <Button onClick={scrollToPartners} color="inherit">Partenaires</Button>
            <Button component={Link} to="/contact" color="inherit">Contact</Button>
        </>
    );

    return (
        <Box sx={{ backgroundColor: grey[100], minHeight: "100vh", position: "relative" }}>
            <AppBar position="fixed" sx={{ backgroundColor: green[600] }}>
                <Toolbar>
                    <img src='logo/logos.png' alt="Logo" width={40} height={34} /> &nbsp;&nbsp;&nbsp;
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        EcoShop
                    </Typography>

                    {/* Menu pour les écrans larges */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {renderMenuItems()}
                    </Box>

                    {/* Menu pour les petits écrans */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                            <Box
                                sx={{ width: 250 }}
                                role="presentation"
                                onClick={toggleDrawer(false)}
                                onKeyDown={toggleDrawer(false)}
                            >
                                <List>
                                    <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
                                        <ListItemText primary="Accueil" />
                                    </ListItem>
                                    <ListItem button component={Link} to="/product" onClick={toggleDrawer(false)}>
                                        <ListItemText primary="Produits" />
                                    </ListItem>
                                    <ListItem button onClick={() => { toggleDrawer(false); scrollToPartners(); }}>
                                        <ListItemText primary="Partenaires" />
                                    </ListItem>
                                    <ListItem button component={Link} to="/contact" onClick={toggleDrawer(false)}>
                                        <ListItemText primary="Contact" />
                                    </ListItem>
                                </List>
                            </Box>
                        </Drawer>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box sx={{ mt: { xs: "56px", sm: "64px" }, padding: 2 }}>
                {children}
            </Box>

            <Box id="partners-section" sx={{ paddingBottom: 7, textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                    Nos partenaires
                </Typography>
                <AdBar />
            </Box>
             
            <Box sx={{ backgroundColor: green[600], color: "white", padding: 2, textAlign: "center" }}>
                <Typography variant="body2">&copy; 2024 EcoShop - Tous droits réservés</Typography> &nbsp;&nbsp;&nbsp; <img src='logo/logos.png' alt="Logo" width={40} height={34} /> 
            </Box>

            <Fab
                color="primary"
                aria-label="Panier"
                sx={{
                    position: "fixed",
                    bottom: 16,
                    right: 16,
                    backgroundColor: green[600],
                    color: "white",
                }}
                component={Link}
                to="/cart"
            >
                <Badge 
    badgeContent={cartItemsCount} 
    color="error"
    sx={{
        '& .MuiBadge-badge': {
            top: -28,
            right: -15,
            transform: 'scale(1)',
            minWidth: 20, // Largeur minimale pour garder une taille fixe
            height: 20, // Hauteur fixe
            borderRadius: '50%', // Garde la forme circulaire
            fontSize: '0.75rem', // Taille de la police adaptée
        },
    }}
>
    <ShoppingCartIcon />
</Badge>

            </Fab>
        </Box>
    );
};

export default Header;
