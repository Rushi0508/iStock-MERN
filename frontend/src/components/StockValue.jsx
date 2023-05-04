import React from 'react'

function StockValue(props) {
    let pv=0,sv=0;
    for(let item of props.items){
        pv+=(item.quantity * item.purchasePrice);
        sv+=(item.quantity * item.sellPrice);
    }
  return (
    <div className="stock-value">
        <div className="purchase-value">
            <p>Purchase Value:</p>
            <h5>{pv}</h5>
        </div>
        <div className="sell-value">
            <p>Selling Value:</p>
            <h5>{sv}</h5>
        </div>
    </div>
  )
}

export default StockValue
