import React, { useState } from 'react';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Item(props) {
  const {updateItem, handleDelete} = props;
  return (
    <>
      <tr>
        <td data-label="Sr.No">{props.index + 1}</td>
        <td data-label="Item Name">{props.item.name}</td>
        <td data-label="Category">{props.item.category}</td>
        <td data-label="Quantity">{props.item.quantity}</td>
        <td data-label="Purchase Price">{props.item.purchasePrice}</td>
        <td data-label="Selling Price">{props.item.sellPrice}</td>
        <td className='tb-btn'><button data-toggle="modal" onClick={() => handleDelete(props.store._id, props.item._id)} className="btn btn-sm btn-danger">Delete</button></td>
        <td className='tb-btn'><button data-toggle="modal" onClick={()=> updateItem(props.item)} className="btn btn-sm btn-success">EDIT</button></td>
      </tr>
    </>
  )
}

export default Item
