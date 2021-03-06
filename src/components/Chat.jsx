import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import { List, ListItem, ListItemText, IconButton, Typography } from '@material-ui/core'
import { AttachFile , InsertEmoticon, Mic, MoreVert, SearchOutlined, Send} from '@material-ui/icons'
import { useParams } from 'react-router-dom'
import clsx from 'clsx'
import db from '../firebase'
import { useStateValue } from '../StateProvider'
import firebase from 'firebase'

  const useStyles = makeStyles({
    chat: {
      flex: 0.65,
      display: 'flex',
      flexDirection: 'column'
    },
    chatHeader: {
      display: 'flex',
      alignItems: 'center',
      paddingRight: '20px',
      borderBottom: '1px solid lightgray',
      '& .MuiList-root': {
        flex: 1,
        paddingLeft: '20px'
      },
      '& .MuiAvatar-root':{
        marginRight: '15px'
      },
    },
    chatHeaderRight: {
      display: 'flex',
      justifyContent: 'space-between',
      minWidth: '100px'
    },
    chatBody: {
      flex: 1,
      backgroundImage: "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/12ee6265-e947-474a-a378-6d78ab0d1117/d8fr7iz-082cab4c-3f87-47e1-b2f0-efdb504372e5.jpg/v1/fill/w_1024,h_576,q_75,strp/super_hero_whatsapp_background_by_x_ama_d8fr7iz-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD01NzYiLCJwYXRoIjoiXC9mXC8xMmVlNjI2NS1lOTQ3LTQ3NGEtYTM3OC02ZDc4YWIwZDExMTdcL2Q4ZnI3aXotMDgyY2FiNGMtM2Y4Ny00N2UxLWIyZjAtZWZkYjUwNDM3MmU1LmpwZyIsIndpZHRoIjoiPD0xMDI0In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.vMsSrJL87xcHSN4_yT8cSlEGqymaknC5rvamCRrnlGU')",
      overflowY: 'scroll',
      backgroundRepeat: 'repeat',
      backgroundPosition: 'center',
      padding: '30px'
    },
    chatMessage: {
      position: 'relative',
      padding: '10px',
      borderRadius: '10px',
      width: 'fit-content',
      backgroundColor: '#ffffff',
      marginBottom: '15px'
    },
    chatMessageContent: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    timeStamp: {
      marginLeft: "10px"
    },
    chatMessageReciever: {
      marginLeft: 'auto',
      backgroundColor: '#dcf8c6'
    },
    messageHeader: {
      fontWeight: 800
    },
    chatFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '72px',
      borderTop: '1px solid lightgray',
      '& form' :{
        flex: 1,
        display: 'flex',
        '& input' :{
          flex: 1,
          borderRadius: '30px',
          border: 'none',
          paddingLeft: '20px',
          paddingRight: '20px'
        },
      },
      '& .MuiSvgIcon-root':{
        padding: '10px',
        color: 'gray'
      }
    }
  })

function Chat() {
  const classes = useStyles()
  const [seed, setSeed] = useState('')
  const [input, setInput] = useState('')
  const { chatId } = useParams()
  const [chatName, setChatName] = useState('')
  const [messages, setMessages] = useState([])
  const [{ user }, dispatch] = useStateValue()

  useEffect(() => {
    if(chatId) {
      db.collection('chats')
        .doc(chatId)
        .onSnapshot((snapshot) => 
        (setChatName(snapshot.data().name)),

        db.collection('chats')
          .doc(chatId)
          .collection('messages')
          .orderBy('timestamp', 'asc')
          .onSnapshot(snapshot =>
            setMessages(snapshot.docs.map(doc => doc.data()))
        )
      )
    }
  }, [chatId])

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [chatId])

  const sendMessage = e => {
    e.preventDefault()

    db.collection('chats').doc(chatId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setInput('')
  }

  return (
    <div className={classes.chat}>
      <div className={classes.chatHeader}>

        <List>
          <ListItem>
            <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />
              <ListItemText primary={
                <Typography variant="h5" color="initial">
                {chatName}
                </Typography>}  
                secondary="las seen at ..."/>
          </ListItem>
        </List>

        <div className={classes.chatHeaderRight}>
          <IconButton>
            <SearchOutlined/>
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
          
        </div>
      </div>
      <div className={classes.chatBody}>
        {messages.map((message) => (
          <div  className={clsx(classes.chatMessage, message.name === user.displayName ? classes.chatMessageReciever: '')}>
            <Typography className={classes.messageHeader} variant="body2" color="initial">
              {message.name}
            </Typography>
          <div className={classes.chatMessageContent}>
            <Typography variant="body1" color="initial">
              {message.message}
            </Typography>
            <Typography className={classes.timeStamp} variant="caption" color="textSecondary">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </Typography> 
          </div>
        </div>
        ))}
      </div>
      <div className={classes.chatFooter}>
        <InsertEmoticon />
        <form>
          <input value={input} onChange={e => setInput(e.target.value)} type="text"/>
          <IconButton type="submit" size='small' onClick={sendMessage}>
            <Send />
          </IconButton>
          {/* <button>send a message</button> */}
        </form>
        <Mic />
      </div>
    </div>
  )
}

export default Chat
