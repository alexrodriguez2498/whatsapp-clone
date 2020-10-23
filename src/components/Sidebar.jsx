import React, { useState, useEffect } from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { MoreVert, Chat, DonutLarge, SearchOutlined } from '@material-ui/icons'
import SidebarChat from './SidebarChat'
import db from '../firebase'


const useStyles = makeStyles ({
  sidebarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    borderRight: '1px solid lightgray'
  },
  sidebar: {
    flex: 0.35,
    display: 'flex',
    flexDirection: 'column'
  },
  sidebarHeaderRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: '10vw'
  },
  sidebarSearch: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    padding: '10px',
    height: '39px'
  },
  sidebarSearchContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: '35px',
    borderRadius: '20px',
    '& input':{
      border: 'none',
      marginLeft: '10px',
      width: '100%',
      height: '100%',
      borderRadius: '20px'
    },
    '& .MuiSvgIcon-root': {
      color: 'gray',
      padding: '10px',
    },
  },
  sidebarChats: {
    backgroundColor: 'white',
    flex: 1,
    overflow: 'scroll'
  }
})

function Sidebar() {
  const classes = useStyles() 
  const [chats, setChats] = useState([])

  useEffect(() => {
    db.collection('chats').onSnapshot((snapshot) => 
      setChats(snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    )
  }, [])

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarHeader}>
        <Avatar />
        <div className={classes.sidebarHeaderRight}>
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />  
          </IconButton>
          <IconButton>
            <MoreVert />   
          </IconButton>         
        </div>
      </div>
      <div className={classes.sidebarSearch}>
        <div className={classes.sidebarSearchContainer}>
          <SearchOutlined />
          <input type="text" placeholder="Start a new chat"/>
        </div>
      </div>
      <div className={classes.sidebarChats}>
        <SidebarChat addNewChat />
        {chats.map(chat => (
          <SidebarChat key={chat.id} id={chat.id} name={chat.data.name} />
        ))}
      </div>
    </div>
  )
}

export default Sidebar
