import React , { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/Login';
import { useStateValue } from './StateProvider';

const useStyles = makeStyles({
  app:{
    backgroundColor: '#dadbd3',
    height: '100vh',
    display: 'grid',
    placeItems: 'center'
  },
  appBody:{
    display: 'flex',
    width: '90vw',
    height: '90vh',
    backgroundColor: '#ededed',
    boxShadow: '-1px 4px 20px -6px rgba(0, 0, 0, 0.7)'
  },
})

function App() {
  const classes = useStyles()
  const [{ user }, dispatch] = useStateValue()

  return (
    <div className={classes.app}>      
      {!user ? (
        <Login />
      ) :  (
        <div className={classes.appBody}>
        <Router>
          <Sidebar />
          <Switch>
            <Route exact path="/chats/:chatId">
              <Chat />
            </Route>
            <Route exact path="/">
              <Chat />
            </Route>
          </Switch>
        </Router>
      </div>
      )}
    </div>
  );
}

export default App;
