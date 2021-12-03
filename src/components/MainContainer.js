import React from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";

function MainContainer() {

  const [stocks, setStocks] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [filter, setFilter] = useState("All")
  const [sort, setSort] = useState(null)

  const fetchAPI = () => {
    fetch("http://localhost:3001/stocks")
    .then (res => res.json())
    .then (data => setStocks(data))
  }

  useEffect( fetchAPI ,[])

  function handleBuy(stock){
    //check if there aare this stock in portfolio?
    const inPortfolio = portfolio.find((s) => s === stock)
    //console.log(!inPortfolio)
    if(!inPortfolio){
      setPortfolio([...portfolio, stock])
    } 
  }
  
  function handleSell(stock){
    console.log(stock)
    const updatedPort = portfolio.filter((s) => s.id !== stock.id)
    setPortfolio(updatedPort)
  }

  const handleFilter = () => {
    let stockList;
    if(sort === null){
      stockList = stocks
    }else if (sort === "Alphabetically"){
      stockList = stocks.sort((a,b) => {
        if(a.name > b.name){
          return 1
        }else{
          return -1
        }
      })
    }else{
      stockList = stocks.sort((a,b) => {
        if(a.price > b.price){
          return 1
        }else{
          return -1
        }
      })
    }
    if(filter === "All"){
      return stocks
    }else{
      return stocks.filter(stock => stock.type === filter)
    }
  }

  function handleFilterChange(e){
    console.log(e.target.value)
    setFilter(e.target.value)
  }

  function handleSortChange(e){
    console.log(e.target.value)
    setSort(e.target.value)
  }

  return (
    <div>
      <SearchBar onSortChange={handleSortChange} handleFilterChange={handleFilterChange}/>
      <div className="row">
        <div className="col-8">
          <StockContainer onClick = {handleBuy} stocks={handleFilter()}/>
        </div>
        <div className="col-4">
          <PortfolioContainer onClick={handleSell} portfolio={portfolio}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
