import React from 'react'
import classes from './BidItem.module.css'
import Card from '../../UI/Card'

const BidItem = (props) => {
    const date = new Date(props.item.created*1000)
    return (
        <li>
            <Card className={classes['bid-item']}>
                <div className={classes['bid-item__description']}>
                    <h2>Car Name : {props.item.carTitle}</h2>
                    <h3>{date.toLocaleString()}</h3>
                </div>
                <div className={classes['bid-item__price']}>₹{props.item.amount}</div>
            </Card>
        </li>
    )
}

export default BidItem
