import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Grid, Paper } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import UseFetch from "../services/UseFetch";

const HomePage = () => {
    const products = UseFetch("/datas/productfar.json");
    console.log(products);

    return (
        <Box sx={{ backgroundColor: grey[100], minHeight: "100vh", padding: 2 }}>
            {/* En-tête */}
            <AppBar position="static" sx={{ backgroundColor: green[600] }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        EcoShop
                    </Typography>
                    <Button color="inherit">Accueil</Button>
                    <Button color="inherit">Produits</Button>
                    <Button color="inherit">À propos</Button>
                    <Button color="inherit">Contact</Button>
                </Toolbar>
            </AppBar>

            {/* Section Héros */}
            <Box
                sx={{
                    textAlign: "center",
                    backgroundColor: green[400],
                    color: "white",
                    borderRadius: 2,
                    padding: 4,
                    marginTop: 4,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Produits écologiques pour un avenir durable
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 300 }}>
                    Explorez notre sélection de produits respectueux de l’environnement.
                </Typography>
                <Button
                    variant="contained"
                    sx={{ backgroundColor: green[700], marginTop: 2 }}
                    size="large"
                >
                    Découvrir nos produits
                </Button>
            </Box>

            {/* Produits en vedette */}
            <Box sx={{ textAlign: "center", marginY: 5 }}>
                <Typography variant="h5" gutterBottom>
                    Nos produits phares
                </Typography>
                <Grid container spacing={3} sx={{ marginTop: 2 }}>
                    {products.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <Paper
                                elevation={3}
                                sx={{
                                    padding: 2,
                                    borderRadius: 2,
                                    textAlign: "center",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    height: "100%",  // Assure une taille égale pour chaque Paper
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{
                                        width: "100%",
                                        height: "300px", // Fixe la hauteur pour les images
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        marginBottom: "15px",
                                    }}
                                />
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography variant="body2" sx={{ color: grey[700], marginTop: 1 }}>
                                    {item.description}
                                </Typography>
                                <Typography variant="body2" sx={{ color: green[700], marginTop: 1 }}>
                                    Prix : {item.price}€
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Pied de page */}
            <Box sx={{ backgroundColor: green[600], color: "white", padding: 2, textAlign: "center" }}>
                <Typography variant="body2">&copy; 2024 EcoShop - Tous droits réservés</Typography>
            </Box>
        </Box>
    );
};

export default HomePage;