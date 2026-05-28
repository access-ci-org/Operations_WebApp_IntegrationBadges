// Function to convert a File object to a Base64 string (Promise-based)
export function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file); // Reads file as a data URL (Base64)
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

/**
 * @param {* | *[]} a
 * @returns {*[] | null}
 */
export function toArrayOrNull(a) {
    if (!!a && !Array.isArray(a)) return [a];
}
