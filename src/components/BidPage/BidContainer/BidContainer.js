import React from 'react'
import BidsList from './BidsList'
import classes from './BidContainer.module.css'
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

const BidContainer = props => {
    let history = useHistory();

    const goBackHandler = () => {
        history.push('/')
    }
    return (
        <div className={classes.outer}>
            <div className={classes.buttContainer}>
                <Button align='center' onClick={goBackHandler} variant="contained" color="primary">
                    Go Back
                </Button>
            </div>
            <BidsList />
        </div>
    )
}

export default BidContainer
