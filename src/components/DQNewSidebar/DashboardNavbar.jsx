import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@material-ui/core';
import { init } from "ityped";
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import BuildIcon from '@material-ui/icons/Build';

import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';

import AllOutIcon from '@material-ui/icons/AllOut';
import PhonelinkEraseIcon from '@material-ui/icons/PhonelinkErase';
import { useAuth } from '../context/AuthContext';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';


const useStyles = theme => ({
 
  customBadge: {
    backgroundColor: "#00AFD7",
    color: "white"
  }
});

const DashboardNavbar = ({avatar, onMobileNavOpen, ...rest }) => {
  const classes = useStyles()
 const [open, setOpen] = useState(false)
 const [anchorE1, setAnchorE1] = useState(null)
 const {currentUser} = useAuth()
  const [anchorE2, setAnchorE2] = useState(null)
  const [notifications, setNotifications] = useState([])
   const [videoData, setVideoData] = useState([])
  const [status, setStatus] = useState('')
  const [userData, setUserData] = useState([])
  const textRef = useRef();
  useEffect(() => {
    if (currentUser){
      db.collection('users').where('email', '==', `${currentUser.email}`).onSnapshot(doc => {
      const data = firebaseLooper(doc)
      setUserData(data[0])
      console.log(data[0])
    })
    }else {
       <Redirect to='/login'/>
    }
      
    
    if(currentUser){
       db.collection('notifications').orderBy('index', 'desc').onSnapshot(doc => {
      const data = firebaseLooper(doc)
      setNotifications(data)
    })
    db.collection('videoCallData').where('receiverId', '==', `${currentUser.email}`).onSnapshot(doc => {
      const data = firebaseLooper(doc)
       data.sort(function(a,b) {
                return(b.index-a.index)
            }) 
      setVideoData(data)
    })
    }else{
      <Redirect to='/login'/>
    }
   
   
  }, [])

  function updateStatus(id){
    db.collection('videoCallData').doc(id).update({status: 'ended'})
  }

  function getStatus(status, id,d_id){
    if(status === 'waiting'){
      return(<Button onClick={() => updateStatus(d_id)} href={`/video-call/${id}`} style={{color: 'darkseagreen'}}><PhoneInTalkIcon/>Join</Button>)
    }
    if(status === 'accepted'){
      return(<b>Accepted </b>)
    }
    if(status === 'ended'){
      return(<b>Ended </b>)
    }
  }

 

  function handleOpen(e){
   
    setAnchorE1(e.currentTarget)
  }
  function handleVideoOpen(e){
    setAnchorE2(e.currentTarget)

  }
  function handleVideoClose(e){
    setAnchorE2(null)

  }
  function handleClose(){
    
    setAnchorE1(null)
  }

  return (
    <>
    <AppBar

    style={{backgroundColor: "white"}}
      elevation={1}
      {...rest}
    >
     
      <Toolbar >
        <Box style={{ flexGrow: 1 }} />
        <Hidden smDown>
          {/* <IconButton  aria-controls='simple-menu' aria-haspopup="true" onClick={handleOpen} color="default">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              
              <NotificationsIcon />
            </Badge>
         
          </IconButton> */}
            <IconButton color="default" aria-controls='simple-menu' aria-haspopup="true" onClick={handleVideoOpen} >
            <Badge
              badgeContent={videoData.length}
              color="secondary"
              anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
              variant="dot"
            >
              <VideoLabelIcon />
            </Badge>
        
          </IconButton>
           <IconButton color="default" aria-controls='simple-menu' aria-haspopup="true" href='/account' >
              <span className="ml-2 text-sm font-medium">{userData.firstName} {userData.lastName}</span>
              <Avatar style={{marginLeft: '10px'}} src={userData.url} />
          
          
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          {/* <IconButton color="default" aria-controls='simple-menu' aria-haspopup="true" onClick={handleOpen}>
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          
          </IconButton> */}
           <IconButton color="default" aria-controls='simple-menu' aria-haspopup="true" onClick={handleVideoOpen} >
            <Badge
              badgeContent={videoData.length}
              color="secondary"
              variant="dot"
              anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            >
              <VideoLabelIcon />
            </Badge>
        
          </IconButton>
          <IconButton color="default" aria-controls='simple-menu' aria-haspopup="true" href='/account' >
           
              <Avatar src={userData.url} />
          
          
          </IconButton>
          <IconButton
           color="default"
            onClick={onMobileNavOpen}
           
          >
            <MenuIcon />
          </IconButton>
          
        </Hidden>
      </Toolbar>
    </AppBar>
       <Menu
       anchorEl={anchorE1}
        id="simple-menu"
        keepMounted
        open={Boolean(anchorE1)}
        onClose={handleVideoClose}
      >{
        notifications.slice(0, 6).map(data => (
          
          <div style={{display: 'flex', justifyContent: 'space-between'}} key={data.id}>
          <MenuItem>{data.notification} </MenuItem>
          <Button color="primary" href={`/${data.link}`}>Open <AllOutIcon/></Button>
          </div>
        ))
      }
        <Button  onClick={handleClose} color='secondary'>Close</Button>
      </Menu>
       <Menu
       anchorEl={anchorE2}
        id="simple-menu"
        keepMounted
        open={Boolean(anchorE2)}
        onClose={handleClose}
      >{
        videoData.map(data => (
          <div style={{display: 'flex', justifyContent: 'space-between'}} key={data.id}>
          <MenuItem onClick={handleVideoClose}>{data.callerId} {data.message} </MenuItem>
          <div >{getStatus(data.status, data.call_id, data.id)}</div>
         
          </div>
        ))
      }
         <Button  onClick={handleVideoClose} color='secondary'>Close</Button>
      </Menu>
    </>
   
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar