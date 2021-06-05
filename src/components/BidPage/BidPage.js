import React, { useContext } from 'react'
import AuthContext from '../../store/UserDataContext'
import { useParams } from "react-router-dom";
import TopBar from '../HomePage/TopBar'
import BidContainer from './BidContainer/BidContainer'

const BidPage = () => {
    let { id } = useParams();
    return (
        <div>
            <TopBar title={`Bid Details Of UserID : ${id}`} />
            <BidContainer userid={id} />
        </div>
    )
}

export default BidPage
