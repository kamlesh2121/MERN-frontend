import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout.js";
import AdminMenu from "../../components/Layout/AdminMenu.js";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm.js";
import {Modal} from 'antd';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState();
  const [visible,setVisible] =useState(false)
  const [selected,setSelected] =useState(null)
  const [updateName,setUpdateName] =useState("") 
  //handle Form
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/v1/category/create-category',{name})
      if(data?.success){
        toast.success(`${name} is created`)
        getAllCategory();
      }else{
        toast.error(data?.message)
      }
    } catch (error) {
      toast.error("Something went wrong in handlesubmit Form")
    }
  }

  //get category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");

      if (data?.success) {
        setCategories(data?.category);
        
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update category
  const handleUpdate = async(e) =>{
    e.preventDefault();
    try {
      const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`,{name:updateName})
      if(data.success){
        toast.success(`${updateName} is updated`)
        setSelected(null)
        setUpdateName("")
        setVisible(false);
        getAllCategory();

      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error("something went wrong in update category")
    }
  }
  //Delete category
  const handleDelete = async(pid) =>{
    try {
      const {data} = await axios.delete(`/api/v1/category/delete-category/${pid}`);
      if(data.success){
        toast.success(`${name} is Deleted`)
        getAllCategory();

      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error("something went wrong in Delete category")
    }

  }
  return (
    <Layout title={"Dashboard-Create Cetegory"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Cetegory</h1>
            <div className="p-3 w-50">
              <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((item) => (
                    <>
                      <tr>
                        <td key={item._id}>{item.name}</td>
                        <td>
                          <button type="button" 
                          className="btn btn-primary ms-2"
                          onClick={()=>{
                            setVisible(true) ;
                            setUpdateName(item.name) ;
                            setSelected(item)}} >
                            Edit
                          </button>
                          <button type="button"
                           className="btn btn-danger ms-2"
                           onClick={()=>handleDelete(item._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={()=>setVisible(false)} 
            footer={null}
            visible={visible} >
              <CategoryForm value={updateName} setValue={setUpdateName}
              handleSubmit={handleUpdate} />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
