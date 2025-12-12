import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductsContext";

const categories = ["All", "Premium", "Eco-Friendly", "Classic", "Value", "Casual"];
const priceRanges = [
    { label: "All Prices", min: 0, max: Infinity },
    { label: "Under Rs 3,000", min: 0, max: 3000 },
    { label: "Rs 3,000 - Rs 6,000", min: 3000, max: 6000 },
    { label: "Rs 6,000 - Rs 9,000", min: 6000, max: 9000 },
    { label: "Over Rs 9,000", min: 9000, max: Infinity },
];

export default function ShopPage() {
    const { products, loading } = useProducts();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
    const [showFilters, setShowFilters] = useState(false);

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        const matchesPrice = product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max;
        return matchesSearch && matchesCategory && matchesPrice;
    });

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedCategory("All");
        setSelectedPriceRange(priceRanges[0]);
    };

    const hasActiveFilters = searchQuery || selectedCategory !== "All" || selectedPriceRange !== priceRanges[0];

    return (
        <div className="min-h-screen py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                        Shop Our <span className="gradient-text">Collection</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discover the perfect sheets for your dream bedroom. Filter by category, price, or search for specific products.
                    </p>
                </div>

                {/* Search and Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12"
                        />
                    </div>
                    <Button
                        variant="outline"
                        className="md:hidden"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                    </Button>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar Filters - Desktop */}
                    <Card className={`w-64 p-6 h-fit space-y-6 hidden md:block sticky top-24`}>
                        <div className="flex items-center justify-between">
                            <h3 className="font-heading font-semibold">Filters</h3>
                            {hasActiveFilters && (
                                <Button variant="ghost" size="sm" onClick={clearFilters}>
                                    Clear all
                                </Button>
                            )}
                        </div>

                        {/* Categories */}
                        <div>
                            <h4 className="font-medium mb-3">Category</h4>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === category
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-muted"
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <h4 className="font-medium mb-3">Price Range</h4>
                            <div className="space-y-2">
                                {priceRanges.map((range) => (
                                    <button
                                        key={range.label}
                                        onClick={() => setSelectedPriceRange(range)}
                                        className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedPriceRange === range
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-muted"
                                            }`}
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Mobile Filters */}
                    {showFilters && (
                        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm md:hidden animate-fade-in">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-heading font-semibold text-lg">Filters</h3>
                                    <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>

                                {/* Categories */}
                                <div className="mb-6">
                                    <h4 className="font-medium mb-3">Category</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((category) => (
                                            <button
                                                key={category}
                                                onClick={() => setSelectedCategory(category)}
                                                className={`px-4 py-2 rounded-full text-sm transition-colors ${selectedCategory === category
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-muted hover:bg-muted/80"
                                                    }`}
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div className="mb-6">
                                    <h4 className="font-medium mb-3">Price Range</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {priceRanges.map((range) => (
                                            <button
                                                key={range.label}
                                                onClick={() => setSelectedPriceRange(range)}
                                                className={`px-4 py-2 rounded-full text-sm transition-colors ${selectedPriceRange === range
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-muted hover:bg-muted/80"
                                                    }`}
                                            >
                                                {range.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button variant="outline" className="flex-1" onClick={clearFilters}>
                                        Clear All
                                    </Button>
                                    <Button className="flex-1" onClick={() => setShowFilters(false)}>
                                        Apply Filters
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Products Grid */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-muted-foreground">
                                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                            </p>
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <Card className="p-12 text-center">
                                <p className="text-lg text-muted-foreground mb-4">
                                    No products found matching your criteria.
                                </p>
                                <Button variant="outline" onClick={clearFilters}>
                                    Clear Filters
                                </Button>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
