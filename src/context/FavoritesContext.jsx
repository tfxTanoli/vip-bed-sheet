import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../../firebase";

const FavoritesContext = createContext();

export function useFavorites() {
    return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setFavorites([]);
            setLoading(false);
            return;
        }

        const favoritesRef = db.ref(`users/${user.uid}/favorites`);

        favoritesRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convert object {key: productId} or {key: productObj} to array
                // Storing just IDs is efficient, but storing full objects avoids extra fetches
                // Let's store IDs for simplicity and consistency, or match existing patterns
                // If we store just IDs:
                const favoriteIds = Object.values(data);
                setFavorites(favoriteIds);
            } else {
                setFavorites([]);
            }
            setLoading(false);
        });

        return () => favoritesRef.off();
    }, [user]);

    const toggleFavorite = async (productId) => {
        if (!user) {
            // Optional: prompt login
            return false; // Indicating failure/login needed
        }

        const isFavorited = favorites.includes(productId);
        const favoritesRef = db.ref(`users/${user.uid}/favorites`);

        if (isFavorited) {
            // Remove
            // We need to find the key to remove
            const snapshot = await favoritesRef.orderByValue().equalTo(productId).once('value');
            const data = snapshot.val();
            if (data) {
                const key = Object.keys(data)[0];
                await favoritesRef.child(key).remove();
            }
        } else {
            // Add
            await favoritesRef.push(productId);
        }
        return true;
    };

    const isFavorite = (productId) => {
        return favorites.includes(productId);
    };

    const value = {
        favorites,
        toggleFavorite,
        isFavorite,
        loading
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}
