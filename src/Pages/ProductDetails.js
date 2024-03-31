import React,{useEffect,useState} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import '../styles/ProductDetailsStyles.css'

const ProductDetails = () => {
    const params = useParams();
    const [product,setProduct] = useState({});
    const [relatedProduct,setRelatedProduct] = useState([]);

    useEffect(() => {
       if(params?.slug)  getProduct();
       // eslint-disable-next-line
    }, [params?.slug])


    //get product
    const getProduct = async() =>{
        try {
            const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            getSimilarProduct(data?.product?._id , data?.product?.category?._id);
               
        } catch (error) {
            console.log(error)
        }
    };

    // get Similar Product
    const getSimilarProduct = async (pid,cid)=>{
        try {
            const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProduct(data?.product);
            
        } catch (error) {
            console.log(error)
        }

    }
    
    
  return (
    <Layout>
        <h1 >Product Details</h1>
        <div className="row container product-details">
            <div className="col-md-6">
            <img src={`/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name}
            height='300px'
            width='300px' />
            </div>
            <div className="col-md-6 product-details-info ">
                <h1 className='text-center'>Product Details</h1>
                <hr />
                <h3>NAME : {product.name}</h3>
                <h3>Description : {product.description}</h3>
                <h3>Price : $ {product.price}</h3>
                <h3>Category : {product.category?.name}</h3>
                <h3>Quantity : {product.quantity}</h3>

                <button className="btn btn-secondary ms-1">Add To Card</button>
            </div>
        </div>
        <hr />
        <div className="row container similar-products" >
            <h4>Similar Product</h4>
            {relatedProduct?.length === 0 && <p className='text-center'>No Similar Product Found</p>}

            <div className="d-flex flex-wrap">
            {relatedProduct?.map((p, index) => (
              <div className="card m-2 d" key={index} style={{ width: "18rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title">$ {p.price}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <button className="btn btn-secondary ms-1">Add To Card</button>
                </div>
              </div>
            ))}
          </div>
        </div>
    </Layout>
  )
}

export default ProductDetails
