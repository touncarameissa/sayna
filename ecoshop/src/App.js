import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './components/HomePage';
import ContactPage from './components/ContactPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
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
        </Routes>
    </Router>
);}

export default App;
