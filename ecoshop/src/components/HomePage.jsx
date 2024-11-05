import React from "react";
import "./HomePage.css";

const HomePage = () => {
    return (
        <div className="eco-container">
            {/* En-tête */}
            <header className="eco-header">
                <h1>GreenShop</h1>
                <nav className="eco-nav">
                    <a href="#home">Accueil</a>
                    <a href="#products">Produits</a>
                    <a href="#about">À propos</a>
                    <a href="#contact">Contact</a>
                </nav>
            </header>

            {/* Section Héros */}
            <section className="eco-hero">
                <h2>Produits écologiques pour un avenir durable</h2>
                <p>Explorez notre sélection de produits respectueux de l’environnement.</p>
                <button className="eco-cta">Découvrir nos produits</button>
            </section>

            {/* Produits en vedette */}
            <section className="eco-featured">
                <h3>Nos produits phares</h3>
                <div className="eco-products">
                    <div className="eco-product">
                        <img src="product1.jpg" alt="Produit écologique 1" />
                        <h4>Sac en coton bio</h4>
                        <p>Un choix durable et esthétique.</p>
                    </div>
                    <div className="eco-product">
                        <img src="product2.jpg" alt="Produit écologique 2" />
                        <h4>Gourde en inox</h4>
                        <p>Pour dire non au plastique jetable.</p>
                    </div>
                    <div className="eco-product">
                        <img src="product3.jpg" alt="Produit écologique 3" />
                        <h4>Produits de soins naturels</h4>
                        <p>Sans produits chimiques nocifs.</p>
                    </div>
                </div>
            </section>

            {/* Pied de page */}
            <footer className="eco-footer">
                <p>&copy; 2024 GreenShop - Tous droits réservés</p>
            </footer>
        </div>
    );
};

export default HomePage;
