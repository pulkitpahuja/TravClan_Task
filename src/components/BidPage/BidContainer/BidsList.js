import React, { useState, useEffect, useContext } from 'react'
import classes from './BidsList.module.css'
import AuthContext from '../../../store/UserDataContext'
import { useParams } from "react-router-dom";
import BidsRow from './BidsRow/BidsRow';

const BidsList = props => {
    var { id } = useParams();
    const ctx = useContext(AuthContext)
    const [currUser, setCurrUser] = useState([])
    const [load, setLoad] = useState(true)
    const chunkifyArr = (data) => {
        let copy = [...data]
        const splittedArray = [];
        while (copy.length > 0) {
            splittedArray.push(copy.splice(0, 3));
        }

        return splittedArray
    }

    useEffect(() => {
        const data = ctx.userData;
        const index = data.findIndex(e => {
            return e.id === id;
        })
        setLoad(false)

        data[index] ? setCurrUser(data[index]) : setCurrUser([])
    }, [ctx, id])

    if (currUser.length === 0) {
        if (load) {
            return <h2 className={classes['bids-list__fallback']}>Loading...</h2>
        }
        return <h2 className={classes['bids-list__fallback']}>Found No Bids.</h2>
    }

    return (
        <div>
            <div className={classes["userInfoContainer"]}>

                <div className={classes["innerContainer"]}>
                    <h3 className={classes['bids-list__fallback']}>Name : </h3>
                    <h3 className={classes['bids-list__fallback']}>{currUser.firstname} {currUser.lastname}</h3>
                </div>
                <div className={classes["innerContainer"]}>
                    <h3 className={classes['bids-list__fallback']}>Phone Number : </h3>
                    <h3 className={classes['bids-list__fallback']}>{currUser.phone}</h3>
                </div>
                <div className={classes["innerContainer"]}>
                    <h3 className={classes['bids-list__fallback']}>Email : </h3>
                    <h3 className={classes['bids-list__fallback']}>{currUser.email}</h3>
                </div>
                <div className={classes["innerContainer"]}>
                    <h3 className={classes['bids-list__fallback']}>Total Bids : </h3>
                    <h3 className={classes['bids-list__fallback']}>{currUser.bids.length}</h3>
                </div>
            </div>
            <ul className={classes["bids-list"]}>
                {chunkifyArr(currUser.bids).map(bid => (<BidsRow key={Math.random()} bids={bid}></BidsRow>))}
            </ul>
        </div>
    )
}

export default BidsList
