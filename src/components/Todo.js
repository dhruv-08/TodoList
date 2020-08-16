import { List, ListItem, ListItemText } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox';
import React, { useState } from 'react'
function Todo({cal,text}) {
    var d=new Date();
    const [checked, setChecked] =useState(false);
    const [hover, sethover] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  function toggleHover(){
      sethover(!hover);
  }
    return (
        <div>
        <List style={{textAlign:"center"}}>
            <ListItem button  onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
    <ListItemText> <Checkbox checked={checked} onChange={handleChange} onClick={()=>checked===true?console.log("Not checked"):console.log("checked")} inputProps={{ 'aria-label': 'primary checkbox' }}/>{text}<span style={{paddingLeft:"1%",fontSize:"10px",color:"grey"}}>{cal}</span></ListItemText>
                {hover==true && <p >Test</p>}
            </ListItem>
        </List>
        </div>
    )
}

export default Todo
