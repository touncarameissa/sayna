import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './components/HomePage';
import ContactPage from './components/ContactPage';
import Header from './components/Header';
import ProductPage from './components/ProductPage';
import ShoppingCartPage from './components/ShoppingCartPage';
import DetailProductPage from './components/DetailProductPage';

function App() {
  return (
    <Router basename="/sayna/ecoshop">
        <Routes>
            <Route
                path="/"
                element={
                    <Header>
                        <HomePage />
                    </Header>
                }
            />
            <Route
                path="/contact"
                element={
                    <Header>
                        <ContactPage />
                    </Header>
                }
            />
            <Route
                path="/product"
                element={
                    <Header>
                        <ProductPage />
                    </Header>
                }
            />
             <Route
                path="/cart"
                element={
                    <Header>
                        <ShoppingCartPage />
                    </Header>
                }
            />
             <Route
                path="/product/:id"
                element={
                    <Header>
                        <DetailProductPage />
                    </Header>
                }
            />
        </Routes>
    </Router>
);}

export default App;
