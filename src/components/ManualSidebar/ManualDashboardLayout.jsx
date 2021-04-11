import { Card, Container, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

const useStyles = makeStyles((theme) => ({
  layoutRoot: {
    backgroundColor: 'white',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
     background:'linear-gradient(#f3f3f3, #e7e7e7)' 
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
    paddingLeft: 256
  },
   background:'linear-gradient(#f3f3f3, #e7e7e7)' 
  },
  container: {
      display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
  },
  content: {
     background:'linear-gradient(#f3f3f3, #e7e7e7)' ,
      flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
    },
}));


const StepDashboardLayout = ({ match}) => {
  const classes = useStyles()
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div >
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <DashboardSidebar
       match={match}
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      {/* <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>

          </Card>
        </div>
      </div> */}
      </div>
    
  );
};

export default StepDashboardLayout;