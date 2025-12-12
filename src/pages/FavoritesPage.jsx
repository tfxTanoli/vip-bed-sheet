import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import ProductCard from "../components/ProductCard";
import { useFavorites } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";

export default function FavoritesPage() {
    const { favorites, loading: favoritesLoading } = useFavorites();
    const { user, loading: authLoading } = useAuth();
    const { products, loading: productsLoading } = useProducts();

    if (authLoading || favoritesLoading || productsLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!user) {
        return (
            <div className="min-h-screen py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Card className="max-w-lg mx-auto p-12 text-center">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                            <Heart className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h2 className="text-2xl font-heading font-bold mb-4">Login to View Favorites</h2>
                        <p className="text-muted-foreground mb-8">
                            Please login to save and view your favorite products.
                        </p>
                        <Link to="/login">
                            <Button size="lg">
                                Login Now
                            </Button>
                        </Link>
                    </Card>
                </div>
            </div>
        );
    }

    // Filter products based on favorites IDs
    const favoriteProducts = products.filter(product => favorites.includes(product.id));

    if (favorites.length === 0) {
        return (
            <div className="min-h-screen py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Card className="max-w-lg mx-auto p-12 text-center">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                            <Heart className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h2 className="text-2xl font-heading font-bold mb-4">No Favorites Yet</h2>
                        <p className="text-muted-foreground mb-8">
                            Start exploring our collection and save the items you love!
                        </p>
                        <Link to="/shop">
                            <Button size="lg">
                                Start Shopping
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                        Your <span className="gradient-text">Favorites</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Here are the products you've saved for later.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
