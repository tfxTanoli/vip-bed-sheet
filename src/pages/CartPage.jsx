import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/utils";

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div className="min-h-screen py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Card className="max-w-lg mx-auto p-12 text-center">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h2 className="text-2xl font-heading font-bold mb-4">Your Cart is Empty</h2>
                        <p className="text-muted-foreground mb-8">
                            Looks like you haven't added any sheets to your cart yet.
                            Start shopping and treat yourself to the best sleep of your life!
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

    const subtotal = cartTotal;
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return (
        <div className="min-h-screen py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl md:text-4xl font-heading font-bold">
                        Shopping <span className="gradient-text">Cart</span>
                    </h1>
                    <Button variant="ghost" onClick={clearCart} className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear Cart
                    </Button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <Card key={`${item.id}-${item.size}`} className="p-4 md:p-6">
                                <div className="flex gap-4 md:gap-6">
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <Link to={`/product/${item.id}`}>
                                                    <h3 className="font-heading font-semibold text-lg hover:text-primary transition-colors line-clamp-1">
                                                        {item.name}
                                                    </h3>
                                                </Link>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Size: {item.size}
                                                </p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-muted-foreground hover:text-destructive"
                                                onClick={() => removeFromCart(item.id, item.size)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center border rounded-lg">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </Button>
                                                <span className="w-10 text-center text-sm font-medium">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </Button>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-lg text-primary">
                                                    {formatPrice(item.price * item.quantity)}
                                                </p>
                                                {item.quantity > 1 && (
                                                    <p className="text-sm text-muted-foreground">
                                                        {formatPrice(item.price)} each
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div>
                        <Card className="p-6 sticky top-24">
                            <h2 className="font-heading font-semibold text-xl mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Tax (8%)</span>
                                    <span>{formatPrice(tax)}</span>
                                </div>
                                {shipping > 0 && (
                                    <p className="text-sm text-primary">
                                        Add {formatPrice(100 - subtotal)} more for free shipping!
                                    </p>
                                )}
                                <div className="border-t pt-4">
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span className="text-primary">{formatPrice(total)}</span>
                                    </div>
                                </div>
                            </div>

                            <Link to="/checkout">
                                <Button className="w-full" size="lg">
                                    Proceed to Checkout
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>

                            <p className="text-center text-sm text-muted-foreground mt-4">
                                Secure checkout powered by Stripe
                            </p>

                            <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                                <p className="text-sm font-medium mb-2">Accepted Payment Methods</p>
                                <div className="flex gap-2">
                                    {["Visa", "Mastercard", "Amex", "PayPal"].map((method) => (
                                        <div
                                            key={method}
                                            className="px-2 py-1 bg-background rounded text-xs font-medium"
                                        >
                                            {method}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
