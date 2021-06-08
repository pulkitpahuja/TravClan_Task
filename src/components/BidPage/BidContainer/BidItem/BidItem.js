import React from 'react'
import classes from './BidItem.module.css'

const BidItem = (props) => {
    var d = new Date(parseInt(props.item.created));
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    return (
        <li>
            <div className={classes['bid-item']}>
                <div className={classes['bid-item__description']}>
                    <h2>Bid Name : {capitalizeFirstLetter(props.item.carTitle)}</h2>
                    <h3>Created : {d.toLocaleString()}</h3>
                </div>
                <div className={classes['bid-item__price']}>Amount : ₹{props.item.amount}</div>
            </div>
        </li>
    )
}

export default BidItem
