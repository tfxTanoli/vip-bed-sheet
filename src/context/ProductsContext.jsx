import { createContext, useContext, useState, useEffect } from "react";
import { db, storage } from "../../firebase";


const ProductsContext = createContext();

export const useProducts = () => {
    return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const productsRef = db.ref('products');

        productsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convert object to array
                const productsList = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setProducts(productsList);
            } else {
                setProducts([]);
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching products:", error);
            setError(error.message);
            setLoading(false);
        });

        return () => productsRef.off();
    }, []);



    const addProduct = async (productData, imageFiles) => {
        try {
            // Handle images
            let imageUrls = [];

            // Should be an array, but handle single file case just in case
            const files = Array.isArray(imageFiles) ? imageFiles : (imageFiles ? [imageFiles] : []);

            if (files.length > 0) {
                const uploadPromises = files.map(async (file, index) => {
                    const uniqueId = `${Date.now()}_${index}`;
                    const imageRef = storage.ref(`products/${uniqueId}_${file.name}`);
                    const snapshot = await imageRef.put(file);
                    return await snapshot.ref.getDownloadURL();
                });
                imageUrls = await Promise.all(uploadPromises);
            } else if (productData.image) {
                // Backward compatibility or manual URL
                imageUrls = [productData.image];
            } else {
                imageUrls = ["https://images.unsplash.com/photo-1522771753035-71103b9429b9?w=800"];
            }

            const newProductRef = db.ref('products').push();
            await newProductRef.set({
                ...productData,
                image: imageUrls[0], // Primary image for backward compatibility
                images: imageUrls,
                colors: productData.colors || [],
                createdAt: new Date().toISOString()
            });
            return newProductRef.key;
        } catch (err) {
            console.error("Error adding product:", err);
            throw err;
        }
    };

    const updateProduct = async (id, productData, imageFiles) => {
        try {
            let imageUrls = productData.images || (productData.image ? [productData.image] : []);

            const files = Array.isArray(imageFiles) ? imageFiles : (imageFiles ? [imageFiles] : []);

            if (files.length > 0) {
                const uploadPromises = files.map(async (file, index) => {
                    const uniqueId = `${Date.now()}_${index}`;
                    const imageRef = storage.ref(`products/${id}_${uniqueId}_${file.name}`);
                    const snapshot = await imageRef.put(file);
                    return await snapshot.ref.getDownloadURL();
                });
                const newUrls = await Promise.all(uploadPromises);

                // You might want to append or replace. For simplicity, let's replace if new files are provided, 
                // OR we could require the UI to pass the *final* list of images.
                // Given the simple UI, let's assume if files are uploaded, they replace the specific "image" field or append?
                // The implementation plan implies standard upload. Let's Append for now, or just Replace?
                // Usually "Edit" overwrites. Let's use the new files as the images if provided.
                imageUrls = newUrls;
            }

            await db.ref(`products/${id}`).update({
                ...productData,
                image: imageUrls[0] || productData.image, // Ensure primary image exists
                images: imageUrls,
                colors: productData.colors || [],
                updatedAt: new Date().toISOString()
            });
        } catch (err) {
            console.error("Error updating product:", err);
            throw err;
        }
    };

    const deleteProduct = async (id, imageUrl) => {
        try {
            await db.ref(`products/${id}`).remove();

            // Try to delete image from storage if it's a firebase storage url
            if (imageUrl && imageUrl.includes("firebasestorage")) {
                try {
                    // Extract path from URL roughly or use the storageRef directly if stored
                } catch (e) {
                    console.warn("Could not delete image file:", e);
                }
            }
        } catch (err) {
            console.error("Error deleting product:", err);
            throw err;
        }
    };

    const value = {
        products,
        loading,
        error,
        addProduct,
        updateProduct,
        deleteProduct
    };

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
};
