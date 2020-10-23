import React, { useEffect, useState } from 'react'
import { Avatar, List, ListItem, ListItemText, Divider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  sidebarChat: {
    display: 'flex',
    padding: '20px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#ebebeb'
    },
    '& .MuiAvatar-root': {
      marginRight: '15px'
    }
  },
})

function SidebarChat({ addNewChat, name, id }) {
  const classes = useStyles()
  const [seed, setSeed] = useState('')

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [])

  const createChat = () => {
    const roomName = prompt('Please enter name for chat')

    if (roomName) { 

    }
  }

  return !addNewChat ? (
    <>
      <List className={classes.sidebarChat}>
        <ListItem>
          <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
          <ListItemText  primary={
            <Typography variant="h6" color="initial">
              {name}
            </Typography>
          } 
          secondary="last message" />
        </ListItem>
      </List>
      <Divider />
      </>
  ) : <div onClick={createChat} className={classes.sidebarChat}>
        <Typography variant="h4" color="initial">
          Add new Chat
        </Typography>
      </div>
}

export default SidebarChat
