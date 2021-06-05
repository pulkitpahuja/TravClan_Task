import React, { useContext } from 'react'
import AuthContext from '../../store/UserDataContext'
import Table from './Table/MainTable/Table'
import TopBar from './TopBar'
import classes from './HomePage.module.css'

const HomePage = () => {
    const ctx = useContext(AuthContext)
    console.log(ctx)
    return (
        <div style={{marginTop:'2.5rem'}}>
            <TopBar title="TravClan Task Assignment"/>
            <div className={classes.homepage__div}>
                <Table />
            </div>
        </div>
    )
}

export default HomePage
