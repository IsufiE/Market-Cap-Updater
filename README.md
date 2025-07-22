# 📈 Market Cap Updater

A clean, beginner-friendly stock tracker app built with **React** and **Node.js/Express**. You can look up stock symbols like AAPL, GOOGL, MSFT and see current prices, basic info, and (when available) market cap and outstanding shares.

> ⚠️ Heads up: Free APIs like Yahoo Finance don’t always provide full data — things like **market cap** and **shares outstanding** may show as _N/A_. This is a known limitation and happens due to rate limits or missing data on the free tier.

---

## 🚀 Features

- 💲 View current price, currency, and basic stats
- 🔁 Live Data
- 🔼 Sortable table by symbol and price
- ✨ Clean, modern UI

🧪 **Coming soon:** I plan to add a **visual graph** showing recent stock price trends!

---

## 🛠️ Tech Stack

- **Frontend:** React, Axios
- **Backend:** Node.js, Express
- **Styling:** Custom CSS (no frameworks yet)

---

## 🔍 About the Market Cap + Shares Data

Due to how Yahoo Finance’s public API works:

- `marketCap` and `sharesOutstanding` might not always be available  
- You may get `401` or `Too many requests` errors after frequent usage  
- This app estimates market cap from `price * shares` if the raw `marketCap` field is missing (when possible)

If you need more consistent and accurate financial data (including reliable access to market cap and outstanding shares), you'll need to use a paid API service such as:

- [Alpha Vantage](https://www.alphavantage.co)  
- [IEX Cloud](https://iexcloud.io)  
- [Polygon.io](https://polygon.io)
-
-
-
- <img width="1914" height="949" alt="Screenshot 2025-07-22 015919" src="https://github.com/user-attachments/assets/e8b7209f-4282-424a-87d9-8c37e359f0ff" />




