import { Link } from "react-router-dom";
import { Bed, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-secondary/50 border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                                <Bed className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-heading font-bold gradient-text">
                                DreamWeave
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Premium bedding for the dreamers. Experience luxury sleep with our
                            handcrafted sheets made from the world's finest materials.
                        </p>
                        <div className="flex space-x-3">
                            {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            {["Shop All", "New Arrivals", "Best Sellers", "Sale", "Gift Cards"].map(
                                (link) => (
                                    <li key={link}>
                                        <Link
                                            to="/shop"
                                            className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="font-heading font-semibold text-lg mb-4">
                            Customer Service
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { name: "Contact Us", path: "/contact" },
                                { name: "FAQs", path: "/faq" },
                                { name: "Shipping Info", path: "/shipping" },
                                { name: "Returns & Exchanges", path: "/returns" },
                                { name: "Size Guide", path: "/size-guide" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-heading font-semibold text-lg mb-4">
                            Stay Connected
                        </h4>
                        <p className="text-muted-foreground text-sm mb-4">
                            Subscribe for exclusive offers and sleep tips.
                        </p>
                        <div className="flex space-x-2">
                            <Input
                                type="email"
                                placeholder="Your email"
                                className="flex-1"
                            />
                            <Button size="sm">Join</Button>
                        </div>
                        <div className="mt-6 space-y-2">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Phone className="w-4 h-4" />
                                <span>1-800-DREAM-UP</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Mail className="w-4 h-4" />
                                <span>hello@dreamweave.com</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                <span>New York, NY</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-border">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-muted-foreground">
                            © {currentYear} DreamWeave. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                                Privacy Policy
                            </Link>
                            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                                Terms of Service
                            </Link>
                            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
