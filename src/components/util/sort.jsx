export const SortOrder = {
    Ascending: "Ascending",
    Descending: "Descending"
};

export function sortJsonArrayAlphabetically(array, fieldName = null, order=SortOrder.Ascending) {
    if (!array) return null;

    array = [...array];
    array.sort((a, b) => {
        if (fieldName) {
            a = a[fieldName];
            b = b[fieldName];
        }

        // Convert to lowercase for case-insensitive sorting
        if (typeof a === "string") a = a.toLowerCase();
        if (typeof b === "string") b = b.toLowerCase();

        if (a < b) {
            return -1; // "a" comes before "b"
        }
        if (a > b) {
            return 1; // "a" comes after "b"
        }
        return 0; // names are equal
    });

    if (order === SortOrder.Descending) array = array.reverse();

    return array;
}