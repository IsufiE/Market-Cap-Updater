import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // Create this file for styling
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const symbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "META"];

function App() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Fetch data with error handling
  const fetchStockData = async () => {
    setLoading(true);
    try {
      const results = await Promise.all(
        symbols.map(async (symbol) => {
          try {
            const res = await axios.get(`http://localhost:5000/api/stock/${symbol}`);
            return {
              ...res.data,
              symbol,
              price: res.data.price || 0,
              shares: res.data.shares || 0,
              marketCap: res.data.marketCap || 0
            };
          } catch (err) {
            console.error(`Error fetching ${symbol}:`, err);
            return null;
          }
        })
      );
      setStocks(results.filter(Boolean));
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Sorting functionality
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedStocks = React.useMemo(() => {
    if (!sortConfig.key) return stocks;
    
    return [...stocks].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [stocks, sortConfig]);

  // Auto-refresh
  useEffect(() => {
    fetchStockData();
    const interval = setInterval(fetchStockData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Formatting helpers
  const formatPrice = (price) => price ? `$${price.toFixed(2)}` : "N/A";
  const formatShares = (shares) => shares ? shares.toLocaleString() : "N/A";
  const formatMarketCap = (cap) => {
    if (!cap) return "N/A";
    return cap >= 1e12 
      ? `$${(cap / 1e12).toFixed(2)}T` 
      : `$${(cap / 1e9).toFixed(2)}B`;
  };

  // Stock detail modal
  const StockDetailModal = ({ stock, onClose }) => (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{stock.symbol} Details</h2>
        <div className="modal-grid">
          <div>
            <h3>Price</h3>
            <p>{formatPrice(stock.price)}</p>
          </div>
          <div>
            <h3>Shares Outstanding</h3>
            <p>{formatShares(stock.shares)}</p>
          </div>
          <div>
            <h3>Market Cap</h3>
            <p>{formatMarketCap(stock.marketCap)}</p>
          </div>
          <div>
            <h3>Last Updated</h3>
            <p>{new Date().toLocaleString()}</p>
          </div>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );

  return (
    <div className="app-container">
      <h1>Market Cap Tracker</h1>
      
      <div className="controls">
        <button 
          onClick={fetchStockData} 
          disabled={loading}
          className="refresh-button"
        >
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading && stocks.length === 0 ? (
        <div className="loading">Loading market data...</div>
      ) : (
        <div className="table-container">
          <table>  
            
          <thead>
              <tr>
                  <th onClick={() => requestSort("symbol")}>
                  Symbol{" "}
                  {sortConfig.key === "symbol" && (
                   sortConfig.direction === "asc" ? <FaArrowUp /> : <FaArrowDown />
                  )}
             </th>
    <th onClick={() => requestSort("price")}>
      Price{" "}
      {sortConfig.key === "price" && (
        sortConfig.direction === "asc" ? <FaArrowUp /> : <FaArrowDown />
      )}
    </th>
    <th onClick={() => requestSort("shares")}>
      Shares{" "}
      {sortConfig.key === "shares" && (
        sortConfig.direction === "asc" ? <FaArrowUp /> : <FaArrowDown />
      )}
    </th>
    <th onClick={() => requestSort("marketCap")}>
      Market Cap{" "}
      {sortConfig.key === "marketCap" && (
        sortConfig.direction === "asc" ? <FaArrowUp /> : <FaArrowDown />
      )}
    </th>
  </tr>
</thead>



            <tbody>
              {sortedStocks.map((stock) => (
                <tr 
                  key={stock.symbol} 
                  onClick={() => setSelectedStock(stock)}
                  className="clickable-row"
                >
                  <td>{stock.symbol}</td>
                  <td>{formatPrice(stock.price)}</td>
                  <td>{formatShares(stock.shares)}</td>
                  <td>{formatMarketCap(stock.marketCap)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedStock && (
        <StockDetailModal 
          stock={selectedStock} 
          onClose={() => setSelectedStock(null)} 
        />
      )}
    </div>
  );
}

export default App;