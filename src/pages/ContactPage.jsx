import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export default function ContactPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            alert("Message sent successfully!");
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 animate-fade-in-up">
                        Get in <span className="gradient-text">Touch</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up delay-100">
                        We'd love to hear from you. Whether you have a question about our products,
                        need help with an order, or just want to say hello.
                    </p>
                </div>
            </section>

            {/* Content Grid */}
            <section className="pb-20 md:pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">

                        {/* Contact Info Column */}
                        <div className="space-y-8 animate-fade-in-up delay-200">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <Card className="p-6 glass-card hover-lift">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-heading font-semibold text-lg mb-2">Email Us</h3>
                                    <p className="text-muted-foreground text-sm mb-4">
                                        Our friendly team is here to help.
                                    </p>
                                    <a href="mailto:hello@dreamweave.com" className="text-primary font-medium hover:underline">
                                        hello@dreamweave.com
                                    </a>
                                </Card>

                                <Card className="p-6 glass-card hover-lift">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-heading font-semibold text-lg mb-2">Call Us</h3>
                                    <p className="text-muted-foreground text-sm mb-4">
                                        Mon-Fri from 8am to 5pm.
                                    </p>
                                    <a href="tel:+15550000000" className="text-primary font-medium hover:underline">
                                        +1 (555) 000-0000
                                    </a>
                                </Card>

                                <Card className="p-6 glass-card hover-lift">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-heading font-semibold text-lg mb-2">Visit Us</h3>
                                    <p className="text-muted-foreground text-sm mb-4">
                                        Come say hello at our office HQ.
                                    </p>
                                    <p className="text-primary font-medium">
                                        123 Bedding Lane<br />
                                        Sleepy Hollow, NY 10591
                                    </p>
                                </Card>

                                <Card className="p-6 glass-card hover-lift">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                        <MessageSquare className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-heading font-semibold text-lg mb-2">Live Chat</h3>
                                    <p className="text-muted-foreground text-sm mb-4">
                                        Chat with our support team.
                                    </p>
                                    <button className="text-primary font-medium hover:underline">
                                        Start a conversation
                                    </button>
                                </Card>
                            </div>

                            {/* FAQ Teaser */}
                            <div className="p-8 rounded-2xl bg-secondary/30 border border-border">
                                <h3 className="font-heading font-semibold text-xl mb-4 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-primary" />
                                    Frequently Asked Questions
                                </h3>
                                <p className="text-muted-foreground mb-6">
                                    Find quick answers to common questions about shipping, returns, and product care in our help center.
                                </p>
                                <Button variant="outline" className="w-full sm:w-auto">
                                    Visit Help Center
                                </Button>
                            </div>
                        </div>

                        {/* Contact Form Column */}
                        <div className="animate-fade-in-up delay-300">
                            <Card className="p-8 md:p-10 glass-card border-primary/10 shadow-xl">
                                <h2 className="text-2xl font-heading font-bold mb-6">Send us a message</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">First Name</label>
                                            <input
                                                type="text"
                                                placeholder="John"
                                                className="input-field"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Last Name</label>
                                            <input
                                                type="text"
                                                placeholder="Doe"
                                                className="input-field"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Email</label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className="input-field"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Subject</label>
                                        <select className="input-field appearance-none" required>
                                            <option value="">Select a topic</option>
                                            <option value="order">Order Inquiry</option>
                                            <option value="product">Product Question</option>
                                            <option value="return">Returns & Exchanges</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Message</label>
                                        <textarea
                                            placeholder="How can we help you?"
                                            className="input-field min-h-[150px] resize-y"
                                            required
                                        ></textarea>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full btn-primary h-12 text-lg group"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <span className="animate-pulse">Sending...</span>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
