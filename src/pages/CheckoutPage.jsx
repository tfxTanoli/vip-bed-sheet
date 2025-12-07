import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, CreditCard, Truck, Check, Lock, ShieldCheck } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/utils";

export default function CheckoutPage() {
    const navigate = useNavigate();
    const { items, getCartTotal, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "United States",
        phone: "",
        cardNumber: "",
        cardName: "",
        expiry: "",
        cvv: "",
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const subtotal = getCartTotal();
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step < 2) {
            setStep(step + 1);
            return;
        }

        setIsProcessing(true);
        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsProcessing(false);
        setOrderComplete(true);
        clearCart();
    };

    if (items.length === 0 && !orderComplete) {
        navigate("/cart");
        return null;
    }

    if (orderComplete) {
        return (
            <div className="min-h-screen py-16 md:py-24">
                <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
                    <Card className="p-8 md:p-12 text-center">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
                            <Check className="w-10 h-10 text-green-500" />
                        </div>
                        <h1 className="text-3xl font-heading font-bold mb-4">Order Confirmed!</h1>
                        <p className="text-muted-foreground mb-6">
                            Thank you for your purchase. We've sent a confirmation email with your order details.
                        </p>
                        <div className="bg-secondary/50 rounded-lg p-4 mb-8">
                            <p className="text-sm text-muted-foreground">Order Number</p>
                            <p className="font-mono font-bold text-lg">#DW-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/shop" className="flex-1">
                                <Button variant="outline" className="w-full">Continue Shopping</Button>
                            </Link>
                            <Link to="/" className="flex-1">
                                <Button className="w-full">Back to Home</Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link
                    to="/cart"
                    className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Cart
                </Link>

                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-12">
                    <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                            1
                        </div>
                        <span className="mx-2 font-medium hidden sm:block">Shipping</span>
                    </div>
                    <div className={`w-12 h-0.5 mx-2 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
                    <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                            2
                        </div>
                        <span className="mx-2 font-medium hidden sm:block">Payment</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit}>
                            {/* Shipping Information */}
                            {step === 1 && (
                                <Card className="p-6 md:p-8 animate-fade-in">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Truck className="w-6 h-6 text-primary" />
                                        <h2 className="text-xl font-heading font-semibold">Shipping Information</h2>
                                    </div>

                                    <div className="grid gap-6">
                                        <div>
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="you@example.com"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1.5"
                                            />
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="firstName">First Name</Label>
                                                <Input
                                                    id="firstName"
                                                    name="firstName"
                                                    placeholder="John"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="mt-1.5"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="lastName">Last Name</Label>
                                                <Input
                                                    id="lastName"
                                                    name="lastName"
                                                    placeholder="Doe"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="mt-1.5"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="address">Street Address</Label>
                                            <Input
                                                id="address"
                                                name="address"
                                                placeholder="123 Main Street"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1.5"
                                            />
                                        </div>

                                        <div className="grid sm:grid-cols-3 gap-4">
                                            <div>
                                                <Label htmlFor="city">City</Label>
                                                <Input
                                                    id="city"
                                                    name="city"
                                                    placeholder="New York"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="mt-1.5"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="state">State</Label>
                                                <Input
                                                    id="state"
                                                    name="state"
                                                    placeholder="NY"
                                                    value={formData.state}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="mt-1.5"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="zipCode">ZIP Code</Label>
                                                <Input
                                                    id="zipCode"
                                                    name="zipCode"
                                                    placeholder="10001"
                                                    value={formData.zipCode}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="mt-1.5"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                placeholder="(555) 123-4567"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1.5"
                                            />
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full mt-8" size="lg">
                                        Continue to Payment
                                    </Button>
                                </Card>
                            )}

                            {/* Payment Information */}
                            {step === 2 && (
                                <Card className="p-6 md:p-8 animate-fade-in">
                                    <div className="flex items-center gap-3 mb-6">
                                        <CreditCard className="w-6 h-6 text-primary" />
                                        <h2 className="text-xl font-heading font-semibold">Payment Information</h2>
                                    </div>

                                    <div className="grid gap-6">
                                        <div>
                                            <Label htmlFor="cardNumber">Card Number</Label>
                                            <Input
                                                id="cardNumber"
                                                name="cardNumber"
                                                placeholder="4242 4242 4242 4242"
                                                value={formData.cardNumber}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1.5"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="cardName">Name on Card</Label>
                                            <Input
                                                id="cardName"
                                                name="cardName"
                                                placeholder="John Doe"
                                                value={formData.cardName}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-1.5"
                                            />
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="expiry">Expiry Date</Label>
                                                <Input
                                                    id="expiry"
                                                    name="expiry"
                                                    placeholder="MM/YY"
                                                    value={formData.expiry}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="mt-1.5"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="cvv">CVV</Label>
                                                <Input
                                                    id="cvv"
                                                    name="cvv"
                                                    placeholder="123"
                                                    value={formData.cvv}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="mt-1.5"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
                                        <Lock className="w-4 h-4" />
                                        <span>Your payment information is encrypted and secure</span>
                                    </div>

                                    <div className="flex gap-4 mt-8">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setStep(1)}
                                            className="flex-1"
                                            size="lg"
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="flex-1"
                                            size="lg"
                                            disabled={isProcessing}
                                        >
                                            {isProcessing ? (
                                                <span className="flex items-center">
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing...
                                                </span>
                                            ) : (
                                                <>
                                                    Place Order • {formatPrice(total)}
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </Card>
                            )}
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <Card className="p-6 sticky top-24">
                            <h2 className="font-heading font-semibold text-xl mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                {items.map((item) => (
                                    <div key={`${item.id}-${item.size}`} className="flex gap-4">
                                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">{item.size} × {item.quantity}</p>
                                            <p className="text-sm font-semibold text-primary">
                                                {formatPrice(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Tax</span>
                                    <span>{formatPrice(tax)}</span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span className="text-primary">{formatPrice(total)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-green-500/10 rounded-lg flex items-start gap-3">
                                <ShieldCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium text-sm">100-Night Trial</p>
                                    <p className="text-xs text-muted-foreground">
                                        Not in love? Return it for a full refund.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
