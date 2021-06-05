import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../../store/UserDataContext'
import { useHistory } from "react-router-dom";

import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';

import CircularProgress from '@material-ui/core/CircularProgress';
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headers = [
  { id: 'cust_name', sortable: false, numeric: false, disablePadding: false, label: 'Customer' },
  { id: 'email', sortable: false, numeric: false, disablePadding: false, label: 'Email' },
  { id: 'phone', sortable: false, numeric: false, disablePadding: false, label: 'Phone' },
  { id: 'premium', sortable: false, numeric: false, disablePadding: false, label: 'Premium ?' },
  { id: 'bidVal', sortable: true, numeric: true, disablePadding: false, label: 'Bid Value (Max/min)' },
  { id: 'check', sortable: false, numeric: false, disablePadding: false, label: 'Toggle Max/Min' }
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headers.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}>

            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  return (
    <Toolbar >
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        User Bidding
        </Typography>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableRow: {
    cursor: 'pointer',
    textDecoration: 'none'
  },
  tableCellImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%'
  }

}));

const EnhancedTable = () => {
  const ctx = useContext(AuthContext)
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowsChecked, setRowsChecked] = useState([])
  let history = useHistory();

  const createData = (data) => {
    const bids = data.bids.map(e => e.amount);
    let max = bids.length === 0 ? '-' : Math.max(...bids)
    let min = bids.length === 0 ? '-' : Math.min(...bids)
    let index = rowsChecked.findIndex((e) => {
      return e.id === data.id
    })
    return {
      id: data.id,
      imageURL: data.avatarUrl,
      name: data.firstname + " " + data.lastname,
      phone: data.phone,
      premium: data.hasPremium ? "Yes" : "No",
      bid: rowsChecked.length !== 0 ? (rowsChecked[index].max ? max : min) : max,
      email: data.email
    };
  }
  const rows = ctx.userData.map((e) => createData(e));

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            {ctx.isLoading && <TableBody>
              <TableRow>
                <TableCell>
                  <CircularProgress align="center" />
                </TableCell>
              </TableRow>
            </TableBody>}
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      className={classes.tableRow}
                      key={row.id}
                      hover
                      component='a'
                      role="checkbox"
                      onClick={(event) => handleClick(event, row.id)}
                      tabIndex={-1}
                    >
                      <TableCell id={labelId} scope="row" padding="default">
                        <div>
                          <img className={classes.tableCellImage} src={row.imageURL} alt='avatar' />
                          {row.name}
                        </div>
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell align="left">{row.phone}</TableCell>
                      <TableCell align="left">{row.premium}</TableCell>
                      <TableCell align="right">
                        {row.bid}
                      </TableCell>
                      <TableCell>
                        <Switch />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
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

export default EnhancedTable;