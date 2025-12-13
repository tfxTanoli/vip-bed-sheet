import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../../firebase";
import { ref, set, get } from "firebase/database";
import { products } from "../data/products";

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id && item.size === action.payload.size
            );
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.id === action.payload.id && item.size === action.payload.size
                            ? { ...item, quantity: item.quantity + action.payload.quantity }
                            : item
                    ),
                };
            }
            return {
                ...state,
                items: [...state.items, { ...action.payload }],
            };
        }
        case "REMOVE_FROM_CART":
            return {
                ...state,
                items: state.items.filter(
                    (item) => !(item.id === action.payload.id && item.size === action.payload.size)
                ),
            };
        case "UPDATE_QUANTITY":
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.payload.id && item.size === action.payload.size
                        ? { ...item, quantity: Math.max(1, action.payload.quantity) }
                        : item
                ),
            };
        case "CLEAR_CART":
            return { ...state, items: [] };
        case "LOAD_CART":
            return { ...state, items: action.payload };
        default:
            return state;
    }
};

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });
    const { user } = useAuth();
    const [isCartLoaded, setIsCartLoaded] = useState(false);

    // Helper to refresh items with latest product data
    const refreshCartItems = (items) => {
        if (!items) return [];
        return items.map(item => {
            const freshProduct = products.find(p => p.id === item.id);
            if (freshProduct) {
                // Try to resolve the correct image based on color if possible
                let correctImage = freshProduct.image;

                return {
                    ...item,
                    image: correctImage,
                    price: freshProduct.price,
                    name: freshProduct.name,
                };
            }
            return item;
        });
    };

    // ... (useEffect blocks remain same, verify if they need changes, usually not if calling refreshCartItems)

    // ...

    const addToCart = (product, quantity = 1, size = "Queen", specificImage = null) => {
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                ...product,
                quantity,
                size,
                image: specificImage || product.image // Use specific image if provided
            },
        });
    };

    const removeFromCart = (id, size) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: { id, size } });
    };

    const updateQuantity = (id, size, quantity) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, size, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };

    const cartTotal = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const cartCount = state.items.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
