import React from "react";

const Coin = ({ name, price, marketcap, image }) => {
    return (
        <tr>
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
        </tr>
    );
};

export default Coin;
