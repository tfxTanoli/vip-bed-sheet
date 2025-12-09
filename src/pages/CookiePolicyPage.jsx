import React from 'react';
import { Shield, Cookie, Settings, Info } from 'lucide-react';
import { Card } from "../components/ui/Card";

export default function CookiePolicyPage() {
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4 mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold">
                        Cookie <span className="gradient-text">Policy</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We use cookies to improve your experience and make our service work better for you.
                    </p>
                </div>

                {/* Introduction Date */}
                <div className="text-sm text-muted-foreground text-center mb-8">
                    Last Updated: December 9, 2025
                </div>

                {/* Content Sections */}
                <Card className="p-8 space-y-8 shadow-lg border-none bg-card/50 backdrop-blur-sm">

                    {/* What are cookies */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                            <Info className="w-6 h-6" />
                            <h2 className="text-2xl font-heading font-semibold">What Are Cookies?</h2>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            Cookies are small text files that are placed on your computer or mobile device when you visit a website.
                            They are widely used to make websites work more efficiently and to provide information to the owners of the site.
                            Cookies allow us to recognize your device and store information about your preferences or past actions.
                        </p>
                    </section>

                    <div className="h-px bg-border/50" />

                    {/* How we use cookies */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                            <Cookie className="w-6 h-6" />
                            <h2 className="text-2xl font-heading font-semibold">How We Use Cookies</h2>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            We use cookies for several reasons, including:
                        </p>
                        <ul className="grid gap-4 mt-4">
                            <li className="flex gap-4 p-4 rounded-lg bg-secondary/30">
                                <Shield className="w-6 h-6 text-primary shrink-0" />
                                <div>
                                    <h3 className="font-semibold mb-1">Essential Cookies</h3>
                                    <p className="text-sm text-muted-foreground">
                                        These are necessary for the website to function properly. They enable core functionality such as
                                        security, network management, and accessibility. You may disable these by changing your browser settings,
                                        but this may affect how the website functions.
                                    </p>
                                </div>
                            </li>
                            <li className="flex gap-4 p-4 rounded-lg bg-secondary/30">
                                <Settings className="w-6 h-6 text-primary shrink-0" />
                                <div>
                                    <h3 className="font-semibold mb-1">Functional Cookies</h3>
                                    <p className="text-sm text-muted-foreground">
                                        These cookies enable the website to provide enhanced functionality and personalization.
                                        They may be set by us or by third-party providers whose services we have added to our pages.
                                    </p>
                                </div>
                            </li>
                            <li className="flex gap-4 p-4 rounded-lg bg-secondary/30">
                                <Info className="w-6 h-6 text-primary shrink-0" />
                                <div>
                                    <h3 className="font-semibold mb-1">Analytics Cookies</h3>
                                    <p className="text-sm text-muted-foreground">
                                        We use these cookies to understand how visitors interact with our website, helping us improve
                                        our services. These cookies collect information anonymously.
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </section>

                    <div className="h-px bg-border/50" />

                    {/* Managing Cookies */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                            <Settings className="w-6 h-6" />
                            <h2 className="text-2xl font-heading font-semibold">Managing Your Cookie Preferences</h2>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            Most web browsers allow you to control cookies through their settings preferences. However, if you limit the
                            ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be
                            personalized to you.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            To find out more about cookies, including how to see what cookies have been set and how to manage and delete them,
                            visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.allaboutcookies.org</a>.
                        </p>
                    </section>

                    <div className="h-px bg-border/50" />

                    {/* Changes to Policy */}
                    <section className="space-y-4">
                        <h2 className="text-2xl font-heading font-semibold">Changes to This Policy</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new
                            Cookie Policy on this page. You are advised to review this Cookie Policy periodically for any changes.
                        </p>
                    </section>
                </Card>
            </div>
        </div>
    );
}
