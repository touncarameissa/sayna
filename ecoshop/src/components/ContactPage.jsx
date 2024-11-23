// src/pages/ContactPage.js
import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
//import { submitContactForm } from "../services/contactService";
import { green } from "@mui/material/colors";
import { Link } from "react-router-dom";

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
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
            setStatus("Votre message a été envoyé avec succès !");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            setStatus("Erreur lors de l'envoi du message.");
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 3, textAlign: "center" }}>
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
                    Influencer au maximum pour une planète pure et durable
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 300 }}>
                    Explorez notre sélection de produits respectueux de l’environnement.
                </Typography>
                <Button
                    component={Link} to="/product"
                    variant="contained"
                    sx={{ backgroundColor: green[700], marginTop: 2 }}
                    size="large"
                >
                    Découvrir nos produits
                </Button>
            </Box>
            <Typography variant="h4" gutterBottom>Contactez-nous</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nom"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    required
                />
                <Button type="submit" color="success" variant="contained" sx={{ marginTop: 2 }}>
                    Envoyer
                </Button>
            </form>
            {status && <Typography variant="body2" color="secondary" sx={{ marginTop: 2 }}>{status}</Typography>}
        </Box>
    );
};

export default ContactPage;
