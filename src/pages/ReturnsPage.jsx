import { ArrowLeft, RefreshCw, Truck, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export default function ReturnsPage() {
    return (
        <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
                {/* Header */}
                <div>
                    <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-primary mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Home
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                        Returns & <span className="gradient-text">Exchanges</span>
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        We want you to sleep soundly. That's why we offer a hassle-free 100-night trial.
                    </p>
                </div>

                {/* Key Features Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <Clock className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold text-lg">100-Night Trial</h3>
                        <p className="text-sm text-muted-foreground">
                            Try our sheets in the comfort of your own home. Not in love? Return them for a full refund.
                        </p>
                    </Card>
                    <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <Truck className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold text-lg">Free Returns</h3>
                        <p className="text-sm text-muted-foreground">
                            We cover the return shipping cost for all orders within the contiguous United States.
                        </p>
                    </Card>
                    <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <RefreshCw className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold text-lg">Easy Exchanges</h3>
                        <p className="text-sm text-muted-foreground">
                            Need a different size or color? Exchanges are fast, free, and simple.
                        </p>
                    </Card>
                </div>

                {/* Content Section */}
                <Card className="p-8 md:p-12 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <RefreshCw className="w-6 h-6 text-primary" />
                            Return Policy
                        </h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-muted-foreground">
                            <p>
                                At VIP Bed Sheets, we believe you should be completely satisfied with your bedding. If you aren't 100% happy with your purchase, you can return it for a full refund within 100 days of the delivery date.
                            </p>
                            <p>
                                Returns will be refunded in the original method of payment. You must postmark your items for return within 100 days of delivery receipt to be eligible for a refund.
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Items must be in their original condition (washed items are accepted if within the trial period).</li>
                                <li>Original packaging is preferred but not required.</li>
                                <li>Proof of purchase (order number) is required.</li>
                            </ul>
                        </div>
                    </section>

                    <hr className="border-border" />

                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <RefreshCw className="w-6 h-6 text-primary" />
                            Exchange Policy
                        </h2>
                        <div className="prose prose-slate dark:prose-invert max-w-none space-y-4 text-muted-foreground">
                            <p>
                                We are happy to help you exchange your items for a different size, color, or style within the 100-night trial period. Exchanges are free of charge, including shipping both ways.
                            </p>
                            <p>
                                To initiate an exchange:
                            </p>
                            <ol className="list-decimal pl-5 space-y-2">
                                <li>Contact our support team at <span className="font-medium text-foreground">support@vipbedsheets.com</span> or via our Contact Page.</li>
                                <li>Provide your Order ID and detail the items you wish to exchange.</li>
                                <li>We will send you a prepaid shipping label.</li>
                                <li>Once we receive your return, we’ll ship out your new items immediately!</li>
                            </ol>
                        </div>
                    </section>

                    <hr className="border-border" />

                    <section>
                        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-foreground">Do I have to pay for return shipping?</h3>
                                <p className="text-muted-foreground mt-1">No, return shipping is completely free for all domestic orders.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">How long does it take to get a refund?</h3>
                                <p className="text-muted-foreground mt-1">Once we receive your return, please allow 5-7 business days for the refund to appear on your original payment method.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Can I return washed sheets?</h3>
                                <p className="text-muted-foreground mt-1">Yes! We want you to really try them out. You can wash, sleep, and live in them. If you're not happy, wash them one last time and send them back.</p>
                            </div>
                        </div>
                    </section>
                </Card>

                <div className="text-center">
                    <p className="text-muted-foreground mb-4">Still have questions?</p>
                    <Link to="/contact">
                        <Button variant="outline" size="lg">Contact Support</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
