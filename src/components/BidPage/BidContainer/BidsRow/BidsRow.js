import React from 'react'
import classes from './BidsRow.module.css'
import BidItem from '../BidItem'

const BidsRow = props => {
    return (
        <div className={classes.BidsRow}>
            {props.bids.map(bid => (<BidItem item={bid} key={bid.id}></BidItem>))}
        </div>
    )
}

export default BidsRow
