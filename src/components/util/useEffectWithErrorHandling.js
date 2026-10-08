import {useState, useEffect, useCallback} from 'react';

export function useEffectWithErrorHandling(fetchFunction, dependencies = []) {
    const [data, setData] = useState(null);
    const [processing, setProcessing] = useState(true);
    const [error, setError] = useState(null);

    // Memoize the execution logic to ensure a stable reference identity
    const executeFetch = useCallback(async () => {
        setProcessing(true);
        setError(null);
        try {

            // await new Promise(resolve => setTimeout(resolve, 2000))

            const result = await fetchFunction();

            // throw new Error();

            setData(result);
        } catch (err) {
            setError(err);
        } finally {
            setProcessing(false);
        }
    }, [fetchFunction]);

    // Handle the automatic useEffect lifecycle execution
    useEffect(() => {
        executeFetch();
    }, [...dependencies]);

    return {data, processing, error, reload: executeFetch, ready: !processing && !error};
}
