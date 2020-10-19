import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import * as moment from 'moment'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { green } from '@material-ui/core/colors';
const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
    active: {
        backgroundColor: '#eee',
        color: '#000'
    },
    complete: {
        backgroundColor: "#f50057",
        color: '#fff'
    }
  });
function TaskItem(props) {
    const classes = useStyles();

    const { item } = props
    const columns = [
        { field: 'name', headerName: 'Task name', width: 300, backgroundColor: 'red'},
        { field: 'priority', headerName: 'priority', width: 130 },
        { field: 'dueDate', headerName: 'Due Date', width: 130 },
        { field: 'status', headerName: 'Status', width: 130 },
      ];
    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);
    const StyledTableRow = withStyles((theme) => ({
        // root: {
        //   '&:nth-of-type(odd)': {
        //     backgroundColor: theme.palette.action.hover,
        //   },
        // },
      }))(TableRow);
     
    return (
        <React.Fragment>
            {
                item && item.length>0 &&
                <div style={{ height: 600, width: '100%', backgroundColor: "#fff" }}>
                    {/* <DataGrid  rows={item.map(t=>  ({...t, dueDate: moment(t.dueDate).format('YYYY-MM-DD'),status: t.isComplete === 0 ? 'Pending' : 'Completed'}))} style={{backgroundColor:'red'}} columns={columns} onRowClick={(e) => props.onTaskClick(e) }  /> */}
                    <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Task name</StyledTableCell>
                            <StyledTableCell align="right">Prority</StyledTableCell>
                            <StyledTableCell align="right">Due date</StyledTableCell>
                            <StyledTableCell align="right">Status</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {item.map((row,i) => (
                            <StyledTableRow key={i} className={row.isComplete===0? classes.active : classes.complete} onClick={()=>props.onTaskClick(row)}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.priority}</StyledTableCell>
                            <StyledTableCell align="right">{row.dueDate}</StyledTableCell>
                            <StyledTableCell align="right">{row.isComplete === 0 ? 'Active' : 'Completed'}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                </div>
            }
            
        </React.Fragment>
    )
}
TaskItem.defaultProps = {
    item: []
}
export default TaskItem
