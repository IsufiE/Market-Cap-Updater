// src/StockCard.js
import React from "react";

function StockCard({ stock }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "10px",
      margin: "10px",
      borderRadius: "8px"
    }}>
      <h3>{stock.symbol}</h3>
      <p>Price: ${stock.price}</p>
      <p>Shares Outstanding: {stock.sharesOutstanding}</p>
      <p>Market Cap: ${stock.marketCap}</p>
    </div>
  );
}

export default StockCard;
