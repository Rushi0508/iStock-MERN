import React, { useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Item from "./Item";
import Sidebar from "./Sidebar";

function Items(props) {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [store, setStore] = useState("");
    const [items,setItems]= useState("");

    const generateError = (msg) =>
        toast.error(msg, {
        position: "bottom-right",
    });
    const generateSuccess = (msg) =>
        toast.success(msg, {
        position: "bottom-right",
    });

    const fetchItems = async()=>{
        if (!cookies.jwt) {
            console.log("NO COOKIES");
            navigate("/login");
        } 
        else {
            props.setProgress(30);
            // const sid = cookies.sid;
            // console.log(sid);
            const { data } = await axios.post(
                "http://localhost:5000/api/item/items",
                {},
                {
                withCredentials: true,
                }
            );
            // console.log(data);
            setItems(data.items);
            setStore(data.store);
            props.setProgress(100);
        }
    }
    useEffect(() => {
        fetchItems();
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);
    const [item,setItem] = useState({id:"",name:"",category:"", quantity:"", sellPrice:"",purchasePrice:""});
    const updateItem = (currentItem)=>{
        ref.current.click();
        setItem({id: currentItem._id,name: currentItem.name, category: currentItem.category, quantity: currentItem.quantity, sellPrice: currentItem.sellPrice, purchasePrice: currentItem.purchasePrice});
    }
    const handleUpdate = async ()=>{
        refClose.current.click();
        props.setProgress(30);
        const { data } = await axios.post(
            "http://localhost:5000/api/item/edit",
            {...item},
            {
            withCredentials: true,
            }
        );
        
        if(data.status){
            fetchItems();
            generateSuccess("Item Edited Successfully");
            props.setProgress(100);
        }else{
            generateError("Item not Edited");
        }
    }
    const handleDelete = async (sid, iid) => {
        props.setProgress(50);
        const { data } = await axios.post(
          "http://localhost:5000/api/item/delete",
          { id: sid, iid: iid },
          {
            withCredentials: true,
          }
        );
        if (data.status) {
          fetchItems();
          generateSuccess("Item Deleted Successfully");
          props.setProgress(100);
        }else{
          generateError("Item not Deleted");
        }
    }
    return (
        <>
        <Sidebar/>
        <button type="button" className="btn btn-primary d-none" ref={ref} data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Item</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-body edit-form">
                    <div className="form-item">Item name: <input type="text" name="name" value={item.name} onChange={(e)=>setItem({...item, [e.target.name]: e.target.value})}/></div>
                    <div className="form-item">Category: <input type="text" name="category" value={item.category} onChange={(e)=>setItem({...item, [e.target.name]: e.target.value})}/></div>
                    <div className="form-item">Quantity:<input type="text" name="quantity" value={item.quantity} onChange={(e)=>setItem({...item, [e.target.name]: e.target.value})}/></div>
                    <div className="form-item">Purchase Price: <input type="text" name="purchasePrice" value={item.purchasePrice} onChange={(e)=>setItem({...item, [e.target.name]: e.target.value})}/></div>
                    <div className="form-item">Sell Price: <input type="text" name="sellPrice" value={item.sellPrice} onChange={(e)=>setItem({...item, [e.target.name]: e.target.value})}/></div>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" ref={refClose}>Close</button>
                <button type="button" onClick={handleUpdate} className="btn btn-primary" >Save changes</button>
                </div>
            </div>
            </div>
        </div>
        <div className="container items-container px-5 py-4">
        <p className='m-0'>{store.name}</p>
        <h2 className='font-weight-bold'>Items</h2>
            <div className="items-wrapper my-3">
                {(items.length==0)? <h1>NO ITEMS AVAILABLE</h1>:
                    <table>
                    <thead>
                        <tr id="header">
                            <th>Sr.No</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Purchase Price</th>
                            <th>Selling Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {items.map((item,index) => {
                        return <Item handleDelete={handleDelete} updateItem={updateItem} setItems={setItems} key= {item._id} store = {store} item={item} index={index} />
                    })}
                    </tbody>
                    </table>
                }
            </div>
        </div>
        <ToastContainer/>
        </>
    )
}

export default Items
