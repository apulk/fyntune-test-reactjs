import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Drawer from '@material-ui/core/Drawer';
import { Button } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { Publish } from '@material-ui/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { createTasks, getAllTasks, updateOnTask } from '../../containers/dashboard/action'
import * as moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import ArchiveIcon from '@material-ui/icons/Archive';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
    },
    pos: {
        marginBottom: theme.spacing(2)
    },
    mg2: {
        marginLeft: theme.spacing(1)
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    fileDefault: {
        display: 'inline-block',
        width: '100%',
        padding: '120px 0 0 0',
        height: '100px',
        overflow: 'hidden',
        boxSizing: 'border-box',
        background: "url('https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png') center center no-repeat #e4e4e4",
        borderRadius: '20px',
        backgroundSize: '60px 60px'
    }
}));
const TaskDrawer = (props) => {
    // let todayDate = new Date()
    const classes = useStyles();
    const { className, toggleDrawer, taskDrawer, item } = props
    const [ fileState, setFileState ] = useState([])
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: item?.name || "",
            description: item.description,
            dueDate: item.dueDate ? moment(item.dueDate).format('YYYY-MM-DD') : '',
            priority: item.priority,
            userId: item.userId,
            isComplete: item?.isComplete || 0
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(6, 'Must be minimum 6 characters')
                .required('Required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            values.files = fileState
            values.id = item.id ? item.id : uuidv4()
            console.log(values)
            props.createTasks(values, item.id)
            await resetForm()
            props.clearItem()
            await props.toggleDrawer(false)
        },
    });
    //Delete,complete,archive a task
    const actionOnTask = (type) => {
        props.updateOnTask(type, item, item.id)
        props.clearItem()
    }
    
   
    return (
        <Drawer
            className=""
            anchor={"right"}
            open={taskDrawer}
            onClose={toggleDrawer(false)}
        >
            <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                <div className={className} style={{ position: 'relative' }}>
                    {
                        item && item.isArchive === 1 ? '' :
                            <div className="" style={{ padding: '0px 20px 20px' }} >
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="center"
                                >
                                    {
                                        item && item.id && <Chip deleteIcon={<DoneIcon />} label="Mark Complete" color={item.isComplete === 0 ? "default" : "secondary"} onClick={() => actionOnTask('COMPLETE')} />
                                    }
                                    <Grid
                                        direction="row"
                                        justify="space-between"
                                        alignItems="center"
                                        justify="center" style={{ display: 'flex' }}>
                                        {
                                            item && item.id &&
                                            <>
                                                <DeleteIcon onClick={() => actionOnTask('DELETE')} className={classes.mg2} color="light" />
                                            </>
                                        }
                                        <Button variant="contained" type="submit" className={classes.mg2} color="primary">Submit</Button>
                                        {
                                            item && item.id &&
                                            <Link variant="outlined"   to={{
                                                pathname: "/pdf/"+item.id,
                                                 
                                                state: { item: item }
                                              }} className={classes.mg2} color="primary"   >Download pdf</Link>

                                        }
                                    </Grid>
                                </Grid>
                            </div>
                    }

                    <Divider />
                    <div className={classes.paper}>
                        <TextField
                            error={formik.touched.name && formik.errors.name}
                            id="name"
                            label="Task name"
                            multiline
                            rows={2}
                            variant="outlined"
                            fullWidth
                            className={classes.pos}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            helperText={formik.touched.name && formik.errors.name ? (
                                formik.errors.name
                            ) : null}
                        />
                        <TextField
                            id="dueDate"
                            label="Due Date"
                            type="date"
                            name="dueDate"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.dueDate}
                            className={classes.pos}
                        />
                        <TextField
                            id="description"
                            label="Description"
                            multiline
                            rows={2}
                            variant="outlined"
                            fullWidth
                            className={classes.pos}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                        />
                        <FormControl variant="outlined" className={classes.pos}>
                            <InputLabel id="priority-label">Priority</InputLabel>
                            <Select
                                labelId="priority-label"
                                id="priority"
                                name="priority"
                                value={formik.values.priority}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                label="Priority"
                            >
                                <MenuItem value={"Low"}>Low</MenuItem>
                                <MenuItem value={"Medium"}>Medium</MenuItem>
                                <MenuItem value={"High"}>High</MenuItem>
                            </Select>
                        </FormControl>
                       
                         
                    </div>
                </div>
            </form>
        </Drawer >

    )
}

export default compose(
    connect(state => ({
        allTasks: state.tasks.allTasks
    }), { createTasks, getAllTasks, updateOnTask })
)(TaskDrawer)
