import React, { useState } from 'react';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function EntryItem(props) {
  const displayPrice = (entry)=>{
    if(entry.operation==="sell"){
      return <span><b>Sell Price:</b> &nbsp;{entry.sellPrice}</span>
    }
    else if(entry.operation==="purchase"){
      return <span><b>Purchase Price:</b> &nbsp;{entry.purchasePrice}</span>
    }
  }
  const displayAmount = (entry)=>{
    if(entry.operation==="sell"){
      return <span><b>Sell Amount:</b> &nbsp;{entry.quantity * entry.sellPrice}</span>
    }
    else if(entry.operation==="purchase"){
      return <span><b>Purchase Amount:</b> &nbsp;{entry.quantity * entry.purchasePrice}</span>
    }
  }
  return (
    <>
      <div className="card">
          <div className="card-header" data-toggle="collapse" data-target={`#collapse${props.index}`} aria-expanded="true" aria-controls="collapseOne" id="headingOne">
            <h2 className="mb-0">
              <button className="btn d-flex align-items-center w-100" type="button">
                <div className="details w-100 d-flex gap-3 align-items-center">
                  <p className='m-0 entry-name'>{props.entry.itemName}</p>
                  <p className='m-0 text-muted entry-date'>{props.entry.createdAt.substring(0,10)}</p>
                  <p className={`m-0 operation bg-opacity-50 ${(props.entry.operation==="purchase")?'bg-warning':'bg-info'}`}>{props.entry.operation.charAt(0).toUpperCase() + props.entry.operation.slice(1)}</p>
                </div>
                <i className="fa-solid fa-angle-down float-right"></i>
              </button>
            </h2>
          </div>

          <div id={`collapse${props.index}`} className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">
                  <b>Party Name: &nbsp;</b>{props.entry.partyName}
                </li>
                <li className="list-group-item">
                  <b>Item Name: &nbsp;</b>{props.entry.itemName}
                </li>
                <li className="list-group-item">
                  <b>Quantity: &nbsp;</b>{props.entry.quantity}
                </li>
                <li className="list-group-item">
                    {displayPrice(props.entry)}
                </li>
                <li className="list-group-item">
                    {displayAmount(props.entry)}
                </li>
                    {
                      props.entry.operation==="sell"?
                      <li className="list-group-item">
                      <span><b>Profit: &nbsp;</b>{(props.entry.sellPrice-props.entry.purchasePrice)*props.entry.quantity}</span>
                      </li>:""
                    }
              </ul>
            </div>
          </div>
      </div>
    </>
  )
}

export default EntryItem
