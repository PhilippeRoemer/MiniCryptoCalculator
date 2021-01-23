import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Logo from "./CC_Logo.png";
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
        //Generates the current value of the amount of coins entered
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

    function currentCoinInfo() {
        //Displays the current coin market price
        const index = document.getElementById("crypto").selectedIndex;
        const coinData = document.getElementById("crypto").options;
        const currentPrice = document.getElementById("crypto").value * 1;
        const athValue = coinData[index].dataset.ath * 1;
        const marketCap = coinData[index].dataset.marketcap * 1;
        const coinImage = coinData[index].dataset.coinimage;
        const coinName = coinData[index].text;
        const coinName2 = coinData[index].text;

        document.getElementById("coinInfoHeaders").innerHTML = "<th></th><th>Coin</th><th>Current Price</th><th>ATH</th><th>Market Cap</th>";
        document.getElementById("coinInfoData").innerHTML = "<td><img class='coinImg' src='" + coinImage + "'/>   </td><td>" + coinName + "</td><td>$" + currentPrice.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "</td><td>$" + athValue.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "</td><td>$" + marketCap.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "</td>";
        document.getElementById("coinName").innerHTML = coinName;
        document.getElementById("coinName2").innerHTML = coinName2;
    }

    return (
        <div className="container">
            <img src={Logo} class="logo" />
            <div className="selectCryptoTitle">
                <select id="crypto" className="selectCrypto" onChange={currentCoinInfo}>
                    <option disabled selected value>
                        {" "}
                        -- select a coin --{" "}
                    </option>
                    {coins.map((post) => (
                        <option value={post.current_price} data-circulatingsupply={post.circulating_supply} data-ath={post.ath} data-athdate={post.ath_date} data-coinimage={post.image} data-marketcap={post.market_cap} data-pricechange={post.price_change_24h} data-pricechangepercent={post.price_change_percentage_24h}>
                            {post.name}
                        </option>
                    ))}
                </select>
            </div>
            <br></br>
            <div>
                <table>
                    <tr id="coinInfoHeaders">
                        <th></th>
                        <th>Coin</th>
                        <th>Current Price</th>
                        <th>ATH</th> <th>Market Cap</th>
                    </tr>
                    <tr id="coinInfoData">
                        <td></td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                </table>
            </div>
            {/* Market Cap Div */}
            <div className="marketCapDiv">
                <p>
                    If{" "}
                    <span id="coinName" className="highlight">
                        ---
                    </span>{" "}
                    is $<input type="text" className="marketCapInput" placeholder="Insert Price" id="price" onChange={generateMktCap} /> the crypto market cap would be{" "}
                    <span id="MktCapTotal" className="highlight">
                        $0.00
                    </span>
                </p>
            </div>
            {/* Coin Price Div */}
            <div className="coinPriceDiv">
                <p>
                    <input type="text" className="coinAmountInput" placeholder="Crypto Amount" id="cryptoAmount" onChange={generateCurrentPrice} />{" "}
                    <span id="coinName2" className="highlight">
                        {" "}
                        ---{" "}
                    </span>{" "}
                    is currently worth{" "}
                    <span id="CoinPriceTotal" className="highlight">
                        {" "}
                        $0.00{" "}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default App;
