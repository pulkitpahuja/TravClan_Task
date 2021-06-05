import React, { useContext } from 'react'
import AuthContext from '../../store/UserDataContext'
import Tables from './Table/Tables'
import TopBar from './TopBar'
import classes from './HomePage.module.css'

const HomePage = () => {
    const ctx = useContext(AuthContext)
    console.log(ctx)
    return (
        <div>
            <TopBar title="TravClan Task Assignment"/>
            <div className={classes.homepage__div}>
                <Tables />
            </div>
        </div>


    )
}

export default HomePage
