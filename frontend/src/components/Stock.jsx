import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import StockItem from "./StockItem";
import StockValue from "./StockValue";
import Sidebar from "./Sidebar";

function Stock(props) {
    const navigate = useNavigate();
    const [cookies] = useCookies([]);
    const [store, setStore] = useState("");
    const [items,setItems]= useState("")
    const generateError = (msg) =>
        toast.error(msg, {
        position: "bottom-right",
    });
    const generateSuccess = (msg) =>
        toast.success(msg, {
        position: "bottom-right",
    });
    const fetchItems = async()=>{
        if (!localStorage.getItem("jwt")) {
            console.log("NO COOKIES");
            navigate("/login");
        } 
        else {
            props.setProgress(30);
            // const sid = cookies.sid;
            // console.log(sid);
            const { data } = await axios.post(
                "https://i-stock-backend.vercel.app/api/item/items",
                {jwt: localStorage.getItem("jwt")},
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
        document.title = "Stock | iStock"
        fetchItems();
    }, []);
    const inref = useRef(null);
    const incloseref = useRef(null);
    const outref = useRef(null);
    const outcloseref = useRef(null);
    const [stock, setStock] = useState({sid: "",id :"",currQuantity : "",quantity : "",partyName : "",
    itemName : "",currPP: "",currSP : "",pp :  "",sp : ""});
    const stockIN = (item,sid)=>{
        inref.current.click();
        setStock({sid: sid,id: item._id, currQuantity: item.quantity,itemName: item.name,partyName: ""
    , pp: "", sp: item.sellPrice,currPP: item.purchasePrice })
    }
    const stockOUT = (item,sid)=>{
        outref.current.click();
        setStock({sid: sid,id: item._id, currQuantity: item.quantity,itemName: item.name,partyName: ""
    , pp: item.purchasePrice, sp: "", currPP: item.purchasePrice })
    }
    const handleIN = async ()=>{
        incloseref.current.click();
        props.setProgress(30);
        const { data } = await axios.post(
            "https://i-stock-backend.vercel.app/api/entry/stock-in",
            {...stock},
            {
            withCredentials: true,
            }
        );
        
        if(data.status){
            fetchItems();
            generateSuccess("Stock Added Successfully");
            props.setProgress(100);
            setStock({id :"",currQuantity : "",quantity : "",partyName : "",
            itemName : "",currPP: "",currSP : "",pp :  "",sp : ""});
        }else{
            props.setProgress(100);
            generateError("Stock Not Added");
            setStock({id :"",currQuantity : "",quantity : "",partyName : "",
            itemName : "",currPP: "",currSP : "",pp :  "",sp : ""});
        }
    }
    const handleOUT = async ()=>{
        outcloseref.current.click();
        props.setProgress(30);
        const { data } = await axios.post(
            "https://i-stock-backend.vercel.app/api/entry/stock-out",
            {...stock},
            {
            withCredentials: true,
            }
        );
        
        if(data.status){
            fetchItems();
            generateSuccess("Stock Removed Successfully");
            props.setProgress(100);
            setStock({id :"",currQuantity : "",quantity : "",partyName : "",
            itemName : "",currPP: "",currSP : "",pp :  "",sp : ""});
        }else{
            props.setProgress(100);
            generateError("Stock Not Removed");
            setStock({id :"",currQuantity : "",quantity : "",partyName : "",
            itemName : "",currPP: "",currSP : "",pp :  "",sp : ""});
        }
    }
    return (
        <>
        <Sidebar/>
        {/* IN STOCK MODEL  */}
        <button type="button" className="btn btn-primary d-none" ref={inref} data-toggle="modal" data-target="#exampleModal1">
        Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal1" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Stock In - {stock.itemName}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body stock-form">
                    <p>Available Stock: {stock.currQuantity}</p>
                    Party Name: <br/><input type="text" value={stock.partyName} name="partyName" onChange={(e)=>setStock({...stock, [e.target.name]: e.target.value})}/><br/>
                    Enter quantity to add: <br/><input type="number" value={stock.quantity} name="quantity" onChange={(e)=>setStock({...stock, [e.target.name]: e.target.value})}/><br/>
                    Purchase Price/unit: <br/><input type="number" value={stock.pp} name="pp" onChange={(e)=>setStock({...stock, [e.target.name]: e.target.value})}/>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" ref={incloseref} data-dismiss="modal">Close</button>
                <button type="button" onClick={handleIN} className="btn btn-primary" >Save changes</button>
                </div>
            </div>
            </div>
        </div>
        {/* OUT STOCK MODAL  */}
        <button type="button" className="btn btn-primary d-none" ref={outref} data-toggle="modal" data-target="#exampleModal2">
        Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal2" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Stock Out - {stock.itemName}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body stock-form">
                    <p>Available Stock: {stock.currQuantity}</p>
                    Party Name: <br/><input type="text" value={stock.partyName} name="partyName" onChange={(e)=>setStock({...stock, [e.target.name]: e.target.value})}/><br/>
                    Enter quantity to remove: <br/><input type="text" value={stock.quantity} name="quantity" onChange={(e)=>setStock({...stock, [e.target.name]: e.target.value})}/><br/>
                    Selling Price/unit: <br/><input type="text" value={stock.sp} name="sp" onChange={(e)=>setStock({...stock, [e.target.name]: e.target.value})}/>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" ref={outcloseref} data-dismiss="modal">Close</button>
                <button type="button" onClick={handleOUT} className="btn btn-primary" >Save changes</button>
                </div>
            </div>
            </div>
        </div>
        <div className="container items-container px-5 py-4">
        <p className='m-0'>{store.name}</p>
        <h2 className='font-weight-bold'>All Stock</h2>
        <StockValue items = {items}/>
            <div className="items-wrapper my-3">
                {(items.length===0)? <h1>NO ITEMS AVAILABLE</h1>:
                    <table>
                    <thead>
                        <tr id="header">
                            <th>Sr.No</th>
                            <th>Name</th>
                            <th>Available Stock</th>
                            <th>Purchase Value</th>
                            <th>Sell Value</th>
                        </tr>
                    </thead>
                    <tbody>
                    {items.map((item,index) => {
                        return <StockItem stockOUT={stockOUT} stockIN={stockIN} key= {item._id} item={item} store={store} index={index} />
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

export default Stock
