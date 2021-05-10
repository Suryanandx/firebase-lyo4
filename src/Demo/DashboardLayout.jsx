import { Card, Container, makeStyles, Paper } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../components/context/AuthContext';
import { db } from '../firebase';
import { firebaseLooper } from '../utils/tools';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

const useStyles = makeStyles((theme) => ({
  layoutRoot: {
   backgroundColor: 'whitesmoke',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#141256',
  },
 wrapper: {
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 250
  },
  
  },
  container: {
      display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
  },
  content: {
    
      flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
    },
}));


const DashboardLayout = ({children}) => {
  const classes = useStyles()
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

 

  return (
    <Paper  className={classes.layoutRoot}>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
           {children}
          </Card>
        </div>
      </div>
      </Paper>
    
  );
};

export default DashboardLayout;