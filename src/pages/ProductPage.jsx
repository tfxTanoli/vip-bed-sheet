import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, Heart, Truck, Shield, RefreshCw, Check, Star, Minus, Plus, ChevronLeft } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { formatPrice } from "../lib/utils";

export default function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const product = products.find((p) => p.id === parseInt(id));

    const [selectedSize, setSelectedSize] = useState("Queen");
    const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card className="p-8 text-center">
                    <h2 className="text-2xl font-heading font-bold mb-4">Product Not Found</h2>
                    <p className="text-muted-foreground mb-6">
                        The product you're looking for doesn't exist.
                    </p>
                    <Link to="/shop">
                        <Button>Back to Shop</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            alert("Please Login first to add items to your cart");
            navigate("/login");
            return;
        }
        addToCart(product, quantity, selectedSize, selectedColor);
    };

    return (
        <div className="min-h-screen py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back
                </button>

                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    {/* Product Image */}
                    <div className="relative">
                        <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {product.badge && (
                            <Badge className="absolute top-4 left-4">{product.badge}</Badge>
                        )}
                        {product.originalPrice && (
                            <Badge variant="destructive" className="absolute top-4 right-4">
                                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                            </Badge>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <p className="text-primary font-medium mb-2">{product.category}</p>
                            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                                {product.name}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(product.rating)
                                                ? "text-yellow-400 fill-yellow-400"
                                                : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-muted-foreground">
                                    {product.rating} ({product.reviews} reviews)
                                </span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-primary">
                                {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                                <span className="text-xl text-muted-foreground line-through">
                                    {formatPrice(product.originalPrice)}
                                </span>
                            )}
                        </div>

                        <p className="text-muted-foreground leading-relaxed">
                            {product.description}
                        </p>

                        {/* Color Selection */}
                        <div>
                            <h3 className="font-medium mb-3">Color: {selectedColor}</h3>
                            <div className="flex flex-wrap gap-3">
                                {product.colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`px-4 py-2 rounded-lg border-2 transition-all ${selectedColor === color
                                            ? "border-primary bg-primary/10"
                                            : "border-border hover:border-primary/50"
                                            }`}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div>
                            <h3 className="font-medium mb-3">Size: {selectedSize}</h3>
                            <div className="flex flex-wrap gap-3">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 rounded-lg border-2 transition-all ${selectedSize === size
                                            ? "border-primary bg-primary/10"
                                            : "border-border hover:border-primary/50"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div>
                            <h3 className="font-medium mb-3">Quantity</h3>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border rounded-lg">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                    <span className="w-12 text-center font-medium">{quantity}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 pt-4">
                            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                Add to Cart
                            </Button>
                            <Button variant="outline" size="lg">
                                <Heart className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Features */}
                        <Card className="p-4 bg-secondary/30">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="flex flex-col items-center">
                                    <Truck className="w-6 h-6 text-primary mb-2" />
                                    <span className="text-sm font-medium">Free Shipping</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <RefreshCw className="w-6 h-6 text-primary mb-2" />
                                    <span className="text-sm font-medium">100-Night Trial</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Shield className="w-6 h-6 text-primary mb-2" />
                                    <span className="text-sm font-medium">5-Year Warranty</span>
                                </div>
                            </div>
                        </Card>

                        {/* Product Features */}
                        <div>
                            <h3 className="font-medium mb-3">Features</h3>
                            <div className="space-y-2">
                                {product.features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-500" />
                                        <span className="text-muted-foreground">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8">
                            You Might Also Like
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
