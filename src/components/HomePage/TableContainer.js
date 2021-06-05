import React from 'react'
import Paper from '@material-ui/core/Paper';

const TableContainer = props => {
    return (
        <Paper elevation={0} >
            {props.children}
        </Paper>

    )
}

export default TableContainer
