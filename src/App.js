import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat';

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
  return (
    <div className={classes.app}>      
      <div className={classes.appBody}>
      <Sidebar />
      <Chat />
      </div>
    </div>
  );
}

export default App;
