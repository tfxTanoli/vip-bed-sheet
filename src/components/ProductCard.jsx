import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Star, Eye } from "lucide-react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { formatPrice } from "../lib/utils";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated) {
            alert("Please Login first to add items to your cart");
            navigate("/login");
            return;
        }

        addToCart(product, 1, "Queen");
    };

    return (
        <Link to={`/product/${product.id}`}>
            <Card className="group relative overflow-hidden hover-lift product-card cursor-pointer h-full border-none shadow-md hover:shadow-xl bg-card/50 backdrop-blur-sm">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.badge && (
                            <Badge className="bg-white/90 text-black backdrop-blur-md shadow-sm">
                                {product.badge}
                            </Badge>
                        )}
                    </div>

                    {product.originalPrice && (
                        <Badge variant="destructive" className="absolute top-4 right-4 shadow-sm animate-pulse">
                            Sale
                        </Badge>
                    )}

                    {/* Quick Actions */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                        <Button
                            size="sm"
                            onClick={handleAddToCart}
                            className="flex-1 bg-white text-black hover:bg-white/90 shadow-lg"
                        >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                        </Button>
                        <Button size="sm" variant="secondary" className="bg-white/20 text-white hover:bg-white/40 backdrop-blur-md border border-white/30">
                            <Eye className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                    <div>
                        <p className="text-xs font-semibold tracking-wider text-primary uppercase mb-1">{product.category}</p>
                        <h3 className="font-heading font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                            {product.name}
                        </h3>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-3.5 h-3.5 ${i < Math.floor(product.rating)
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-muted-foreground/30"
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-muted-foreground font-medium">
                            ({product.reviews})
                        </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                        {/* Price */}
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-foreground">
                                {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through decoration-destructive/50">
                                    {formatPrice(product.originalPrice)}
                                </span>
                            )}
                        </div>

                        {/* Colors Preview */}
                        <div className="flex items-center -space-x-1.5">
                            {product.colors.slice(0, 3).map((color, index) => (
                                <div
                                    key={index}
                                    className="w-5 h-5 rounded-full border-2 border-background shadow-sm ring-1 ring-black/5"
                                    style={{
                                        backgroundColor:
                                            color === "White" ? "#ffffff" :
                                                color === "Ivory" ? "#FFFFF0" :
                                                    color === "Silver" ? "#C0C0C0" :
                                                        color === "Natural" ? "#F5F5DC" :
                                                            color === "Sage Green" ? "#9CAF88" :
                                                                color === "Ocean Blue" ? "#0077BE" :
                                                                    color === "Blush Pink" ? "#FFB6C1" :
                                                                        color === "Navy" ? "#000080" :
                                                                            color === "Gray" || color === "Light Gray" ? "#808080" :
                                                                                "#E5E5E5",
                                    }}
                                    title={color}
                                />
                            ))}
                            {product.colors.length > 3 && (
                                <div className="w-5 h-5 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[8px] font-medium text-muted-foreground">
                                    +{product.colors.length - 3}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
}
