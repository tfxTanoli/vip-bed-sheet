import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FileText, Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export default function LegalPage({ defaultTab = "terms" }) {
    const [activeTab, setActiveTab] = useState(defaultTab);

    useEffect(() => {
        setActiveTab(defaultTab);
        window.scrollTo(0, 0);
    }, [defaultTab]);

    return (
        <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Link to="/signup" className="inline-flex items-center text-muted-foreground hover:text-primary mb-2 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Back to Sign Up
                        </Link>
                        <h1 className="text-3xl font-heading font-bold">
                            Legal <span className="gradient-text">Information</span>
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Transparency and trust are our top priorities.
                        </p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex p-1 bg-secondary/50 rounded-lg">
                        <button
                            onClick={() => setActiveTab("terms")}
                            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "terms"
                                ? "bg-background shadow-sm text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <FileText className="w-4 h-4 mr-2" />
                            Terms of Service
                        </button>
                        <button
                            onClick={() => setActiveTab("privacy")}
                            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "privacy"
                                ? "bg-background shadow-sm text-foreground"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <Shield className="w-4 h-4 mr-2" />
                            Privacy Policy
                        </button>
                    </div>
                </div>

                <Card className="p-8 md:p-12 min-h-[600px]">
                    {activeTab === "terms" ? (
                        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 animate-fade-in">
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
                                <p className="text-sm text-muted-foreground mb-6">Last updated: December 8, 2025</p>
                            </div>

                            <section>
                                <h3 className="text-xl font-semibold mb-3">1. Agreement to Terms</h3>
                                <p>
                                    By accessing or using DreamWeave's website and services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold mb-3">2. Purchases and Payment</h3>
                                <p>
                                    When you purchase products from us, you agree to provide current, complete, and accurate purchase and account information. We reserve the right to refuse any order you place with us.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold mb-3">3. Returns and Refunds</h3>
                                <p>
                                    We offer a 100-night trial for all our bed sheets. If you are not completely satisfied, you may return the product for a full refund within 100 days of delivery. Products must be returned in their original condition.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold mb-3">4. Intellectual Property</h3>
                                <p>
                                    The service and its original content, features, and functionality are and will remain the exclusive property of DreamWeave and its licensors.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold mb-3">5. User Accounts</h3>
                                <p>
                                    When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold mb-3">6. Prohibited Activities</h3>
                                <p>
                                    You may not use the Service for any illegal or unauthorized purpose. You agree not to distribute viruses, spam, or any other harmful code. We reserve the right to terminate your use of the Service for violating any of the prohibited uses.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold mb-3">7. Governing Law</h3>
                                <p>
                                    These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold mb-3">8. Limitation of Liability</h3>
                                <p>
                                    In no event shall DreamWeave, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.
                                </p>
                            </section>
                        </div>
                    ) : (
                        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 animate-fade-in">
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
                                <p className="text-sm text-muted-foreground mb-6">Last updated: December 8, 2025</p>
                            </div>

                            <section>
                                <h3 className="text-xl font-semibold mb-3">1. Information We Collect</h3>
                                <p>
                                    We collect information you provide directly to us, such as when you create or modify your account, request customer support, or make a purchase. This information may include your name, email address, shipping address, and payment information.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold mb-3">2. How We Use Your Information</h3>
                                <p>
                                    We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to send you related information, including confirmations and invoices.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold mb-3">3. Data Security</h3>
                                <p>
                                    We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. We use industry-standard encryption technologies when transferring and receiving consumer data exchanged with our site.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold mb-3">4. Cookies</h3>
                                <p>
                                    We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold mb-3">5. Third-Party Disclosure</h3>
                                <p>
                                    We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold mb-3">6. Children's Privacy</h3>
                                <p>
                                    Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with Personal Information, please contact us.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold mb-3">7. Your Data Rights</h3>
                                <p>
                                    You have the right to access, update, or delete the information we have on you. Whenever made possible, you can access, update or request deletion of your Personal Information directly within your account settings section. If you are unable to perform these actions yourself, please contact us to assist you.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xl font-semibold mb-3">8. Contact Us</h3>
                                <p>
                                    If you have any questions about this Privacy Policy, please contact us at support@dreamweave.com.
                                </p>
                            </section>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
