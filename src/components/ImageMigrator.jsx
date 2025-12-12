import { useEffect, useState } from "react";
import { products } from "../data/products";
import { uploadImageFromUrl } from "../lib/storage-utils";

export default function ImageMigrator() {
    const [status, setStatus] = useState("idle");
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState([]);
    const [newProductData, setNewProductData] = useState(null);

    useEffect(() => {
        const migrateImages = async () => {
            setStatus("migrating");
            const updatedProducts = [];

            for (let i = 0; i < products.length; i++) {
                const product = products[i];
                try {
                    setLogs(prev => [...prev, `Migrating ${product.name}...`]);

                    // Generate a unique path: products/{id}/image.jpg
                    const path = `products/product-${product.id}.jpg`;

                    // Upload
                    const newUrl = await uploadImageFromUrl(product.image, path);

                    updatedProducts.push({
                        ...product,
                        image: newUrl
                    });

                    setLogs(prev => [...prev, `Success: ${newUrl}`]);
                } catch (error) {
                    console.error(`Failed to migrate ${product.name}`, error);
                    setLogs(prev => [...prev, `Failed: ${product.name} - ${error.message}`]);
                    updatedProducts.push(product); // Keep original on failure
                }
                setProgress(((i + 1) / products.length) * 100);
            }

            setNewProductData(updatedProducts);
            setStatus("completed");
            console.log("MIGRATION_COMPLETE_DATA", JSON.stringify(updatedProducts, null, 2));
        };

        if (status === "idle") {
            migrateImages();
        }
    }, [status]);

    return (
        <div className="fixed inset-0 bg-background z-50 p-8 overflow-auto">
            <h1 className="text-2xl font-bold mb-4">Image Migration Status: {status}</h1>
            <div className="w-full bg-secondary h-4 mb-4 rounded-full overflow-hidden">
                <div
                    className="bg-primary h-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="grid grid-cols-2 gap-8">
                <div className="bg-card p-4 rounded-lg border">
                    <h2 className="font-bold mb-2">Logs</h2>
                    <pre className="text-xs h-96 overflow-auto">
                        {logs.join('\n')}
                    </pre>
                </div>

                {newProductData && (
                    <div className="bg-card p-4 rounded-lg border">
                        <h2 className="font-bold mb-2">New Data (Copy this to products.js)</h2>
                        <pre className="text-xs h-96 overflow-auto select-all">
                            {JSON.stringify(newProductData, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}
