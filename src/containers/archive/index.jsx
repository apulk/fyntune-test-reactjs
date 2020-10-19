import React, { Suspense, useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import TaskLists from '../../components/tasks/TaskLists';
import { GET_DELETED_TASKS } from '../../utils/ActionTypes';
import { getAllTasks } from '../dashboard/action'
import { connect } from 'react-redux';
import { compose } from 'recompose'
import { loader } from '../../utils';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import TaskDrawer from '../../components/tasks/TaskDrawer';
import LeftDrawer from '../../components/LeftDrawer';

const drawerWidth = 240;


const ArchiveTasks = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [eventLoading, setEventLoading] = useState(false)
  const [taskDrawer, setTaskDrawer] = useState(false);
  const [item, setItem] = useState({
    name: '',
    prority: '',
    description: '',
    dueDate: '',
    files: [],
    isArchive: 0,
    isComplete: 0,
    userId: localStorage.getItem('userId')
  })

  useEffect(() => {
    props.getAllTasks(GET_DELETED_TASKS)
  }, [])
  const toggleTaskDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setTaskDrawer(open);
  };
  // Craete task data 
  const createTask = (values) => {
    setItem({
      id: values.id ? values.id : null,
      name: values?.name || '',
      priority: values?.priority || '',
      description: values?.description || '',
      dueDate: values?.dueDate || '',
      files: values.files,
      isArchive: values.isArchive,
      isComplete: values.isComplete,
      userId: localStorage.getItem('userId')
    })
    setTaskDrawer(true);
  }
  const clearItem = () => {
    setItem({
      name: '',
      prority: '',
      description: '',
      dueDate: '',
      files: [],
      isArchive: 0,
      isComplete: 0,
      userId: localStorage.getItem('userId')
    })
    setTaskDrawer(false);
  }
  return (
    <div className={classes.root}>
      <LeftDrawer />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid item xs={12} md={12} lg={12}>
            <Suspense fallback={loader}>
              <TaskLists tasks={props.allTasks && props.allTasks} onTaskClick={(e) => createTask(e.data)} />
            </Suspense>
            <TaskDrawer taskDrawer={taskDrawer} item={item} clearItem={clearItem} toggleDrawer={toggleTaskDrawer} className={clsx(classes.container, classes.taskDrawer)} />
          </Grid>
        </Container>
        <Backdrop className={classes.backdrop} open={eventLoading}  >
          <CircularProgress color="inherit" />
        </Backdrop>
      </main>
    </div>
  );
}

export default compose(
  connect(state => ({
    allTasks: state.tasks.allTasks
  }), { getAllTasks })
)(ArchiveTasks)

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  taskDrawer: {
    width: '50vw'
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));
