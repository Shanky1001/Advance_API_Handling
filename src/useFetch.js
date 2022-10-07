import { useState } from "react"

// CUSTOM HOOK USE FETCH 
export const useFetch = () => {
    // state to store the data
    let [data, setData] = useState('');
    let [data1,setData1] = useState([]);

    //  Function to fetch data from API
    const extractDataFromApi = (url, payload,condition) => {
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                appTag: "amazon_sales_channel",
                Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjI5MGRiYjIzOGUyOWExYjIzMzYwY2E5Iiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjk2NTY4MDE3LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzM2U1ZjUxYWRkZGFlMjIyNjczN2E5MiJ9.m5LW1XQ_w6E8Y_ZAWV-SqoqLUpgyeQXe3R7aGKhCfkxA0h0i2oESFxS3NXvsqU2zBWO9iPa5vobjXypZCEo7ZbjieaowfryVym-Yc2Kc-SkfHJfr7a2QrXxfKql0nBX0SvgEfVdWKxmVb3AK7MyT60gVUCCh82H7ExXntXA46oTvIQkK2rMTC1pCAFxFcWPTUEvz2yfuyLf62533dDfbdWwnYBxOYXrTUBN9E6aOsbl8MDfglV7bRIiKCXF1hTRjyOzUzqp_Tns4kg3oT2zXKpv7mLFcPpEPnYveRP4TGi_N5gRjfyA4o7xAxTHIxmhlRrY7ZEFUx-BcW6aZz7tYNw
                `,
                "Ced-Source-Id": 500,
                "Ced-Source-Name": "shopify",
                "Ced-Target-Id": 530,
                "Ced-Target-Name": "amazon",
            },
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(res => {

                if(condition){
                    setData(res.data)
                }else{
                    setData1(res.data);
                    console.log(data1); 
                }
            })
            .catch(err => console.log(err))
    }
    return [ data, data1, extractDataFromApi ]
}