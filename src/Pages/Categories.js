import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout.js'
import useCategory from '../hooks/useCategory.js'
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = useCategory();

  return (
   <Layout title={"All Categories"}>
    <div className="container">
        <div className="row">
            {categories?.map((c)=>(
                <div className="col-md-3 mt-5" key={c._id}>
                    <Link to={`/category/${c.slug}`} 
                    className='btn btn-secondary p-4'>
                      {c.name}
                    </Link>
                </div>
            ))}
        </div>
    </div>

   </Layout>
  )
}

export default Categories
