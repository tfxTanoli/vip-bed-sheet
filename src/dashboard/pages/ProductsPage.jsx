import { useState } from "react";
import { Plus, Search, Edit, Trash2, Filter, X, Upload } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";
import { useProducts } from "../../context/ProductsContext";
import { formatPrice } from "../../lib/utils";

export default function ProductsPage() {
    const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "Classic",
        description: "",
        image: ""
    });
    const [imageFiles, setImageFiles] = useState([]); // Changed from single file
    const [isSubmitting, setIsSubmitting] = useState(false);

    const AVAILABLE_COLORS = [
        "White", "Ivory", "Gray", "Light Gray", "Navy",
        "Blue", "Ocean Blue", "Teal", "Sage Green",
        "Blush Pink", "Beige", "Natural", "Silver", "Charcoal"
    ];

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                price: product.price,
                category: product.category,
                description: product.description || "",
                image: product.image,
                images: product.images || [], // Load existing images
                colors: product.colors || [] // Load existing colors
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: "",
                price: "",
                category: "Classic",
                description: "",
                image: "",
                images: [],
                colors: []
            });
        }
        setIsModalOpen(true);
        setImageFiles([]);
    };

    const handleColorChange = (color) => {
        setFormData(prev => {
            if (prev.colors.includes(color)) {
                return { ...prev, colors: prev.colors.filter(c => c !== color) };
            } else {
                return { ...prev, colors: [...prev.colors, color] };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Convert FileList to Array
            const filesArray = Array.from(imageFiles || []);

            if (editingProduct) {
                await updateProduct(editingProduct.id, {
                    ...formData,
                    price: Number(formData.price)
                }, filesArray);
            } else {
                await addProduct({
                    ...formData,
                    price: Number(formData.price)
                }, filesArray);
            }
            setIsModalOpen(false);
            setEditingProduct(null);
            setIsModalOpen(false);
            setEditingProduct(null);
            setFormData({ name: "", price: "", category: "Classic", description: "", image: "", images: [], colors: [] });
            setImageFiles([]);
        } catch (error) {
            console.error(error);
            alert("Failed to save product");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id);
            } catch (error) {
                console.error(error);
                alert("Failed to delete product");
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* ... (Header and Search preserved) ... */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-heading">Products</h1>
                    <p className="text-muted-foreground">Manage your product catalog</p>
                </div>
                <Button onClick={() => handleOpenModal()}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                </Button>
            </div>

            <Card className="p-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search products..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3 rounded-l-lg">Product</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Stock</th>
                                <th className="px-4 py-3 rounded-r-lg text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {loading ? (
                                <tr><td colSpan="5" className="px-4 py-8 text-center text-muted-foreground">Loading products...</td></tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr><td colSpan="5" className="px-4 py-8 text-center text-muted-foreground">No products found.</td></tr>
                            ) : (
                                filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted">
                                                    <img src={product.image || (product.images && product.images[0])} alt={product.name} className="w-full h-full object-cover" />
                                                </div>
                                                <span className="font-medium">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">{product.category}</td>
                                        <td className="px-4 py-3 font-medium">{formatPrice(product.price)}</td>
                                        <td className="px-4 py-3">
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                In Stock
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleOpenModal(product)}
                                                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(product.id)}
                                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Add/Edit Product Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in p-4 overflow-y-auto">
                    <Card className="w-full max-w-lg p-6 my-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold font-heading">
                                {editingProduct ? "Edit Product" : "Add New Product"}
                            </h2>
                            <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block">Product Name</label>
                                <Input
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Cotton Bed Sheet"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Price</label>
                                    <Input
                                        type="number"
                                        required
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        placeholder="2999"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Category</label>
                                    <select
                                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option>Classic</option>
                                        <option>Premium</option>
                                        <option>Eco-Friendly</option>
                                        <option>Value</option>
                                        <option>Casual</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1 block">Description</label>
                                <textarea
                                    className="w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Product description..."
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-2 block">Colors</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {AVAILABLE_COLORS.map(color => (
                                        <label key={color} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.colors.includes(color)}
                                                onChange={() => handleColorChange(color)}
                                                className="rounded border-gray-300 text-primary focus:ring-primary"
                                            />
                                            <span className="text-sm text-foreground">{color}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1 block">Images</label>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="relative flex-1">
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                onChange={(e) => setImageFiles(e.target.files)}
                                            />
                                            <Button type="button" variant="outline" className="w-full justify-start">
                                                <Upload className="w-4 h-4 mr-2" />
                                                {imageFiles.length > 0
                                                    ? `${imageFiles.length} file(s) selected`
                                                    : "Upload Images (Multiple)"}
                                            </Button>
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground">Select multiple files to create a gallery.</p>
                                </div>
                            </div>

                            <div className="flex gap-3 justify-end mt-6">
                                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Saving..." : "Save Product"}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
}
