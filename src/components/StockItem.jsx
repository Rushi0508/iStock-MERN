import React from 'react'

function Item(props) {
    // console.log(props.item._id);
    const {stockIN,stockOUT} = props;
  return (
    <tr>
        <td data-label="Sr.No">{props.index + 1}</td>
        <td data-label="Item Name">{props.item.name}</td>
        <td data-label="Quantity">{props.item.quantity}</td>
        <td data-label="Purchase Value">{props.item.purchasePrice * props.item.quantity}</td>
        <td data-label="Selling Value">{props.item.sellPrice * props.item.quantity}</td>
        <td className='tb-btn'><button data-toggle="modal" onClick={()=>stockIN(props.item, props.store._id)} className="btn btn-sm btn-warning">IN</button></td>       
        <td className='tb-btn'><button data-toggle="modal" onClick={()=>stockOUT(props.item, props.store._id)} className="btn btn-sm btn-info">OUT</button></td>
    </tr>
  )
}

export default Item
