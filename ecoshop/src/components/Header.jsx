// src/components/Header.js
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ children }) => {
    return (
        <Box sx={{ backgroundColor: grey[100], minHeight: "100vh" }}>
            {/* AppBar en position fixe */}
            <AppBar position="fixed" sx={{ backgroundColor: green[600] }}>
                <Toolbar>
                    <MenuIcon /> &nbsp;&nbsp;&nbsp;
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        EcoShop
                    </Typography>
                    <Button component={Link} to="/" color="inherit">Accueil</Button>
                    <Button color="inherit">Produits</Button>
                    <Button color="inherit">À propos</Button>
                    <Button component={Link} to="/contact" color="inherit">Contact</Button>
                </Toolbar>
            </AppBar>

            {/* Espacement pour éviter le chevauchement du contenu */}
            <Box sx={{ mt: { xs: "56px", sm: "64px" }, padding: 2 }}>
                {children}
            </Box>

            {/* Pied de page */}
            <Box sx={{ backgroundColor: green[600], color: "white", padding: 2, textAlign: "center" }}>
                <Typography variant="body2">&copy; 2024 EcoShop - Tous droits réservés</Typography>
            </Box>
        </Box>
    );
};

export default Header;
