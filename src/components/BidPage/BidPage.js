import React from 'react'
import { useParams } from "react-router-dom";
import TopBar from '../HomePage/TopBar'
import BidContainer from './BidContainer/BidContainer'
import classes from './BidPage.module.css'

const BidPage = () => {
    console.log(classes.butt)
    let { id } = useParams();
    return (
        <div>
            <TopBar title={`Bid Details Of UserID : ${id}`} />
            <BidContainer userid={id} />

        </div >
    )
}

export default BidPage
