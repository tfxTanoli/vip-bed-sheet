import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Award, Leaf, Moon, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import ProductCard from "../components/ProductCard";
import { db } from "../../firebase";
import { testimonials, features } from "../data/products";

const iconMap = {
    Sparkles: Sparkles,
    Award: Award,
    Leaf: Leaf,
    Moon: Moon,
};

export default function HomePage() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productsRef = db.ref('products');
        productsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convert object to array if needed, but our seed data is an array
                const productsList = Array.isArray(data) ? data : Object.values(data);
                setProducts(productsList);
            }
        });

        // Cleanup subscription
        return () => productsRef.off();
    }, []);

    const featuredProducts = products.slice(0, 4);

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden hero-gradient">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in-up">
                                <Sparkles className="w-4 h-4" />
                                Premium Bedding Collection
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight animate-fade-in-up delay-100">
                                Sleep in{" "}
                                <span className="gradient-text">Luxury</span>
                                <br />
                                Every Night
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-lg animate-fade-in-up delay-200 leading-relaxed">
                                Transform your bedroom into a sanctuary with our handcrafted,
                                sustainably-made bedding. Experience the difference that premium
                                materials make.
                            </p>
                            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
                                <Link to="/shop">
                                    <Button size="lg" className="group text-lg h-14 px-8">
                                        Shop Collection
                                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                                <Link to="/about">
                                    <Button variant="outline" size="lg" className="text-lg h-14 px-8">
                                        Our Story
                                    </Button>
                                </Link>
                            </div>
                            <div className="flex items-center gap-8 pt-8 animate-fade-in-up delay-400">
                                <div>
                                    <p className="text-3xl font-bold text-primary">50K+</p>
                                    <p className="text-sm text-muted-foreground">Happy Sleepers</p>
                                </div>
                                <div className="w-px h-12 bg-border" />
                                <div>
                                    <p className="text-3xl font-bold text-primary">100%</p>
                                    <p className="text-sm text-muted-foreground">Organic Materials</p>
                                </div>
                                <div className="w-px h-12 bg-border" />
                                <div>
                                    <p className="text-3xl font-bold text-primary">4.9★</p>
                                    <p className="text-sm text-muted-foreground">Average Rating</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative hidden lg:block animate-scale-in delay-200">
                            <div className="relative z-10 animate-float">
                                <img
                                    src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80"
                                    alt="Luxury Bedroom"
                                    className="rounded-3xl shadow-2xl border-4 border-white/20 dark:border-gray-800/20"
                                />
                                {/* Floating Badge */}
                                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-float delay-500">
                                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                        <Leaf className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Eco-Friendly</p>
                                        <p className="text-xs text-muted-foreground">100% Sustainable</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -top-12 -right-12 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 md:py-32 bg-secondary/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {features.map((feature, index) => {
                            const Icon = iconMap[feature.icon];
                            return (
                                <Card
                                    key={index}
                                    className="p-8 text-center hover-lift glass-card border-none bg-background/60"
                                >
                                    <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-7 h-7 text-primary" />
                                    </div>
                                    <h3 className="font-heading font-semibold text-lg mb-3">{feature.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20 md:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-heading font-bold">
                            Featured <span className="gradient-text">Collection</span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Discover our most loved bed sheets, chosen by thousands of satisfied customers
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product, index) => (
                            <div key={product.id} className={`animate-fade-in-up`} style={{ animationDelay: `${index * 100}ms` }}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-16">
                        <Link to="/shop">
                            <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                                View All Products
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 md:py-32 bg-secondary/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                            What Our <span className="gradient-text">Customers Say</span>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Don't just take our word for it
                        </p>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <Card className="p-10 md:p-14 text-center glass-card border-none relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div>
                            <div className="flex justify-center mb-8">
                                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                            <p className="text-xl md:text-2xl text-foreground/90 mb-10 italic font-heading leading-relaxed">
                                "{testimonials[currentTestimonial].content}"
                            </p>
                            <div className="flex items-center justify-center gap-6">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-md opacity-50"></div>
                                    <img
                                        src={testimonials[currentTestimonial].image}
                                        alt={testimonials[currentTestimonial].name}
                                        className="w-16 h-16 rounded-full object-cover relative z-10 border-2 border-background"
                                    />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-lg">{testimonials[currentTestimonial].name}</p>
                                    <p className="text-sm text-primary font-medium">
                                        {testimonials[currentTestimonial].role}
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <div className="flex justify-center gap-6 mt-10">
                            <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full w-12 h-12 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                                <ChevronLeft className="w-6 h-6" />
                            </Button>
                            <div className="flex items-center gap-3">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentTestimonial(index)}
                                        className={`h-2 rounded-full transition-all duration-300 ${index === currentTestimonial
                                            ? "bg-primary w-8"
                                            : "bg-muted-foreground/30 w-2 hover:bg-primary/50"
                                            }`}
                                    />
                                ))}
                            </div>
                            <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full w-12 h-12 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                                <ChevronRight className="w-6 h-6" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 md:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Card className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white p-12 md:p-24 text-center rounded-3xl shadow-2xl">
                        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                                Ready for the Best Sleep of Your Life?
                            </h2>
                            <p className="text-xl opacity-90 leading-relaxed">
                                Join thousands of happy sleepers and experience the DreamWeave difference.
                                100-night risk-free trial included.
                            </p>
                            <Link to="/shop">
                                <Button
                                    size="lg"
                                    className="bg-white text-purple-600 hover:bg-white/90 text-lg h-14 px-10 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                                >
                                    Shop Now
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
                    </Card>
                </div>
            </section>
        </div>
    );
}
