import React,{useState} from 'react';
import Todo from './components/Todo'
import './App.css';
import { Button, TextField } from '@material-ui/core';

function App() {
  const [todo, setTodo] = useState(['Hello world!!']);
  const [input, setInput] = useState('');
  const todolist=(e)=>{
    e.preventDefault();
    setTodo([...todo,input]);
    setInput('');
  }
  return (
    <div className="App">
      <h1>TODO LIST</h1>
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
    </div>
  );
}

export default App;
