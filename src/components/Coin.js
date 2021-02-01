import React, { Fragment } from "react";
import "../App.css";
import { Sparklines, SparklinesLine } from "react-sparklines";

const Coin = ({ name, price, marketcap, image, ath, priceChange, chart }) => {
    return (
        <Fragment>
            <tr className="coinTitle">
                <td>
                    <img src={image} className="coin-img" />
                </td>
                <td>
                    <h3>{name}</h3>
                </td>
                <td>
                    <p>${price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</p>
                </td>
                <td>${marketcap.toLocaleString()}</td>
                <td>+</td>
            </tr>

            <tr className="additionalCoinData">
                <th></th>
                <th>24h</th>
                <th>ATH</th>
                <th>7d Chart</th>
                <th></th>
            </tr>
            <tr className="additionalCoinData">
                <td></td>
                <td> {priceChange < 0 ? <p className="red">{priceChange.toFixed(2)}%</p> : <p className="green">{priceChange.toFixed(2)}%</p>}</td>
                <td>${ath.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</td>
                <td className="sparklineGraph">
                    <Sparklines data={chart}>
                        <SparklinesLine color="#66fcf1" />
                    </Sparklines>
                </td>
                <td></td>
            </tr>
        </Fragment>
    );
};

export default Coin;
