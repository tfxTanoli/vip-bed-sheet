import { createContext, useContext, useReducer, useEffect } from "react";

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

    useEffect(() => {
        const savedCart = localStorage.getItem("bedsheet-cart");
        if (savedCart) {
            dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("bedsheet-cart", JSON.stringify(state.items));
    }, [state.items]);

    const addToCart = (product, quantity = 1, size = "Queen") => {
        dispatch({
            type: "ADD_TO_CART",
            payload: { ...product, quantity, size },
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

    const getCartTotal = () => {
        return state.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };

    const getCartCount = () => {
        return state.items.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartTotal,
                getCartCount,
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
