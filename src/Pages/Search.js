import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../Contex/Search'

const Search = () => {
    const [values, setValues] = useSearch();
  return (
    <Layout title={"Search Results"}>
        <div className="container">
            <div className="text-center">
                <h1>Search Result</h1>
                <h6>{values?.results.length < 1 ? "No Product Found" : `Found ${values?.results.length}`}</h6>

                <div className="d-flex flex-wrap">
            {values?.results.map((p, index) => (
              <div className="card m-2 d" key={index} style={{ width: "18rem" }}>
                <img
                  src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title">$ {p.price}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <button className="btn btn-primary ms-1">More Details</button>
                  <button className="btn btn-secondary ms-1">Add To Card</button>
                </div>
              </div>
            ))}
          </div>
            </div>
        </div>
      
    </Layout>
  )
}

export default Search
