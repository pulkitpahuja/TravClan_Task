import React, { useState, useEffect, useContext } from 'react'
import BidItem from './BidItem'
import classes from './BidsList.module.css'
import AuthContext from '../../../store/UserDataContext'
import { useParams } from "react-router-dom";

const BidsList = props => {
    var { id } = useParams();
    const ctx = useContext(AuthContext)
    const [currUser, setCurrUser] = useState([])
    useEffect(() => {
        const data = ctx.userData;
        const index = data.findIndex(e => {
            return e.id === id;
        })
        data[index] ? setCurrUser(data[index].bids) : setCurrUser([])
    }, [ctx,id])

    if (currUser.length === 0) {
        return <h2 className={classes['bids-list__fallback']}>Found No Bids.</h2>
    }

    return <ul className={classes["bids-list"]}>
        {currUser.map(bid => (<BidItem item={bid} key={bid.id}></BidItem>))}
    </ul>
}

export default BidsList
