import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    updatePassword
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signup = async (email, password, name) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, {
            displayName: name
        });

        // Store user data in Realtime Database
        await db.ref(`users/${user.uid}`).set({
            name: name,
            email: email,
            role: 'user',
            createdAt: new Date().toISOString()
        });

        return userCredential;
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    const updateUserProfile = async (data) => {
        if (!auth.currentUser) throw new Error("No user logged in");

        // Update Auth Profile
        if (data.displayName) {
            await updateProfile(auth.currentUser, {
                displayName: data.displayName
            });

            // Update Database
            await db.ref(`users/${auth.currentUser.uid}`).update({
                name: data.displayName
            });

            // Force refresh user state locally to reflect changes immediately
            setUser({ ...auth.currentUser, displayName: data.displayName });
        }
    };

    const updateUserPassword = async (newPassword) => {
        if (!auth.currentUser) throw new Error("No user logged in");
        await updatePassword(auth.currentUser, newPassword);
    };

    const value = {
        user,
        signup,
        login,
        logout,
        updateUserProfile,
        updateUserPassword,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
