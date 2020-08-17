import React,{useEffect, useState} from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { Button, FormControl, InputAdornment, InputLabel, Menu, MenuItem, NativeSelect, OutlinedInput, Select, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Axios from 'axios';
import { List, ListItem, ListItemText } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox';
import CancelIcon from '@material-ui/icons/Cancel';
function Data() {
    var d=new Date();
    var months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    const [todo, setTodo] = useState([]);
    const [input, setInput] = useState('');
    const [inp, setinp] = useState([]);
    const [cal, setcal] = useState("");
    const [lis, setlis] = useState([]);
    const [date, setdate] = useState(new Date())
    const [success, setsuccess] = useState(false);
    const [error, seterror] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [checked, setChecked] =useState(false);
    const [under, setunder] = useState((d.getDate()).toString());
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    useEffect(() => {
        async function fun(){
            const val=await Axios.get("/todolist");
            setlis(val.data[0].list);
        }
        fun();
    }, [input]);
    function handleedit(idx,list){
        var a=list._id
        Axios.post("/edit",({a}))
        .then(res=>{
            console.log("Done!!");
        }).catch(err=>{
            console.log(err);
        })
    }
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    function handledel(list){
        seterror(true);
        setTimeout(() => {
            seterror(false);
        }, 4000);
        var arr=lis;
        for(var i=0;i<arr.length;i++){
            if(arr[i]._id===list._id){
                arr.splice(i,1);
            }
        }
        Axios.post("/delup",({arr}))
        .then((res)=>{
            console.log("Done!!");
        }).catch(err=>{
            console.log(err);
        })
    }
    const handleClose = () => {
      setAnchorEl(null);
    };
    const todolist=(e)=>{
      e.preventDefault();
      setsuccess(true);
            setTimeout(() => {
                setsuccess(false);
            }, 4000);
      if(cal.length=="0"){
        var dd=new Date();
        var s=dd.toString()
        Axios.post("/todo",({t:input,dat:s.substr(4,11)}))
        .then((res)=>{
            console.log("Done");
        })
        .catch((err)=>{
            console.log("err");
        })
        setcal(s.substr(4,11));
        setinp([...inp,s.substr(4,11)]);
      }
      else{
        Axios.post("/todo",({t:input,dat:cal}))
        .then((res)=>{
            console.log("Done");
        })
        .catch((err)=>{
            console.log("err");
        });
        
        setinp([...inp,cal]);
        var dd=new Date();
          var s=dd.toString()
          setcal(s.substr(4,11));
      }
      setTodo([...todo,input]);
      setInput('');
    }
   const onChange=date=>{
       setdate(date);
        var e=date.toString();
       setcal(e.substr(4,11));
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
                {lis.length===0 && <h1 style={{textAlign:"center"}}>Empty<span style={{paddingLeft:"1%",paddingTop:"10%",fontSize:"80px"}}><SentimentVeryDissatisfiedIcon/></span></h1>}
                {lis.map((t,idx)=>(
                <List key={lis[idx]._id} style={{textAlign:"center"}}>
                    <ListItem button >
            <ListItemText> <Checkbox checked={checked} onChange={handleChange} onClick={()=>checked===true?console.log("Not checked"):console.log("checked")} inputProps={{ 'aria-label': 'primary checkbox' }}/>{lis[idx].text}<span style={{paddingLeft:"1%",fontSize:"10px",color:"grey"}}>{lis[idx].date}</span></ListItemText>
                        <p onClick={()=>handleedit(idx,lis[idx])}><EditIcon/></p><p style={{paddingLeft:"2%"}} onClick={()=>handledel(lis[idx])}><CancelIcon/></p>
                    </ListItem>
                    <hr style={(under===lis[idx].date.substring(4,6)&&{border: "1px solid #0275d8"}) || (under>lis[idx].date.substring(4,6)&&{border: "1px solid #d9534f"}) || (under<lis[idx].date.substring(4,6)&&{border: "1px solid #5cb85c"})}/>
                </List>
                    ))}
                {success===true && <div style={{position:"fixed",bottom:"20px",left:"42%"}}>
                 <Alert severity="success">Added Successfully</Alert></div>}
                 {error===true && <div style={{position:"fixed",bottom:"20px",left:"42%"}}>
                 <Alert severity="error">Remove Successfully</Alert></div>}
        </div>
    )
}

export default Data
