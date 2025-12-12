import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Uploads a file to Firebase Storage
 * @param {File} file - The file to upload
 * @param {string} path - The path to store the file (e.g., 'products/image.jpg')
 * @returns {Promise<string>} The download URL
 */
export const uploadImage = async (file, path) => {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
};

/**
 * Uploads an image from a URL to Firebase Storage
 * @param {string} url - The URL of the image to fetch
 * @param {string} path - The path to store the file
 * @returns {Promise<string>} The download URL
 */
export const uploadImageFromUrl = async (url, path) => {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        return await uploadImage(blob, path);
    } catch (error) {
        console.error("Error uploading image from URL:", error);
        throw error;
    }
};
