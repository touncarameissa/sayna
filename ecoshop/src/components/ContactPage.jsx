// src/pages/ContactPage.js
import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { submitContactForm } from "../services/contactService";

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
            await submitContactForm(formData);
            setStatus("Votre message a été envoyé avec succès !");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            setStatus("Erreur lors de l'envoi du message.");
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 3, textAlign: "center" }}>
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
                <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
                    Envoyer
                </Button>
            </form>
            {status && <Typography variant="body2" color="secondary" sx={{ marginTop: 2 }}>{status}</Typography>}
        </Box>
    );
};

export default ContactPage;
