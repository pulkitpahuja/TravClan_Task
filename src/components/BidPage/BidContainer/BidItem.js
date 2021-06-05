import React from 'react'
import classes from './BidItem.module.css'
import Card from '../../UI/Card'

const BidItem = (props) => {
    var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(props.item.created);
    return (
        <li>
            <Card className={classes['bid-item']}>
                <div className={classes['bid-item__description']}>
                    <h2>Car Name : {props.item.carTitle}</h2>
                    <h3>Created : {d.toLocaleDateString()}</h3>
                </div>
                <div className={classes['bid-item__price']}>₹{props.item.amount}</div>
            </Card>
        </li>
    )
}

export default BidItem
