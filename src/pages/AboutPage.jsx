import { Heart, Users, Globe, Award, Leaf, ArrowRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

const values = [
    {
        icon: Heart,
        title: "Passion for Quality",
        description: "We obsess over every thread, weave, and finish to ensure you receive nothing but the best."
    },
    {
        icon: Leaf,
        title: "Sustainability First",
        description: "From organic materials to eco-friendly packaging, we're committed to protecting our planet."
    },
    {
        icon: Users,
        title: "Customer Focused",
        description: "Your comfort is our mission. We listen, adapt, and continuously improve based on your feedback."
    },
    {
        icon: Globe,
        title: "Global Craftsmanship",
        description: "We partner with artisans worldwide to bring you the finest materials and techniques."
    },
];

const milestones = [
    { year: "2018", title: "Founded", description: "Started with a simple mission: better sleep for everyone." },
    { year: "2019", title: "First Collection", description: "Launched our signature Egyptian Cotton line." },
    { year: "2020", title: "Eco Initiative", description: "Introduced organic bamboo and sustainable practices." },
    { year: "2021", title: "50K Customers", description: "Reached our first major milestone of happy sleepers." },
    { year: "2022", title: "B-Corp Certified", description: "Recognized for our social and environmental impact." },
    { year: "2023", title: "Global Expansion", description: "Now shipping to over 30 countries worldwide." },
];

const team = [
    {
        name: "Alexandra Chen",
        role: "Founder & CEO",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80",
        quote: "Great sleep shouldn't be a luxury—it should be accessible to everyone."
    },
    {
        name: "Marcus Johnson",
        role: "Head of Product",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
        quote: "Every detail matters when it comes to creating the perfect sheet."
    },
    {
        name: "Sofia Rodriguez",
        role: "Sustainability Director",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
        quote: "We're proving that eco-friendly can also mean ultra-luxurious."
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden hero-gradient">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                            Our <span className="gradient-text">Story</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            Born from a simple belief that everyone deserves a great night's sleep,
                            DreamWeave has grown from a small startup to a global movement.
                            We're on a mission to transform bedrooms around the world, one luxurious
                            sheet set at a time.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1616627561839-074385245ff6?w=800&q=80"
                                alt="Luxury bedroom"
                                className="rounded-2xl shadow-2xl"
                            />
                        </div>
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                <Award className="w-4 h-4" />
                                Our Mission
                            </div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold">
                                Crafting the Perfect Night's Sleep
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                At VIP Bed Sheets, we believe that quality sleep is the foundation of a
                                fulfilling life. That's why we've dedicated ourselves to creating
                                bedding that doesn't just look beautiful—it transforms your sleep
                                experience entirely.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Every sheet we create is the result of countless hours of research,
                                testing, and refinement. We source only the finest materials from
                                trusted suppliers around the world, and our artisans bring decades
                                of expertise to every stitch.
                            </p>
                            <div className="flex flex-wrap gap-6 pt-4">
                                <div>
                                    <p className="text-3xl font-bold text-primary">500K+</p>
                                    <p className="text-sm text-muted-foreground">Sheets Sold</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-primary">30+</p>
                                    <p className="text-sm text-muted-foreground">Countries</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-primary">4.9★</p>
                                    <p className="text-sm text-muted-foreground">Avg Rating</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 md:py-24 bg-secondary/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                            What We <span className="gradient-text">Stand For</span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Our core values guide everything we do, from product design to customer service.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <Card key={index} className="p-6 text-center hover-lift">
                                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                                    <value.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="font-heading font-semibold text-lg mb-2">{value.title}</h3>
                                <p className="text-sm text-muted-foreground">{value.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                            Our <span className="gradient-text">Journey</span>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            From humble beginnings to global impact.
                        </p>
                    </div>
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-border hidden md:block" />

                        <div className="space-y-8 md:space-y-12">
                            {milestones.map((milestone, index) => (
                                <div
                                    key={index}
                                    className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                        }`}
                                >
                                    <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                                        <Card className="p-6 inline-block">
                                            <span className="text-primary font-bold text-lg">{milestone.year}</span>
                                            <h3 className="font-heading font-semibold text-xl mt-1 mb-2">{milestone.title}</h3>
                                            <p className="text-muted-foreground text-sm">{milestone.description}</p>
                                        </Card>
                                    </div>
                                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full hidden md:block" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 md:py-24 bg-secondary/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                            Meet the <span className="gradient-text">Team</span>
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            The passionate people behind VIP Bed Sheets.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <Card key={index} className="p-6 text-center hover-lift overflow-hidden group">
                                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="font-heading font-semibold text-xl">{member.name}</h3>
                                <p className="text-primary text-sm mb-4">{member.role}</p>
                                <div className="relative">
                                    <Quote className="w-6 h-6 text-primary/30 absolute -top-2 -left-2" />
                                    <p className="text-muted-foreground text-sm italic pl-4">
                                        "{member.quote}"
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Card className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 md:p-16">
                        <div className="relative z-10 text-center max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                                Ready to Experience the Difference?
                            </h2>
                            <p className="text-lg opacity-90 mb-8">
                                Join the VIP Bed Sheets family and discover why over 50,000 customers
                                trust us for their best night's sleep.
                            </p>
                            <Link to="/shop">
                                <Button
                                    size="lg"
                                    className="bg-white text-purple-600 hover:bg-white/90"
                                >
                                    Shop Now
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    </Card>
                </div>
            </section>
        </div>
    );
}
