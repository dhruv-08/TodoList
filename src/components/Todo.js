import { List, ListItem, ListItemText } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox';
import React, { useState } from 'react'
function Todo(props) {
    const [checked, setChecked] =useState(false);
    const [hover, sethover] = useState(false)
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  function toggleHover(){
      sethover(!hover);
  }
    return (
        <List style={{textAlign:"center"}}>
            <ListItem button  onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
                <ListItemText> <Checkbox checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'primary checkbox' }}/>{props.text}</ListItemText>
                {hover==true && <p >Test</p>}
            </ListItem>
        </List>        
    )
}

export default Todo
