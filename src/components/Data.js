import React,{useState} from 'react';
import Todo from './Todo'
import { Button, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

function Data() {
    const [todo, setTodo] = useState(['Hello world!!']);
    const [input, setInput] = useState('');
    var months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    var d = new Date();
    const todolist=(e)=>{
      e.preventDefault();
      setTodo([...todo,input]);
      setInput('');
    }
    return (
        <div style={{textAlign:"center"}}>
            <h1>TODAY<span style={{fontSize:"10px",color:"grey"}}>{days[d.getDay()]} {d.getDate()} {months[d.getMonth()]}</span></h1>
                <form>
                <TextField value={input} onChange={(e)=>setInput(e.target.value)} id="standard-basic" label="Write Todo list" />
                <Button disabled={!input} type="submit" onClick={todolist} variant="contained" color="primary">
                    ADD
                </Button>
                </form>
                <ul>
                    {todo.map(t=>(
                        <Todo text={t}/>
                    ))}
                </ul>
                <div style={{position:"fixed",bottom:"20px",left:"42%"}}>
                <Alert severity="success">This is a success alert — check it out!</Alert></div>
        </div>
    )
}

export default Data
