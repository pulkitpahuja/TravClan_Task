import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../../../store/UserDataContext'
import { useHistory } from "react-router-dom";
import TableHeader from '../TableHeader/TableHeader'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableToolbar from '../TableToolbar/TableToolbar'
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import classes from './Tables.module.css'

function compareValues(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getCompareType(order, orderBy) {
  return order === 'desc'
    ? (a, b) => compareValues(a, b, orderBy)
    : (a, b) => -compareValues(a, b, orderBy);
}

function sortArray(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headers = [
  { id: 'cust_name', sortable: false, disablePadding: false, label: 'Customer' },
  { id: 'email', sortable: false, disablePadding: false, label: 'Email' },
  { id: 'phone', sortable: false, disablePadding: false, label: 'Phone' },
  { id: 'premium', sortable: false, disablePadding: false, label: 'Premium ?' },
  { id: 'bidVal', sortable: true, disablePadding: false, label: 'Bid Value (Max/min)' },
  { id: 'check', sortable: false, disablePadding: false, label: 'Toggle Max/Min' }
];

const UserTable = () => {
  const ctx = useContext(AuthContext)
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('cal');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([])
  const [checked, setChecked] = useState([])
  let history = useHistory();

  useEffect(() => {
    const y = ctx.userData.map((data) => {
      return { id: data.id, max: true }
    })
    setChecked(y)
  }, [ctx.userData])

  useEffect(() => {
    const x = ctx.userData.map((data) => {
      const bids = data.bids.map(e => e.amount);
      let max = bids.length === 0 ? '' : Math.max(...bids)
      let min = bids.length === 0 ? '' : Math.min(...bids)
      const index = checked.findIndex(e => {
        return data.id === e.id
      })
      return {
        id: data.id,
        imageURL: data.avatarUrl,
        name: data.firstname + " " + data.lastname,
        phone: data.phone,
        premium: data.hasPremium ? "Yes" : "No",
        bidVal: checked.length !== 0 ? checked[index].max ? max : min : max,
        email: data.email
      };
    });
    setRows(x)

  }, [checked, ctx.userData])

  const getIndex = (id) => {
    const index = checked.findIndex(e => {
      return id === e.id
    })
    return checked[index].max
  }

  const changeBidHandler = (event, id, x) => {

    event.stopPropagation()
    let data = [...checked]
    const index = data.findIndex(e => {
      return id === e.id
    })
    data[index].max = !data[index].max
    setChecked(data)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
    history.push(`/user/bids/${id}`)

  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>

      <Paper className={classes.paper}>
        <TableToolbar />

        <TableContainer>
          {ctx.isLoading && <CircularProgress className={classes.progress} />}
          <Table
            stickyHeader
            className={classes.Table}
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table"
          >
            <TableHeader
              classes={classes}
              order={order}
              orderBy={orderBy}
              headers={headers}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />

            <TableBody>
              {sortArray(rows, getCompareType(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      className={classes.tableRow}
                      key={row.id}
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      tabIndex={-1}
                    >
                      <TableCell id={labelId} scope="row" padding="default">
                        <div className={classes.tableCellContainer}>
                          <Avatar src={row.imageURL} alt='avatar' />
                          <p className={classes.text}>{row.name}</p>
                        </div>
                      </TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.phone}</TableCell>
                      <TableCell align="left">{row.premium}</TableCell>
                      <TableCell align="left">
                        {row.bidVal}
                      </TableCell>
                      <TableCell align="center" scope="row">
                        <div className={classes.tableCellContainer}>
                          <b style={{ marginTop: '8px' }}>Max</b>
                          <Switch checked={!getIndex(row.id)} onClick={(e) => {
                            changeBidHandler(e, row.id, index)
                          }} />
                          <b style={{ marginTop: '8px' }}>Min</b>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}

            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default UserTable;