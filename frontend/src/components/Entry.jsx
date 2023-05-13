import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import EntryItem from './EntryItem';
import Sidebar from "./Sidebar";

const Entry = (props) => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [entries, setEntries] = useState("");
    const [store, setStore] = useState("");
    const fetchEntries = async () => {
        if (!localStorage.getItem("jwt")) {
            console.log("NO JWT");
            navigate("/login");
        }
        else {
            props.setProgress(30);
            const { data } = await axios.post(
                "https://i-stock-backend.vercel.app/api/entry/entries",
                {jwt: localStorage.getItem("jwt")},
                {
                    withCredentials: true,
                }
            );
            console.log(data);
            setEntries(data.entries);
            setStore(data.store);
            props.setProgress(100);
        }
    };
    useEffect(() => {
        document.title = "Entries | iStock"
        fetchEntries();
    }, []);
    return (
        <>
        <Sidebar/>
        <div className="container entries-container px-5 py-4">
            <p className='m-0'>{store.name}</p>
            <h2 className='font-weight-bold'>Entries</h2>
            <div className="entries-wrapper my-3">
                {(entries.length == 0) ? <h1>NO ENTRIES AVAILABLE</h1> :
                    <div class="accordion" id="accordionExample">
                        {entries.map((entry, index) => {
                            return <EntryItem key={entry._id} store={store} entry={entry} index={index} />
                        }).reverse()}
                    </div>
                }
            </div>
        </div>
        <ToastContainer />
        </>
    )
}

export default Entry
