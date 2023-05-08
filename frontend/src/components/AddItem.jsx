import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Sidebar from "./Sidebar";

function AddItem(props) {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [store, setStore] = useState("");
    const [values, setValues] = useState({
        itemName: "",
        pp: "",
        sp: "",
        category: "",
        quantity: ""
    })
    if (!localStorage.getItem("jwt")) {
        console.log("NO JWT");
        navigate("/login");
    } 
    const generateError = (msg) =>
        toast.error(msg, {
        position: "bottom-right",
    });
    const generateSuccess = (msg) =>
        toast.success(msg, {
        position: "bottom-right",
    });
    const addItem = async(event)=>{
      props.setProgress(30);
        event.preventDefault();
        const { data } = await axios.post(
            "https://istock.onrender.com/api/item/",
            {...values, jwt: localStorage.getItem("jwt")},
            {
            withCredentials: true,
            }
        );
        props.setProgress(60);
        console.log(data);
        if(data.status){
            generateSuccess("Item Added Successfully");
            event.target.reset();
            setValues({itemName: "",pp: "",sp: "",category: "",quantity: ""})
        }else{
            generateError("Item Not Added");
        }
        props.setProgress(100);
    }
  const verifyUser = async () => {
    if (!localStorage.getItem("jwt")) {
      console.log("NO JWT");
      navigate("/login");
    } else {
      props.setProgress(40);
      const { data } = await axios.post(
        "https://istock.onrender.com/api/auth/getstore",
        {jwt: localStorage.getItem("jwt")},
        {
          withCredentials: true,
        }
      );
      if(!data.status){
        localStorage.removeItem("jwt")
        navigate("/login")
      }
      setStore(data.store);
      props.setProgress(100);
    }
  };
  useEffect(() => {
    verifyUser();
  }, [cookies, navigate, removeCookie]);
  return (
    <>
    <Sidebar/>
    <div className='container add-item-container px-5 py-4'>
        <p className='m-0'>{store.name}</p>
        <h2 className='font-weight-bold'>Add Item</h2>
        <div className="items-wrapper my-3">
            <form action="add-item" onSubmit={addItem}>
                {/* <h2>New Item</h2> */}
                <input type="text" placeholder="Item name" name="itemName" onChange={(e)=>setValues({...values, [e.target.name]: e.target.value})}/>
                <input type="text" placeholder="Purchase Price" name="pp" onChange={(e)=>setValues({...values, [e.target.name]: e.target.value})}/>
                <input type="text" placeholder="Selling Price" name="sp" onChange={(e)=>setValues({...values, [e.target.name]: e.target.value})}/>
                <input type="text" placeholder="Category" name="category" onChange={(e)=>setValues({...values, [e.target.name]: e.target.value})}/>
                <input type="text" placeholder="Quantity" name="quantity" onChange={(e)=>setValues({...values, [e.target.name]: e.target.value})}/>
                <button>Submit</button>
            </form>
        </div>
    </div>
    <ToastContainer />
    </>
  )
}

export default AddItem
