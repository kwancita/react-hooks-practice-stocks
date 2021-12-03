import React from "react";
import Stock from "./Stock";

function PortfolioContainer({onClick, portfolio}) {
  
  const portList = portfolio.map(stock => {
    return <Stock onClick={onClick} key={stock.id} stock= {stock}/>
  })
  

  return (
    <div >
      <h2 className="port">My Portfolio</h2>
        {portList}
    </div>
  );
}

export default PortfolioContainer;
