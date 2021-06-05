import React from 'react'
import BidsList from './BidsList'

const BidContainer = props=> {
    return (
        <BidsList currUser={props.currUser}></BidsList>
    )
}

export default BidContainer
