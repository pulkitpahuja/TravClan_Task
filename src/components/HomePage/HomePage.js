import React from 'react'
import Table from './Table/MainTable/Table'
import TopBar from './TopBar'
import classes from './HomePage.module.css'

const HomePage = () => {
    return (
        <div style={{marginTop:'2.5rem'}}>
            <TopBar title="TravClan Task Assignment - Pulkit Pahuja"/>
            <div className={classes.homepage__div}>
                <Table />
            </div>
        </div>
    )
}

export default HomePage
