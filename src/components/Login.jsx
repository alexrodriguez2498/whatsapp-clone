import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'
import { provider , auth}  from '../firebase'
import { useStateValue } from '../StateProvider'
import { actionTypes } from '../reducer'

const useStyles = makeStyles({
  login: {
    display: 'grid',
    placeItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f8f8f8'
  },
  loginContainer: {
    padding: '100px',
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px',
    '& img':{
      objectFit: 'contain',
      height: '100px',
      marginBottom: '40px'
    },
    '& button' :{
      marginTop: '50px',
      textTransform: 'inherit',
      backgroundColor: '#0a8d48',
      color: 'white',
      '&:hover':{
        // color: 'black',
        backgroundColor: '#076433'
      }
    }
  }
})

function Login() {
  const classes = useStyles()
  const [{}, dispatch] = useStateValue()

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      })
      .catch((error) => alert(error.message))
  }

  return (
    <div className={classes.login}>
      <div className={classes.loginContainer}>
        <img 
          src="https://www.pngkey.com/png/full/326-3268618_pink-instagram-app-icon-whatsapp-pink-logo-png.png" 
          alt=""
        />
        <div className={classes.loginText}>
          <Typography variant="h4" color="initial">
            Sign in to WhatsApp (clone version)
          </Typography>
        </div>

        <Button onClick={signIn}>
          Sign In With Google
        </Button>
      </div>
    </div>
  )
}

export default Login
