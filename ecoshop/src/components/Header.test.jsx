import { render, screen } from "@testing-library/react";
import Header from "./Header"; 
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../components/CartSlice'; // Ajustez le chemin du reducer
import { MemoryRouter } from "react-router-dom";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

describe("Header Component", () => {
    test("renders the header correctly", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );

        // Vérification de la présence du logo
        const logo = screen.getByTestId("logo");;
        expect(logo).toBeInTheDocument();

        // Vérification de la présence du nom EcoShop
        const shopName = screen.getByTestId("shop-name");
        expect(shopName).toBeInTheDocument();

        // Vérification du lien Accueil
        const homeLink = screen.getByTestId("accueil");
        expect(homeLink).toBeInTheDocument();

   
    });

    /* test("displays the cart badge correctly when there are items in the cart", () => {
        const mockStore = configureStore({
            reducer: {
                cart: cartReducer,
            },
            preloadedState: {
                cart: { cartItems: [{ name: "Produit 1", quantity: 2, price: 1000 }] },
            },
        });

        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );

        // Vérification du badge de panier
        const cartBadge = screen.getByTestId("cart-badge");
        expect(cartBadge).toHaveTextContent("2");
    }); */

    /* test("opens and closes the drawer menu on mobile", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );

        // Vérifier que le menu est fermé au départ
        const drawerButton = screen.getByRole("button", { name: /menu/i });
        expect(screen.queryByText("Accueil")).not.toBeInTheDocument();

        // Simuler un clic sur l'icône de menu
        fireEvent.click(drawerButton);

        // Vérifier que le menu est ouvert
        const homeLinkInDrawer = screen.getByText("Accueil");
        expect(homeLinkInDrawer).toBeInTheDocument();

        // Simuler la fermeture du menu
        fireEvent.click(homeLinkInDrawer);

        // Vérifier que le menu est fermé
        expect(screen.queryByText("Accueil")).not.toBeInTheDocument();
    });
 */
    /* test("renders the WhatsApp floating button with correct URL", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );
        /* const cartBadge = screen.getByTestId("cart-badge");
        expect(cartBadge).toHaveTextContent("2"); /
        const whatsappButton = screen.getByRole("button", { name: /whatsapp/i });
        expect(whatsappButton).toBeInTheDocument();

        const whatsappLink = whatsappButton.getAttribute("href");
        expect(whatsappLink).toContain("wa.me/+221773237733");
    }); */

    test("displays the contact phone number", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );

        const phoneNumber = screen.getByText("+(221) 77 323 77 33");
        expect(phoneNumber).toBeInTheDocument();
    });
});
