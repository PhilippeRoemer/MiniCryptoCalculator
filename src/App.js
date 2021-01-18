import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        axios
            .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=bitcoin%2C%20ethereum%2C%20iota%2C%20xrp%2C%20litecoin%2C%20monero%2C%20stellar%2C%20nano%2C%20chainlink&order=market_cap_desc&per_page=50&page=1&sparkline=false")
            .then((res) => {
                setCoins(res.data);
                console.log(res.data);
            })
            .catch((error) => console.log(error));
    }, []);

    function radioChecked() {
        //Displays div depending on which option is slected
    }

    function generateMktCap() {
        //Generates the marketcap based off the price entered
        //Market Cap = Circulating Supply * Price
    }

    function generateCurrentPrice() {
        //Generates the current value of the amount of coins entered
        //Total Current Price = Quantity * Current Price
    }

    function currentCoinInfo() {
        //Displays the current coin market price
        const index = document.getElementById("crypto").selectedIndex;
        const coinData = document.getElementById("crypto").options;
        const currentPrice = document.getElementById("crypto").value;

        const athValue = coinData[index].dataset.ath;
        const marketCap = coinData[index].dataset.marketcap;
        const coinImage = coinData[index].dataset.coinimage;
        const coinName = coinData[index].text;

        document.getElementById("coinInfoTitle").innerHTML = "Current Crypto Info";
        document.getElementById("coinInfoHeaders").innerHTML = "<th></th><th>Coin</th><th>Current Price</th><th>24H Change</th><th>ATH</th>        <th>Market Cap</th>";
        document.getElementById("coinInfoData").innerHTML = "<td><img src=" + coinImage + "/>   </td><td>" + coinName + "</td><td>" + currentPrice + "</td><td>" + athValue + "</td><td>" + athValue + "</td><td>" + marketCap + "</td>";
    }

    return (
        <div className="App">
            <p>Select a cryptocurrency</p>
            <select id="crypto" className="cryptoCurrency" onChange={currentCoinInfo}>
                <option disabled selected value>
                    {" "}
                    -- select a coin --{" "}
                </option>
                {coins.map((post) => (
                    <option value={post.current_price} data-ath={post.ath} data-athdate={post.ath_date} data-coinimage={post.image} data-marketcap={post.market_cap} data-pricechange={post.price_change_24h} data-pricechangepercent={post.price_change_percentage_24h}>
                        {post.name}
                    </option>
                ))}
            </select>

            {/* Radio Buttons */}
            <form name="coinCalcForm">
                <input type="radio" name="coinCalc" onclick={radioChecked} value="MarketCap" id="MktCapButton" />
                Market Cap <br />
                <input type="radio" name="coinCalc" onclick={radioChecked} value="CurrentPrice" id="ATHButton" />
                Coin Price
            </form>

            {/* Market Cap Div -- Add display none style until radio button checked*/}
            <div name="coinCalcForm" id="MarketCapDiv">
                <h2>Market Cap</h2>
                <input type="text" placeholder="Price" id="price" />
                <input type="submit" value="Submit" onclick={generateMktCap} />
                <p>
                    At ___, the crypto market cap for ___ would be ___ <span id="MktCapTotal"></span>
                </p>
            </div>

            {/* Coin Price Dive -- Add display none style until radio button checked*/}
            <div name="coinCalcForm" id="ATHdiv">
                <h2>Coin Price</h2>
                <input type="text" placeholder="Crypto Amount" />
                <input type="submit" value="Submit" onclick={generateCurrentPrice} />
                <p>
                    The current price of ___ ___ is ___ <span id="CoinPriceTotal"></span>
                </p>
            </div>
            <div>
                <h1 id="coinInfoTitle"></h1>
                <table>
                    <tr id="coinInfoHeaders"></tr>
                    <tr id="coinInfoData"></tr>
                </table>
            </div>
        </div>
    );
}

export default App;
