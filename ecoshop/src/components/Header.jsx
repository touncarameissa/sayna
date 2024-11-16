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
    const cartItems = useSelector(state => state.cart.cartItems);
    const cartItemsCount = cartItems.length;
    const message = cartItemsCount > 0 ? cartItems.map(item => 
    `Produit: ${item.name}, Quantité: ${item.quantity}, PU: ${new Intl.NumberFormat('fr-FR').format(item.price)} CFA , Prix Total: ${new Intl.NumberFormat('fr-FR').format(item.price*item.quantity)} FCFA`
    ).join('\n'): ""

    // Encodez le message pour l'URL
    const whatsappMessage = cartItemsCount > 0 ?  encodeURIComponent(`Bonjour, voici les produits que je souhaite acheter:\n${message}`):encodeURIComponent('')
    const whatsappUrl = `https://wa.me/+221773237733?text=${whatsappMessage}`;

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
    const [formData,setFormData]=useState({email:""})
    const [status, setStatus] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Envoi en cours...");
        try {
            //await submitContactForm(formData);
            setStatus("Email prise en compte succès !");
            setFormData({  email: "" });
        } catch (error) {
            setStatus("Erreur lors de l'envoi du message.");
        }
    };


   /*  const renderMenuItems = () => (
        <>
            <Button component={Link} to="/" color="inherit">Accueil</Button>
            <Button component={Link} to="/product" color="inherit">Produits</Button>
            <Button onClick={scrollToPartners} color="inherit">Partenaires</Button>
            <Button component={Link} to="/contact" color="inherit">Contact</Button>
        </>
    ); */

    return (
        <Box sx={{ backgroundColor: grey[100], minHeight: "100vh", position: "relative" }}>
            {/* <AppBar position="fixed" sx={{
                backgroundImage: `linear-gradient(45deg, ${green[700]}, ${green[400]})`,
                py: 1
            }}>
                <Toolbar>
                    <img src={`${process.env.PUBLIC_URL}/logo/logos.png`} alt="Logo" width={40} height={34} /> &nbsp;&nbsp;&nbsp;
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                        EcoShop
                    </Typography>

                    {/* Phone Number /}
                    <Box sx={{ display: { xs: 'flex', sm: 'flex' }, alignItems: 'center', ml: 'auto', mr: 2 }}>
                        <IconButton color="inherit" href="tel:+221773237733">
                            <PhoneIcon />
                        </IconButton>
                        <Typography variant="body2" component="a" href="tel:+221773237733" sx={{ color: 'inherit', textDecoration: 'none' }}>
                            +(221) 77 323 77 33
                        </Typography>
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {renderMenuItems()}
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
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
            </AppBar> */}
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: "white",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    borderBottom: `1px solid ${grey[300]}`,
                    py: 1,
                }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    {/* Logo */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img src="/logo/logos.png" alt="Logo" width={40} height={34} data-testid="logo"  />
                        <Typography data-testid="shop-name"
                            variant="h6"
                            component="div"
                            sx={{
                                ml: 1,
                                fontWeight: "bold",
                                color: green[700],
                                display: { xs: "none", sm: "block" },
                            }}
                        >
                            EcoShop
                        </Typography>
                    </Box>

                    {/* Menu items (Desktop) */}
                    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
                        <Button component={Link} to="/" sx={{ color: grey[800], fontWeight: "600" }} data-testid="accueil"> 
                            Accueil
                        </Button>
                        <Button component={Link} to="/product" sx={{ color: grey[800], fontWeight: "600" }} data-testid="produits">
                            Produits
                        </Button>
                        <Button onClick={scrollToPartners} sx={{ color: grey[800], fontWeight: "600" }} data-testid="partenaires">
                            Partenaires
                        </Button>
                        <Button component={Link} to="/contact" sx={{ color: grey[800], fontWeight: "600" }} data-testid="contact">
                            Contact
                        </Button>
                    </Box>

                    {/* Contact Info (Phone number) - visible on all screens */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: green[50],
                            borderRadius: 1,
                            px: 1.5,
                        }}
                    >
                        <IconButton color="inherit" href="tel:+221773237733" sx={{ color: green[600] }}>
                            <PhoneIcon />
                        </IconButton>
                        <Typography
                            variant="body2"
                            component="a"
                            href="tel:+221773237733"
                            sx={{
                                color: green[700],
                                textDecoration: "none",
                                fontWeight: "500",
                                "&:hover": { textDecoration: "underline" },
                            }}
                        >
                            +(221) 77 323 77 33
                        </Typography>
                    </Box>

                    {/* Cart and Menu (Mobile) */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IconButton component={Link} to="/cart" sx={{ color: green[600] }}>
                            <Badge badgeContent={cartItemsCount} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>

                        {/* Mobile Menu Icon */}
                        <Box sx={{ display: { xs: "flex", md: "none" } }}>
                            <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} sx={{ color: grey[800] }}>
                                <MenuIcon />
                            </IconButton>
                            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                                <Box
                                    sx={{ width: 250, mt: 2 }}
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

                    <Grid item xs={6} md={2} >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" gutterBottom>Liens Utiles</Typography>
                        <Typography variant="body2" to={"/"} component={Link} sx={{ color: 'white', textDecoration: 'none' }}>Accueil</Typography>
                        <Typography variant="body2" to={"/product"} component={Link} sx={{ color: 'white', textDecoration: 'none' }}>Produits</Typography>
                        <Typography variant="body2" to={"/contact"} component={Link} sx={{ color: 'white', textDecoration: 'none' }}>Contact</Typography>
                        <Typography variant="body2" onClick={scrollToPartners} sx={{ color: 'white', textDecoration: 'none' }}>Nos partenaires</Typography>
                    </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>Abonnez-vous à notre newsletter</Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Recevez des mises à jour sur nos derniers produits et offres exclusives.
                        </Typography>
                        <form onSubmit={handleSubmit}> 
                            <Box   sx={{ display: "flex" }}>
                                <TextField
                                    variant="filled"
                                    name="email"
                                    value={formData.email}
                                    type="email"
                                    onChange={handleChange}
                                    placeholder="Votre adresse e-mail"
                                    fullWidth
                                    required
                                    InputProps={{
                                        disableUnderline: true,
                                        sx: { backgroundColor: "white", marginRight: 8 }
                                    }} 
                                />
                                <Button variant="contained" type="submit" sx={{ backgroundColor: grey[800], color: "white" }}>
                                    S'inscrire
                                </Button>
                           
                            </Box>
                        </form> 
                         
                        {status && <Typography variant="body2" color="secondary" sx={{ marginTop: 2 }}>{status}</Typography>}
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
                    <img src={`${process.env.PUBLIC_URL}/logo/logos.png`} alt="Logo" width={40} height={34} />
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
                {cartItemsCount > 0 ? (
                    <Badge
                        badgeContent={cartItemsCount}
                        color="error"
                        data-testid="cart-badge"
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
                ) : (
                    <ShoppingCartIcon />
                )}
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
                href={whatsappUrl}  
                target="_blank"
            >
                <WhatsAppIcon />
            </Fab>
        </Box>
    );
};

export default Header;
