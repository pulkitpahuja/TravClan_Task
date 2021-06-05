import React, { useContext } from 'react'
import AuthContext from '../../store/UserDataContext'
import { useParams } from "react-router-dom";
const BidPage = () => {
    let { id } = useParams();
    const ctx = useContext(AuthContext)

    return (
        <div>

        </div>
    )
}

export default BidPage
