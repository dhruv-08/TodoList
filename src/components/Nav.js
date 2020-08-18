import React, { useEffect, useState } from 'react'
import clsx from 'clsx';
import Data from './Data'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PieChartIcon from '@material-ui/icons/PieChart';
import {Switch,Route,Link, Redirect} from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
import Login from './Login'
import Axios from 'axios';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { PieChart } from 'react-minimal-pie-chart';
import { Box, Grid } from '@material-ui/core';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
function Nav() {
    const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [beforecount, setbeforecount] = useState(0)
  const [total, settotal] = useState(0)
    const [count, setcount] = useState(0)
    const [aftercount, setaftercount] = useState(0)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    async function send(){
      const val=await Axios.get("/data");
      setcount(val.data[0].count);
      setaftercount(val.data[0].aftercount);
      setbeforecount(val.data[0].beforecount);
  }
  send();
  }, [])
  const handleDrawerClose = () => {
    setOpen(false);
  };
  function handleLogout(){
    Axios.get("/logout")
    .then(res=>{
      console.log("Done!!");
    }).catch(err=>{
      console.log(err);
    })
  }
    return (
        <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{backgroundColor:"#d9534f"}}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            TO-DO
          </Typography>
          <div style={{paddingLeft:"87%"}}>
          <PieChartIcon style={{fontSize:"40px"}} onClick={handleClick}/>
          </div>
          <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <div>
            <h1 style={{textAlign:"center"}}>Productivity</h1><Divider /><br/>
            <Grid container spacing={2}>
              <Grid item xs={2}></Grid>
            <Grid item xs={4}> <PieChart style={{width:"200px",height:"200px"}}
      
            data={[
                { title: 'On date', value: count, color: '#E38627' },
                { title: 'before date', value: beforecount, color: '#C13C37' },
                { title: 'after date', value: aftercount, color: '#6A2135' },
            ]}
          /></Grid>
            <Grid item xs={5}>
          <Grid container spacing={6}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
            <Grid item xs={2}><Box bgcolor="#E38627" style={{width:"20px",height:"20px"}}>
            </Box></Grid>
            <Grid item xs={2}>Task Completed On date</Grid></Grid>
          </Grid>
          <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={2}><Box bgcolor="#C13C37" style={{width:"20px",height:"20px"}}>
            </Box></Grid>
            <Grid item xs={2}>Task Completed Before date</Grid></Grid>
          </Grid>
          <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={2}><Box bgcolor="#6A2135" style={{width:"20px",height:"20px"}}>
            </Box></Grid>
            <Grid item xs={2}>Task Completed After date</Grid></Grid>
          </Grid>
          {/* <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={2}><Box bgcolor="#a86016" style={{width:"20px",height:"20px"}}>
            </Box></Grid>
            <Grid item xs={2}>Incomplete Task</Grid></Grid>
          </Grid> */}
          </Grid></Grid></Grid></div></MenuItem>
        </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Home','logout'].map((text, index) => (
            <ListItem button key={text} style={{width:"300px"}}>
                <Link to="/home">{index===0 && <ListItemIcon><HomeIcon style={{color:"#5cb85c"}}/></ListItemIcon>}</Link>
                <Link to="/">{index===1 && <ListItemIcon><ExitToAppIcon style={{color:"#d9534f"}} onClick={()=>handleLogout()}/></ListItemIcon>}</Link>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/home" component={()=><Data/>}/>
          <Route exact path="/" component={()=><Login/>}/>
          <Redirect to="/home"/>
      </Switch>
      </main>
    </div>
    )
}

export default Nav