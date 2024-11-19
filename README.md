# EcoShop

Bienvenue dans **EcoShop**, une application e-commerce écologique !  

---
## 🚀 **Accès aux plateformes**  

- **Portfolio** : [Meissa Touncara - Portfolio](https://meissa-touncara-portfolio.netlify.app)  
- **EcoShop déployé** : [EcoShop - Démo en ligne](https://sayna-ecoshop.netlify.app)  

    
## 📂 **Fichiers annexes plus liens internet** 

### Position dans gitHUb
  - à la racine du dépôt **sayna** dans un sous dossier nommé **annexes**
### contenu fichiers et liens
  - saynaEchoshop.fig pour le prototype fait avec **Figma**
       - https://www.figma.com/design/1BMcj96edfhXrAZFqi61Ui/saynaEchoshop?node-id=0-1&t=M0CUpjWV0uQiGSlp-1
  - la partie gestion de projet avec **Jira**
       -  https://touncarameissa-1731502386134.atlassian.net/jira/software/projects/ECOSHOP/boards/2?atlOrigin=eyJpIjoiNDYyODY2ZWY4MmU5NGY4Njg1NmJiNjU3NmI5MzBkMDgiLCJwIjoiaiJ9

    
## Fonctionnalités principales

### 🛒 Gestion du panier
- Visualiser des produits au panier.
- Modifier les quantités des produits dans le panier.
- Affichage du nombre d'articles dans le badge du panier.
- Supprimer un produit du panier.
- Visualiser les détails d'un produit.

### 🌍 Navigation responsive
- Une interface adaptée pour ordinateurs, tablettes et mobiles.
- Menu de navigation mobile avec bouton déroulant.

### 📞 Support et contact
- Affichage du numéro de téléphone directement dans la barre de navigation.
- Bouton WhatsApp pour contacter rapidement notre équipe.

### 🛍️ Produits
- Visualisation de produits écologiques avec descriptions détaillées.
- Affichage de produits dans une disposition responsive.
- Ajouter un produit au panier s'il n y est pas.
- Supprimer le produit au panier si il y est déjà ajouté.
- Visualiser les détails d'un produit.

### 🛍️ Détails produit
- Visualisation d'un produit avec descriptions détaillées.
- Ajouter le produit au panier s'il n y est pas.
- supprimer le produit au panier si il y est déjà ajouté. 
### ⚡ Partenaires
- Section dédiée à nos partenaires écologiques avec logos.

---

## 🛠️ **Technologies utilisées**

- **React** : pour construire l'interface utilisateur.
- **Redux Toolkit** : pour gérer l'état global de l'application.
- **Material-UI** : pour une interface élégante et réactive.
- **React Router** : pour la navigation entre les pages.

---

## 📝 **Installation** 

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/touncarameissa/sayna.git
2. Installer les dépendances suivantes
    - Installer matrial UI pour react
      ```bash
        npm install @mui/material @emotion/react @emotion/styled
    - Installer les icons  matrial UI pour react
      ```bash
        npm install @mui/icons-material
    - Installer le module Carousel  pour le défilement des informations des partenaires
      ```bash
        npm install react-material-ui-carousel
    - Installer le module de routage
    - ```bash
        npm install react-router-dom
    - Installer les modules suivantes l’état globales des données de l’appplication
    - ```bash
        npm install @reduxjs/toolkit
        npm install react-redux  --save
        npm install --save redux react-redux
    - Installer le module de testes unitaires de composants react
      ```bash
        npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
3. Installaton du node_modules
   ```bash
   npm install
4. Lancer en local
   ```bash
    npm  start
3. Visualisation en local dans la barre d'adresse du navigateur
   ```bash
     localhost:3000
