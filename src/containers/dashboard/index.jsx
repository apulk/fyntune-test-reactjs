import React, { Suspense, useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
 
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TaskLists from '../../components/tasks/TaskLists';
import { GET_ALL_TASKS } from '../../utils/ActionTypes';
import { getAllTasks } from './action'
import { connect } from 'react-redux';
import { compose } from 'recompose'
import { loader } from '../../utils';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TaskDrawer from '../../components/tasks/TaskDrawer';
import LeftDrawer from '../../components/LeftDrawer';
 
const drawerWidth = 240;

const Dashboard = (props) => {
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
    isComplete: 0,
    isArchive: 0,
    userId: localStorage.getItem('userId')
  })
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  useEffect(() => {
    props.getAllTasks(GET_ALL_TASKS)
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
      isComplete: values.isComplete,
      isArchive: values.isArchive,
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
      isComplete: 0,
      isArchive: 0,
      userId: localStorage.getItem('userId')
    })
    setTaskDrawer(false);
  }
  return (
    <div className={classes.root}>
      <LeftDrawer />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} ></div>
        <Container maxWidth="lg" className={classes.container}>
          <Grid item xs={12} md={12} lg={12}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={createTask}
            >
              Add task
            </Button>
            <Suspense fallback={loader()}>
              <TaskLists tasks={props.allTasks && props.allTasks} onTaskClick={createTask} />
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
)(Dashboard)


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
