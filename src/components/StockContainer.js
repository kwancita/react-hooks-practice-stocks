import React from "react";
import Stock from "./Stock";

function StockContainer({stocks,onClick}) {

  const stockList = stocks.map(stock => {
    return <Stock onClick={onClick} key={stock.id} stock= {stock}/>
  })

  return (
    <div>
      <h2>Stocks</h2>
      {stockList}
    </div>
  );
}

export default StockContainer;
