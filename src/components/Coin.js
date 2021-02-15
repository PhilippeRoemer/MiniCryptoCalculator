import React, { Fragment, useState } from "react";
import "../App.css";
import { Sparklines, SparklinesLine } from "react-sparklines";

const Coin = ({ name, price, marketcap, image, ath, priceChange, chart, rank }) => {
    const [show, setShow] = useState(false);
    return (
        <Fragment>
            <tr className="coinTitle" onClick={() => setShow(!show)}>
                <td>
                    <img src={image} className="coin-img" />
                </td>
                <td>
                    <h3>{name}</h3>
                </td>
                <td>{priceChange < 0 ? <p className="red">${price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</p> : <p className="green">${price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</p>}</td>
                <td className="tdMktCp">${marketcap.toLocaleString()}</td>
            </tr>
            {show ? (
                <Fragment>
                    <tr className="additionalCoinData">
                        <th>Rank</th>
                        <th>24h</th>
                        <th>ATH</th>
                        <th>7d Chart</th>
                    </tr>

                    <tr className="additionalCoinData">
                        <td>{rank}</td>
                        <td> {priceChange < 0 ? <p className="red">{priceChange.toFixed(2)}%</p> : <p className="green">{priceChange.toFixed(2)}%</p>}</td>
                        <td>${ath.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</td>
                        <td className="sparklineGraph">
                            <Sparklines data={chart}>
                                <SparklinesLine color="#66fcf1" />
                            </Sparklines>
                        </td>
                    </tr>
                </Fragment>
            ) : null}
        </Fragment>
    );
};

export default Coin;
