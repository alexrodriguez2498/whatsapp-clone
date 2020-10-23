import React, { useEffect, useState } from 'react'
import { Avatar, List, ListItem, ListItemText, Divider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import db from '../firebase'

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
  const [messages, setMessages] = useState('')

  useEffect(() => {
    if(id) {
      debugger
      db.collection('chats')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp, desc')
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => 
          doc.data()))
        )
    } 
  }, [])

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [])

  const createChat = () => {
    const roomName = prompt('Please enter name for chat group')

    if (roomName) { 
      db.collection('chats').add({
        name: roomName
      })
    }
  }

  return !addNewChat ? (
      <Link to={`/chats/${id}`}>
        <List className={classes.sidebarChat}>
          <ListItem>
            <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />
            <ListItemText  primary={
              <Typography variant="h6" color="initial">
                {name}
              </Typography>
            } 
            secondary={messages[0]?.message || 'hola'} />
          </ListItem>
        </List>
        <Divider />
      </Link>
  ) : <div onClick={createChat} className={classes.sidebarChat}>
        <Typography variant="h4" color="initial">
          Add new Chat
        </Typography>
      </div>
}

export default SidebarChat
