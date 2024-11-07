// src/components/Header.js
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Fab } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AdBar from './AdBar';

const Header = ({ children }) => {
    const scrollToPartners = () => {
        const partnersSection = document.getElementById("partners-section");
        if (partnersSection) {
            partnersSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <Box sx={{ backgroundColor: grey[100], minHeight: "100vh", position: "relative" }}>
            {/* AppBar en position fixe */}
            <AppBar position="fixed" sx={{ backgroundColor: green[600] }}>
                <Toolbar>
                    <img src='logo/logos.png' alt="Logo" width={40} height={34} /> &nbsp;&nbsp;&nbsp;
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        EcoShop
                    </Typography>
                    <Button component={Link} to="/" color="inherit">Accueil</Button>
                    <Button component={Link} to="/product" color="inherit">Produits</Button>
                    <Button onClick={scrollToPartners} color="inherit">Partenaires</Button>
                    <Button component={Link} to="/contact" color="inherit">Contact</Button>
                </Toolbar>
            </AppBar>

            {/* Espacement pour éviter le chevauchement du contenu */}
            <Box sx={{ mt: { xs: "56px", sm: "64px" }, padding: 2 }}>
                {children}
            </Box>
             
            {/* Partenaire */}
            <Box id="partners-section" sx={{ paddingBottom: 7, textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                    Nos partenaires
                </Typography>
                <AdBar />
            </Box>
             
            {/* Pied de page */}
            <Box sx={{ backgroundColor: green[600], color: "white", padding: 2, textAlign: "center" }}>
                <Typography variant="body2">&copy; 2024 EcoShop - Tous droits réservés</Typography> &nbsp;&nbsp;&nbsp; <img src='logo/logos.png' alt="Logo" width={40} height={34} /> 
            </Box>

            {/* Bouton flottant pour le panier */}
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
                to="/cart" // Assurez-vous que cette route existe dans votre application
            >
                <ShoppingCartIcon />
            </Fab>
        </Box>
    );
};

export default Header;
