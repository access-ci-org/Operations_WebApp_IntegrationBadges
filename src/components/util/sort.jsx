export const SortOrder = {
    Ascending: "Ascending",
    Descending: "Descending"
};

export function sortJsonArrayAlphabetically(array, fieldName = null, order=SortOrder.Ascending) {
    if (!array) return null;

    array = [...array];
    array.sort((a, b) => {
        const nameA = (fieldName ? a[fieldName] : a).toLowerCase(); // Convert to lowercase for case-insensitive sorting
        const nameB = (fieldName ? b[fieldName] : b).toLowerCase();

        if (nameA < nameB) {
            return -1; // nameA comes before nameB
        }
        if (nameA > nameB) {
            return 1; // nameA comes after nameB
        }
        return 0; // names are equal
    });

    if (order === SortOrder.Descending) array = Array.reverse(order);

    return array;
}