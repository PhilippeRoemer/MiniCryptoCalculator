import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Logo from "./CC_Logo.png";
import Coin from "./components/Coin";
import "./App.css";

function App() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        axios
            .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=bitcoin%2C%20ethereum%2C%20iota%2C%20xrp%2C%20litecoin%2C%20monero%2C%20stellar%2C%20nano%2C%20chainlink&order=market_cap_desc&per_page=50&page=1&sparkline=true")
            .then((res) => {
                setCoins(res.data);
                console.log(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    function generateMktCap() {
        //Generates the marketcap based off the price entered
        //Market Cap = Circulating Supply * Price
        const index = document.getElementById("crypto").selectedIndex;
        const coinData = document.getElementById("crypto").options;
        const coinPrice = document.getElementById("price").value;
        const circulatingSupply = coinData[index].dataset.circulatingsupply;
        const generatedMarketCap = coinPrice * circulatingSupply;

        if (index <= 0) {
            alert("Please select a cryptocurreny");
        } else {
            document.getElementById("MktCapTotal").innerHTML = "$" + generatedMarketCap.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }
    }

    function generateCurrentPrice() {
        //Generates the current coin value
        //Total Current Price = Quantity * Current Price
        const index = document.getElementById("crypto").selectedIndex;
        const coinData = document.getElementById("crypto").options;
        const currentPrice = document.getElementById("crypto").value;
        const quantity = document.getElementById("cryptoAmount").value;
        const coinPriceTotal = currentPrice * quantity;

        if (index <= 0) {
            alert("Please select a cryptocurreny");
        } else {
            document.getElementById("CoinPriceTotal").innerHTML = "$" + coinPriceTotal.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }
    }

    function generateATH() {
        //Generates the current ATH value
        //Total Current Price = Quantity * ATH
        const index = document.getElementById("crypto").selectedIndex;
        const coinData = document.getElementById("crypto").options;
        const quantity = document.getElementById("cryptoAmountATH").value;
        const coinATH = coinData[index].dataset.ath;
        const coinATHtotal = coinATH * quantity;

        if (index <= 0) {
            alert("Please select a cryptocurreny");
        } else {
            document.getElementById("CoinATHtotal").innerHTML = "$" + coinATHtotal.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }
    }

    return (
        <div className="container">
            <img src={Logo} class="logo" />
            <h1 className="title">Current Crypto Market</h1>
            <br></br>
            {/* Coin Table */}
            <table>
                <tr>
                    <th></th>
                    <th>Coin</th>
                    <th>Current Price</th>
                    <th>Market Cap</th>
                </tr>
                {coins.map((coin) => {
                    return <Coin name={coin.name} price={coin.current_price} marketcap={coin.market_cap} image={coin.image} priceChange={coin.price_change_percentage_24h} ath={coin.ath} chart={coin.sparkline_in_7d.price} />;
                })}
            </table>

            {/* Select a coin */}
            <select id="crypto" className="selectCrypto">
                <option disabled selected value>
                    {" "}
                    -- select a coin --{" "}
                </option>
                {coins.map((post) => (
                    <option
                        value={post.current_price}
                        data-circulatingsupply={post.circulating_supply}
                        data-ath={post.ath}
                        data-athdate={post.ath_date}
                        data-coinimage={post.image}
                        data-marketcap={post.market_cap}
                        data-pricechange={post.price_change_24h}
                        data-pricechangepercent={post.price_change_percentage_24h}
                    >
                        {post.name}
                    </option>
                ))}
            </select>
            {/* Radio Buttons */}
            <div>
                <input type="radio" value="Male" name="gender" /> Market Cap
                <input type="radio" value="Female" name="gender" /> Coin Value
                <input type="radio" value="Other" name="gender" /> ATH
            </div>
            {/* Market Cap Div */}
            <h2 className="title">Calculate the Market Cap</h2>
            <div className="marketCapDiv">
                <label for="Price">Price: </label>
                <input type="text" className="marketCapInput" name="Price" placeholder="Insert Price" id="price" onChange={generateMktCap} />
                <p className="marketCapInput2">X Circulating Supply</p>
                <p className="bold">
                    Market Cap ={" "}
                    <span id="MktCapTotal" className="highlight">
                        $0.00
                    </span>
                </p>
            </div>
            {/* Coin Price Div */}
            <h2 className="title">Calculate the Coin Value</h2>
            <div className="coinPriceDiv">
                <label for="Quantity">Quantity: </label>
                <input type="text" className="coinAmountInput" name="Quantity" placeholder="Crypto Amount" id="cryptoAmount" onChange={generateCurrentPrice} />
                <p className="coinAmountInput2">X Current Price</p>
                <p className="bold">
                    Coin Value ={" "}
                    <span id="CoinPriceTotal" className="highlight">
                        $0.00
                    </span>
                </p>
            </div>
            {/* ATH Div */}
            <h2 className="title">Calculate the ATH Value</h2>
            <div className="coinPriceDiv">
                <label for="QuantityATH">Quantity: </label>
                <input type="text" className="coinAmountInput" name="QuantityATH" placeholder="Crypto Amount" id="cryptoAmountATH" onChange={generateATH} />
                <p className="coinAmountInput2">X ATH</p>
                <p className="bold">
                    ATH Value ={" "}
                    <span id="CoinATHtotal" className="highlight">
                        $0.00
                    </span>
                </p>
            </div>
        </div>
    );
}

export default App;
