export default function DefaultReducer(state, newState) {
    if (Array.isArray(state)) {
        return [
            ...newState
        ]
    } else if (state === null || state === undefined) {
        return newState
    } else if (typeof state === "object") {
        return {
            ...newState
        }
    } else {
        return newState;
    }
}