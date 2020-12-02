import { useState, useEffect, useCallback } from "react";

export const useFetch = (url) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getProducts = useCallback(async () => {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setLoading(false);
    }, [url]);

    useEffect(() => {
        getProducts();
    }, [url, getProducts]);
    return { loading, data };
};
