import {useState, useEffect} from 'react';

export const useFetch = ({url,requestOptions}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(url,requestOptions)
            .then((res) => {
                if(res.status>=200 && res.status<=299){
                    return res.json();
                }else{
                    setIsLoading(false);
                    setIsError(true);
                    throw new Error(res.statusText);
                }
            })
            .then((d) => {
                setData(d)
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error)
                setIsLoading(false);
                setIsError(true);
            });
    }, [url]);

    return {isLoading, data,isError};
};
