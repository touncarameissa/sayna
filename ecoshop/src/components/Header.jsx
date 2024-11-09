import React, { useState } from "react";
import {
    AppBar, Toolbar, Typography, Button, Box, Fab, Badge, IconButton,
    Drawer, List, ListItem, ListItemText, Grid, TextField
} from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';  
import { useSelector } from "react-redux";
import AdBar from "./AdBar";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Header = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const cartItemsCount = useSelector(state => state.cart.cartItems.length);

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

    const renderMenuItems = () => (
        <>
            <Button component={Link} to="/" color="inherit">Accueil</Button>
            <Button component={Link} to="/product" color="inherit">Produits</Button>
            <Button onClick={scrollToPartners} color="inherit">Partenaires</Button>
            <Button component={Link} to="/contact" color="inherit">Contact</Button>
        </>
    );

    return (
        <Box sx={{ backgroundColor: grey[100], minHeight: "100vh", position: "relative" }}>
            <AppBar position="fixed" sx={{
                backgroundImage: `linear-gradient(45deg, ${green[700]}, ${green[400]})`,
                py: 1
            }}>
                <Toolbar>
                    <img src='/logo/logos.png' alt="Logo" width={40} height={34} /> &nbsp;&nbsp;&nbsp;
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        EcoShop
                    </Typography>

                    {/* Phone Number */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 2 }}>
                        <IconButton color="inherit" href="tel:+1234567890">
                            <PhoneIcon />
                        </IconButton>
                        <Typography variant="body2" component="a" href="tel:+1234567890" sx={{ color: 'inherit', textDecoration: 'none' }}>
                            +(221) 33 567-89-50
                        </Typography>
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {renderMenuItems()}
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                            <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
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

            {/* Footer Section */}
            <Box sx={{
                backgroundImage: `linear-gradient(45deg, ${green[700]}, ${green[400]})`,
                color: "white",
                py: 5,
                px: 3,
                mt: 5,
            }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>EcoShop</Typography>
                        <Typography variant="body2">
                            Votre boutique en ligne écologique. Découvrez nos produits respectueux de l'environnement et rejoignez notre mission pour un avenir durable.
                        </Typography>
                    </Grid>

                    <Grid item xs={6} md={2}>
                        <Typography variant="h6" gutterBottom>Liens Utiles</Typography>
                        <Typography variant="body2"><a href="/" style={{ color: 'white', textDecoration: 'none' }}>Accueil</a></Typography>
                        <Typography variant="body2"><a href="/product" style={{ color: 'white', textDecoration: 'none' }}>Produits</a></Typography>
                        <Typography variant="body2"><a href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a></Typography>
                        <Typography variant="body2"><a href="#partners-section" style={{ color: 'white', textDecoration: 'none' }}>Nos partenaires</a></Typography>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>Abonnez-vous à notre newsletter</Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Recevez des mises à jour sur nos derniers produits et offres exclusives.
                        </Typography>
                        <Box component="form" sx={{ display: "flex" }}>
                            <TextField
                                variant="filled"
                                placeholder="Votre adresse e-mail"
                                fullWidth
                                InputProps={{
                                    disableUnderline: true,
                                    style: { backgroundColor: "white", borderRadius: 4, marginRight: 8 }
                                }}
                            />
                            <Button variant="contained" sx={{ backgroundColor: grey[800], color: "white" }}>
                                S'inscrire
                            </Button>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={2} sx={{ textAlign: "center" }}>
                        <Typography variant="h6" gutterBottom>Suivez-nous</Typography>
                        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                            <IconButton color="inherit" href="https://www.facebook.com" target="_blank">
                                <FacebookIcon fontSize="large" />
                            </IconButton>
                            <IconButton color="inherit" href="https://www.instagram.com" target="_blank">
                                <InstagramIcon fontSize="large" />
                            </IconButton>
                            <IconButton color="inherit" href="https://twitter.com" target="_blank">
                                <TwitterIcon fontSize="large" />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ textAlign: "center", mt: 4, pt: 2, borderTop: `1px solid ${grey[500]}` }}>
                    <Typography variant="body2">&copy; 2024 EcoShop - Tous droits réservés</Typography>
                    <img src='/logo/logos.png' alt="Logo" width={40} height={34} />
                </Box>
            </Box>

            {/* Floating Cart Button */}
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
                            minWidth: 20,
                            height: 20,
                            borderRadius: '50%',
                            fontSize: '0.75rem',
                        },
                    }}
                >
                    <ShoppingCartIcon />
                </Badge>
            </Fab>

            {/* Floating WhatsApp Button */}
            <Fab
                color="success"
                aria-label="WhatsApp"
                sx={{
                    position: "fixed",
                    bottom: 16,
                    left: 16,
                    backgroundColor: "#25D366",  // WhatsApp green color
                    color: "white",
                }}
                href="https://wa.me/+221773237733"  
                target="_blank"
            >
                <WhatsAppIcon />
            </Fab>
        </Box>
    );
};

export default Header;
