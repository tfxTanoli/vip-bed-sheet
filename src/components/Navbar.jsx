import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Sun, Moon, Menu, X, Bed, LogOut } from "lucide-react";
import { Button } from "./ui/Button";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Badge } from "./ui/Badge";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const { cartCount } = useCart();
    const { user, logout, isAuthenticated } = useAuth();

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <nav className="sticky top-0 z-50 glass-nav">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                            <Bed className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl md:text-2xl font-heading font-bold gradient-text">
                            DreamWeave
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-foreground/80 hover:text-primary font-medium transition-colors duration-300 relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 md:space-x-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="relative overflow-hidden"
                        >
                            {theme === "dark" ? (
                                <Sun className="w-5 h-5 transition-transform duration-500 rotate-0 scale-100" />
                            ) : (
                                <Moon className="w-5 h-5 transition-transform duration-500 rotate-0 scale-100" />
                            )}
                        </Button>

                        <Link to="/cart" className="relative">
                            <Button variant="ghost" size="icon">
                                <ShoppingCart className="w-5 h-5" />
                                {cartCount > 0 && (
                                    <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs animate-fade-in">
                                        {cartCount}
                                    </Badge>
                                )}
                            </Button>
                        </Link>

                        {/* Login/User Button for Desktop */}
                        {isAuthenticated ? (
                            <div className="hidden md:flex items-center gap-4">
                                <span className="text-sm font-medium">Hi, {user?.name?.split(" ")[0]}</span>
                                <Button variant="ghost" size="icon" onClick={logout} title="Logout">
                                    <LogOut className="w-5 h-5" />
                                </Button>
                            </div>
                        ) : (
                            <Link to="/login" className="hidden md:block">
                                <Button variant="default" size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                                    Login
                                </Button>
                            </Link>
                        )}

                        {/* Mobile menu button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border animate-fade-in">
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-foreground/80 hover:text-primary font-medium transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-accent"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {isAuthenticated ? (
                                <div className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-accent">
                                    <span className="text-foreground/80 font-medium">Hi, {user?.name?.split(" ")[0]}</span>
                                    <Button variant="ghost" size="sm" onClick={() => { logout(); setIsMenuOpen(false); }}>
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="text-foreground/80 hover:text-primary font-medium transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-accent"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
