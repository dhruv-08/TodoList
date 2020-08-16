import React,{useState} from 'react';
import Todo from './Todo'
import { Button, FormControl, InputAdornment, InputLabel, Menu, MenuItem, NativeSelect, OutlinedInput, Select, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
function Data() {
    var d=new Date();
    var months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    const [todo, setTodo] = useState([]);
    const [input, setInput] = useState('');
    const [inp, setinp] = useState([]);
    const [cal, setcal] = useState("");
    const [date, setdate] = useState(new Date())
    const [success, setsuccess] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const todolist=(e)=>{
      e.preventDefault();
      setsuccess(true);
            setTimeout(() => {
                setsuccess(false);
            }, 3000);
      if(cal.length=="0"){
        var dd=new Date();
        var s=dd.toString()
        setinp([...inp,s.substr(4,12)]);
      }
      else{
        setinp([...inp,cal]);
        var dd=new Date();
          var s=dd.toString()
          setcal(s.substr(4,12));
      }
      setTodo([...todo,input]);
      setInput('');
    }
   const onChange=date=>{
       setdate(date);
        var e=date.toString();
       setcal(e.substr(4,12));
   }
    return (
        <div style={{paddingLeft:"20%"}}>
            <div style={{paddingLeft:"6%"}}>
            <h1>TODAY<span style={{fontSize:"10px",color:"grey"}}>{days[d.getDay()]} {d.getDate()} {months[d.getMonth()]}</span></h1>
            <form>
                <FormControl variant="outlined">
                            <InputLabel>TO-DO ADD</InputLabel>
                            <OutlinedInput autoComplete="off"
                                value={input} onChange={(e)=>setInput(e.target.value)} id="standard-basic" label="Write Todo list" 
                                endAdornment={
                                <InputAdornment position="end">
                                 <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                    <CalendarTodayIcon/>
                                </Button>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem style={{padding:"2%",paddingLeft:"4%",paddingRight:"4%"}} onClick={handleClose}><Calendar onChange={onChange} value={date}/></MenuItem>
                                </Menu>
                                       
                                    
                                </InputAdornment>
                                }
                                labelWidth={70}
                            /><br/><br/>
                            <Button disabled={!input} type="submit" onClick={todolist} variant="contained" color="primary">
                                ADD
                            </Button>
                            </FormControl></form><br/><br/>
                
                </div>
                {todo.length===0 && <h1 style={{textAlign:"center"}}>Empty<span style={{paddingLeft:"1%",paddingTop:"10%",fontSize:"80px"}}><SentimentVeryDissatisfiedIcon/></span></h1>}
                <ul>
                    {todo.map((t,idx)=>(
                        <Todo cal={inp[idx]} text={todo[idx]}/>
                    ))}
                </ul>
                {success===true && <div style={{position:"fixed",bottom:"20px",left:"42%"}}>
                 <Alert severity="success">Successfully added </Alert></div>}
        </div>
    )
}

export default Data
