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
                return {
                    ...item,
                    image: freshProduct.image,
                    price: freshProduct.price,
                    name: freshProduct.name
                };
            }
            return item;
        });
    };

    // Load local cart initially (for guests or before auth checks)
    useEffect(() => {
        const savedCart = localStorage.getItem("bedsheet-cart");
        if (savedCart && !user) {
            try {
                const parsedCart = JSON.parse(savedCart);
                const refreshedCart = refreshCartItems(parsedCart);
                dispatch({ type: "LOAD_CART", payload: refreshedCart });
                setIsCartLoaded(true); // Treat local load as "loaded" for guests
            } catch (e) {
                console.error("Failed to parse local cart", e);
            }
        } else if (!user) {
            setIsCartLoaded(true); // Nothing to load, but we are ready
        }
    }, [user]);

    // Sync with Firebase when User changes (Login/Logout)
    useEffect(() => {
        if (user) {
            setIsCartLoaded(false); // Reset loading state when user switches
            // User Logged In
            const cartRef = ref(db, `users/${user.uid}/cart`);

            // Check for guest items
            const guestCart = localStorage.getItem("bedsheet-cart");
            const localItems = guestCart ? JSON.parse(guestCart) : [];

            get(cartRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const dbCart = snapshot.val();

                    if (localItems.length > 0 && (!dbCart || dbCart.length === 0)) {
                        // Push Local to DB
                        const refreshedLocal = refreshCartItems(localItems);
                        set(cartRef, refreshedLocal);
                        dispatch({ type: "LOAD_CART", payload: refreshedLocal });
                    } else {
                        // Load DB
                        const refreshedDb = refreshCartItems(dbCart);
                        dispatch({ type: "LOAD_CART", payload: refreshedDb });
                    }
                } else {
                    // DB empty. If we have local items, push them!
                    if (localItems.length > 0) {
                        const refreshedLocal = refreshCartItems(localItems);
                        set(cartRef, refreshedLocal);
                        dispatch({ type: "LOAD_CART", payload: refreshedLocal });
                    } else {
                        dispatch({ type: "LOAD_CART", payload: [] });
                    }
                }

                // Clear local storage after syncing so it doesn't leak
                localStorage.removeItem("bedsheet-cart");
                setIsCartLoaded(true); // Now we are loaded and can save subsequent changes

            }).catch(err => {
                console.error("Error loading cart:", err);
                setIsCartLoaded(true); // Even if error, we should probably allow interaction?
            });
        } else {
            // User Logged Out: Load from local storage (Guest Cart)
            const savedCart = localStorage.getItem("bedsheet-cart");
            const parsedCart = savedCart ? JSON.parse(savedCart) : [];
            const refreshedCart = refreshCartItems(parsedCart);
            dispatch({ type: "LOAD_CART", payload: refreshedCart });
            setIsCartLoaded(true);
        }
    }, [user]);

    // Save to Storage (Local OR DB) whenever cart changes
    useEffect(() => {
        if (!isCartLoaded) return; // Block saving until initial load is complete!

        if (user) {
            // Authenticated: Save ONLY to DB
            const saveToDb = async () => {
                try {
                    await set(ref(db, `users/${user.uid}/cart`), state.items);
                } catch (error) {
                    console.error("Error syncing cart to DB:", error);
                }
            };
            saveToDb();
        } else {
            // Guest: Save ONLY to Local Storage
            localStorage.setItem("bedsheet-cart", JSON.stringify(state.items));
        }
    }, [state.items, user, isCartLoaded]);

    const addToCart = (product, quantity = 1, size = "Queen", color = "") => {
        dispatch({
            type: "ADD_TO_CART",
            payload: { ...product, quantity, size, color },
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
