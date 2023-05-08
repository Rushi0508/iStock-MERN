import {React,useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from 'axios';


function Sidebar(props) {
    const location = useLocation();
    useEffect(()=>{
        
    }, [location])
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const logOut = () => {
        localStorage.removeItem("jwt");
        navigate("/login");
    };
    // Responsive 
    const [toggleIcon, setToggleIcon] = useState("fa fa-bars");
    const [hide, setHide] = useState("hide");
    const handleToggle = ()=>{
        if(toggleIcon==="fa fa-bars" && hide==="hide"){
            setToggleIcon("fa fa-times")
            setHide("item-toggle");
        }else{
            setToggleIcon("fa fa-bars")
            setHide("hide");
        }
    }
  return (
    <>
        <div className="sidebar">
            <div className="logo">
                <h2>iStock</h2>
            </div>
            <ul className="sidebar-items p-0">
                <Link to="/" className={`side-link ${(location.pathname==="/"? 'active': "")}`}>Dashboard</Link>
                <Link to="/stock" className={`side-link ${(location.pathname==="/stock"? 'active': "")}`}>Stock</Link>
                <Link to="/items" className={`side-link ${(location.pathname==="/items"? 'active': "")}`}>Items</Link>
                <Link to="/add-item" className={`side-link ${(location.pathname==="/add-item"? 'active': "")}`}>Add Item</Link>
                <Link to="/entries" className={`side-link ${(location.pathname==="/entries"? 'active': "")}`}>Entries</Link>
                <a className= "side-link" onClick={logOut}>Logout</a>
            </ul>
        </div>
        <div className="mobile-nav">
            <div className="nav-head">
                <div className="logo">
                    <h2>iStock</h2>
                </div>
                <i className={`${toggleIcon} nav-open`} onClick={handleToggle}></i>
            </div>
            <ul className={`mobile-nav-items ${hide} p-0`}>
                <Link to="/" className={`mobile-link ${(location.pathname==="/"? 'active': "")}`}>Dashboard</Link>
                <Link to="/stock" className={`mobile-link ${(location.pathname==="/stock"? 'active': "")}`}>Stock</Link>
                <Link to="/items" className={`mobile-link ${(location.pathname==="/items"? 'active': "")}`}>Items</Link>
                <Link to="/add-item" className={`mobile-link ${(location.pathname==="/add-item"? 'active': "")}`}>Add Item</Link>
                <Link to="/entries" className={`mobile-link ${(location.pathname==="/entries"? 'active': "")}`}>Entries</Link>
                <a className= "mobile-link" onClick={logOut}>Logout</a>
            </ul>
        </div>
    </>
  )
}

export default Sidebar
