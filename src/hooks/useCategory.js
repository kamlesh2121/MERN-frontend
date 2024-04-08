import { useState, useEffect } from 'react';
import axios from 'axios';
const baseUrl = 'https://mern-backend-bvwk.onrender.com'

export default function useCategory(){
    const [categories, setCategories] = useState([]);

    //get categories
    const getCategories = async ()=>{
        try {
            const {data} = await axios.get(`${baseUrl}/api/v1/category/get-category`);
            setCategories(data?.category)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getCategories();
    }, [])

    return categories ;
}