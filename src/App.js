import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Logo from "./CC_Logo.png";
import Coin from "./components/Coin";
import "./App.css";
import "./bootstrap-grid.css";

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
        const coinPrice = document.getElementById("MktCapPrice").value;
        const circulatingSupply = coinData[index].dataset.circulatingsupply;
        const generatedMarketCap = coinPrice * circulatingSupply;

        if (index <= 0) {
            alert("Please select a cryptocurreny");
        } else {
            document.getElementById("MktCapTotal").value = generatedMarketCap.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }
    }

    function generateMktCapPrice() {
        //Generates the price based off the market cap entered
        //Price = Market Cap / Circulating Supply
        const index = document.getElementById("crypto").selectedIndex;
        const coinData = document.getElementById("crypto").options;
        const mktCap = document.getElementById("MktCapTotal").value;
        const circulatingSupply = coinData[index].dataset.circulatingsupply;
        const generatedMarketCapPrice = mktCap / circulatingSupply;

        if (index <= 0) {
            alert("Please select a cryptocurreny");
        } else {
            document.getElementById("MktCapPrice").value = generatedMarketCapPrice.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }
    }

    function generateCurrentPrice() {
        //Generates the current coin USD value
        //Total Current Price = Quantity * Current Price
        const index = document.getElementById("crypto").selectedIndex;
        const currentPrice = document.getElementById("crypto").value;
        const quantity = document.getElementById("cryptoAmount").value;
        const coinPriceTotal = currentPrice * quantity;

        if (index <= 0) {
            alert("Please select a cryptocurreny");
        } else {
            document.getElementById("CoinPriceTotal").value = coinPriceTotal.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }
    }

    function generateUSDValue() {
        //Generates the amount of coins based on the USD value entered
        //Amount = Quantity / Current Price
        const index = document.getElementById("crypto").selectedIndex;
        const currentPrice = document.getElementById("crypto").value;
        const quantity = document.getElementById("CoinPriceTotal").value;
        const coinAmount = quantity / currentPrice;

        if (index <= 0) {
            alert("Please select a cryptocurreny");
        } else {
            document.getElementById("cryptoAmount").value = coinAmount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
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

    function radioChecked() {
        //Displays the selected div based on the radio option that's selected
        //TODO: Simplify function
        const MktCapBtn = document.getElementById("MktCapButton");
        const ValueBtn = document.getElementById("ValueButton");
        const ATHBtn = document.getElementById("ATHButton");
        if (MktCapBtn.checked) {
            document.getElementById("marketCapShowDiv").style.display = "block";
            document.getElementById("valueShowDiv").style.display = "none";
            document.getElementById("ATHShowDiv").style.display = "none";
        } else if (ValueBtn.checked) {
            document.getElementById("marketCapShowDiv").style.display = "none";
            document.getElementById("valueShowDiv").style.display = "block";
            document.getElementById("ATHShowDiv").style.display = "none";
        } else if (ATHBtn.checked) {
            document.getElementById("marketCapShowDiv").style.display = "none";
            document.getElementById("valueShowDiv").style.display = "none";
            document.getElementById("ATHShowDiv").style.display = "block";
        }
    }
    function fieldReset() {
        //Resets field values when a new dropdown option is selected
        document.getElementById("MktCapPrice").value = "";
        document.getElementById("MktCapTotal").value = "";
        document.getElementById("cryptoAmount").value = "";
        document.getElementById("CoinPriceTotal").value = "";
        document.getElementById("cryptoAmountATH").value = "";
    }

    function radioLoad() {
        //Displays hidden div on load and becomes hidden once a coin option is selected
        document.getElementById("marketCapShowDiv").style.display = "block";
    }

    return (
        <div className="container" onLoad={radioLoad}>
            <img src={Logo} class="logo" />
            {/* Select a coin */}
            <select id="crypto" className="selectCrypto" onChange={fieldReset}>
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
            {/* Radio Button Options */}
            <div className="row">
                <div className="col textCenter">
                    <input type="radio" name="calcOption" onClick={radioChecked} id="MktCapButton" />
                    <label for="MktCapButton">Market Cap</label>
                </div>
                <div className="col textCenter">
                    <input type="radio" name="calcOption" onClick={radioChecked} id="ValueButton" />
                    <label for="ValueButton">Coin Value</label>
                </div>
                <div className="col textCenter">
                    <input type="radio" name="calcOption" onClick={radioChecked} id="ATHButton" />
                    <label for="ATHButton">ATH</label>
                </div>
            </div>
            {/* Market Cap Div */}
            {/* TODO: Add function to automatically add commas inside input field */}
            <div id="marketCapShowDiv" className="hide calcDiv">
                <h2 className="title">Calculate the Market Cap</h2>
                <div className="row">
                    <div className="col textCenter">
                        <h3>Price (USD)</h3>
                    </div>
                    <div className="col textCenter">
                        <h3>Market Cap (USD)</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col textCenter">
                        <input type="text" className="coinInputField" placeholder="Crypto Price" id="MktCapPrice" onChange={generateMktCap} />
                    </div>
                    <div className="col textCenter">
                        <input type="text" className="coinInputField" placeholder="Market Cap" id="MktCapTotal" onChange={generateMktCapPrice} />
                    </div>
                </div>
            </div>
            {/* Coin Value Div */}
            <div id="valueShowDiv" className="hide calcDiv">
                <h2 className="title">Calculate the Coin Value</h2>
                <div className="row">
                    <div className="col textCenter">
                        <h3>Quantity</h3>
                    </div>
                    <div className="col textCenter">
                        <h3>Value (USD)</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col textCenter">
                        <input type="text" className="coinInputField" placeholder="Crypto Amount" id="cryptoAmount" onChange={generateCurrentPrice} />
                    </div>
                    <div className="col textCenter">
                        {" "}
                        <input type="text" className="coinInputField" placeholder="Value" id="CoinPriceTotal" onChange={generateUSDValue} />
                    </div>
                </div>
            </div>
            {/* ATH Div */}
            <div id="ATHShowDiv" className="hide calcDiv">
                <h2 className="title">Calculate the ATH Value</h2>
                <div className="row">
                    <div className="col textCenter">
                        <h3>Quantity</h3>
                    </div>
                    <div className="col textCenter">
                        <h3>ATH Value</h3>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col textCenter">
                        <input type="text" className="coinInputField" name="QuantityATH" placeholder="Crypto Amount" id="cryptoAmountATH" onChange={generateATH} />
                    </div>{" "}
                    <div className="col textCenter">
                        <span id="CoinATHtotal" className="highlight">
                            $0.00
                        </span>
                    </div>
                </div>
            </div>
            <br></br>
            <h2 className="title">Current Crypto Market</h2>
            {/* Coin Table */}
            {/* TODO: Convert Table into responsive bootstrap rows */}
            <table>
                <tr>
                    <th></th>
                    <th>Coin</th>
                    <th>Current Price</th>
                    <th>Market Cap</th>
                </tr>
                {coins.map((coin) => {
                    return <Coin name={coin.name} price={coin.current_price} marketcap={coin.market_cap} image={coin.image} priceChange={coin.price_change_percentage_24h} ath={coin.ath} chart={coin.sparkline_in_7d.price} rank={coin.market_cap_rank} />;
                })}
            </table>
            <br></br>
        </div>
    );
}

export default App;
