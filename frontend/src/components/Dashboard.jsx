import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Sidebar from "./Sidebar";


function Dashboard(props) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [store, setStore] = useState("");
  const [calc, setCalc] = useState("");
  const verifyUser = async () => {
    if (!localStorage.getItem("jwt")) {
      console.log("NO COOKIES");
      navigate("/login");
    } else {
      props.setProgress(30);
      const { data } = await axios.post(
        "https://istock.onrender.com/api/auth/getstore",
        {jwt: localStorage.getItem("jwt")},
        {
          withCredentials: true,
        }
      );
      console.log(data);
      if(!data.status){
        localStorage.removeItem("jwt")
        navigate("/login")
      }
      props.setProgress(100);
      setStore(data.store);
      setCalc(data.calc);
    }
  };
  useEffect(() => {
    verifyUser();
  }, [cookies, navigate, removeCookie]);
  return (
    <>
    <Sidebar/>
      <div className="container dashboard-container px-5 py-4">
        <p className='m-0'>{store.name}</p>
        <h2 className='font-weight-bold'>Dashboard</h2>
        <div className="dashboard-wrapper my-3">
          <div className="dash-item">
            <div className="item-details">
              <p className='dash-head'>Total Sales</p>
              <p className='head-item'>₹{calc.sales}</p>
            </div>
          </div>
          <div className="dash-item">
            <div className="item-details">
              <p className='dash-head'>Total Earnings</p>
              <p className='head-item'>₹{calc.earning}</p>
            </div>
          </div>
          <div className="dash-item">
            <div className="item-details">
              <p className='dash-head'>Available Items</p>
              <p className='head-item'>{(store.items)?store.items.length:0}</p>
            </div>
          </div>
          <div className="dash-item">
            <div className="item-details">
              <p className='dash-head'>Monthly Sales</p>
              <p className='head-item'>₹{calc.msales}</p>
            </div>
          </div>
          <div className="dash-item">
            <div className="item-details">
              <p className='dash-head'>Monthly Earnings</p>
              <p className='head-item'>₹{calc.mearning}</p>
            </div>
          </div>
          <div className="dash-item">
            <div className="item-details">
              <p className='dash-head'>Out of Stock</p>
              <p className='head-item'>{calc.outStock}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;