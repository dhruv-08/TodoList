import { List, ListItem, ListItemText } from '@material-ui/core'
import React from 'react'
function Todo(props) {
    return (
        <List style={{textAlign:"center"}}>
            <ListItem button>
                <ListItemText primary={props.text} secondary="Faltu"/>
            </ListItem>
        </List>        
    )
}

export default Todo
