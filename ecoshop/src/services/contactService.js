// src/services/contactService.js
export const submitContactForm = async (formData) => {
    try {
        // Remplacez l'URL par l'endpoint où les données de contact seront envoyées
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        
        if (!response.ok) {
            throw new Error("Erreur lors de l'envoi du formulaire de contact");
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur:", error);
        throw error;
    }
};
