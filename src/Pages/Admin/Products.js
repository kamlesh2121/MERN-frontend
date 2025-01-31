import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu.js";
import Layout from "../../components/Layout/Layout.js";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const baseUrl = 'https://mern-backend-bvwk.onrender.com'

const Products = () => {
  const [products, setProducts] = useState([]);

  //get all Product
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/product/get-product`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getall Products ");
    }
  };
  //useEffect call
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row mt-2">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Product List</h1>
          <div className="d-flex flex-wrap justify-content-start">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`${baseUrl}/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`${baseUrl}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
