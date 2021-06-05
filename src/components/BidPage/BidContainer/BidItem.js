import React from 'react'
import classes from './BidItem.module.css'
import Card from '../../UI/Card'

const BidItem = (props) => {
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(props.item.created);
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    return (
        <li>
            <div className={classes['bid-item']}>
                <div className={classes['bid-item__description']}>
                    <h2>Car Name : {capitalizeFirstLetter(props.item.carTitle)}</h2>
                    <h3>Created : {d.toLocaleString()}</h3>
                </div>
                <div className={classes['bid-item__price']}>Amount : ₹{props.item.amount}</div>
            </div>
        </li>
    )
}

export default BidItem
