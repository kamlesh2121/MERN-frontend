import React,{useState,useEffect} from "react";
import Layout from "../../components/Layout/Layout.js";
import AdminMenu from "../../components/Layout/AdminMenu.js";
import axios from "axios";
import { toast } from "react-toastify";


const Users = () => {
  const [users,setUsers] = useState([]);


  //Remove User
  const removehandle = async (userId) => {
    try {
      const { data } = await axios.delete(`/api/v1/auth/remove-user/${userId}`);
      toast.success(data?.message);
      getAllUsers();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in remove User ");
    }
  };

  //get all Users
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-users");
      setUsers(data?.users);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getall Products ");
    }
  };
  //useEffect call
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <Layout title={"Dashboard-All User"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Users</h1>

            {users?.length > 0 ? (
              <table className="table table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user, i) => (
                    <tr key={user._id}>
                      <th scope="row">{i + 1}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <th>
                        <button className="btn btn-danger"
                        onClick={()=> removehandle(user._id)}>Remove</button>
                        </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h1>No Users Found</h1>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
