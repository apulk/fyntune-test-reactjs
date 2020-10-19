import React, {  lazy, useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Grid } from '@material-ui/core';

const TaskItem = lazy(()=> import('./TaskItem'))

 
const useStyles = makeStyles({
    root: {
        maxWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const TaskLists = (props) => {
    const classes = useStyles();
    const { tasks, onTaskClick } = props
    const [ items, setItems ] = useState([])
    const [ filter, setFilter ] = useState('all')
    const filterTask = (type) => {
        if(type === "active")
        setItems(tasks.filter(d=> { 
           return d.isComplete===0
        }))
        else if(type==="complete")
        setItems(tasks.filter(d=> {
            return d.isComplete===1
        }))
        else 
            setItems(tasks)
        setFilter(type)
    }
    useEffect(()=>{
        filterTask(filter)
    },[tasks])
    return (
        <React.Fragment>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Tasks
            </Typography>
            <Grid xs="12" md="4" lg="4">
            <FormControl variant="outlined" className={classes.pos} fullWidth>
                <InputLabel id="task-label">Filter by: </InputLabel>
                <Select
                    labelId="task-label"
                    id="task"
                    name="task"
                    onChange={(e)=> filterTask(e.target.value)}
                    label="Filter by"
                    defaultValue={filter}
                    value={filter}
                >
                    <MenuItem value={"active"}>Active Tasks</MenuItem>
                    <MenuItem value={"complete"}>Completed Tasks</MenuItem>
                    <MenuItem value={"all"}>All</MenuItem>
                </Select>
            </FormControl>
            </Grid>
            <TaskItem item={items && items} onTaskClick={onTaskClick}/>
        </React.Fragment>
    )
}
TaskLists.defaultProps = {
    tasks: []
}
export default TaskLists