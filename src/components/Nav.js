import React from 'react'
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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import TodayIcon from '@material-ui/icons/Today';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PieChartIcon from '@material-ui/icons/PieChart';
import SettingsIcon from '@material-ui/icons/Settings';
import Inbox from './Inbox'
import Today from './Today'
import Upcoming from './Upcoming'
import Project from './Project'
import {Switch,Route,Link, Redirect} from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
  };
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
          <div style={{paddingLeft:"76%"}}>
          <AddIcon style={{paddingLeft:"10%",fontSize:"40px"}}/>
          <PieChartIcon style={{paddingLeft:"10%",fontSize:"40px"}}/>
          <NotificationsIcon style={{paddingLeft:"10%",fontSize:"40px"}}/>
          <SettingsIcon style={{paddingLeft:"10%",fontSize:"40px"}}/>
          </div>
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
          {['Home','Inbox', 'Today', 'Upcoming', 'Project'].map((text, index) => (
            <ListItem button key={text} style={{width:"300px"}}>
                <Link to="/home">{index===0 && <ListItemIcon><HomeIcon style={{color:"#5cb85c"}}/></ListItemIcon>}</Link>
                <Link to="/inbox">{index===1 && <ListItemIcon><InboxIcon style={{color:"#0275d8"}} /> </ListItemIcon>}</Link>
                <Link to="/today">{index===2 && <ListItemIcon><TodayIcon style={{color:"#5cb85c"}}/></ListItemIcon>}</Link>
                <Link to="/upcoming">{index===3 && <ListItemIcon><DateRangeIcon style={{color:"#f0ad4e"}}/></ListItemIcon>}</Link>
                <Link to="/project">{index===4 && <ListItemIcon><AccountTreeIcon style={{color:"#5bc0de"}}/></ListItemIcon>}</Link>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/home" component={()=><Data/>}/>
          <Route exact path="/inbox" component={()=><Inbox/>}/>
          <Route exact path="/today" component={()=><Today/>}/>
          <Route exact path="/upcoming" component={()=><Upcoming/>}/>
          <Route exact path="/project" component={()=><Project/>}/>
          <Redirect to="/home/todo"/>
      </Switch>
      </main>
    </div>
    )
}

export default Nav
