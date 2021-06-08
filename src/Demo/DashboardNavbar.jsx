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
  Divider,
  Drawer,
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
import Logo from '../components/Logo';
import { db } from '../firebase';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import { firebaseLooper } from '../utils/tools';
import AllOutIcon from '@material-ui/icons/AllOut';
import PhonelinkEraseIcon from '@material-ui/icons/PhonelinkErase';
import { useAuth } from '../components/context/AuthContext';

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
  const [show, setShow] = useState(null);
    const [profile, setProfile] = useState(false);
  const [notifications, setNotifications] = useState([])
   const [videoData, setVideoData] = useState([])
  const [status, setStatus] = useState('')
   const [flag, setFlag] = useState(true);
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
      return(<Button onClick={() => updateStatus(d_id)} href={`/video-call`} style={{color: 'darkseagreen'}}><PhoneInTalkIcon/>Join</Button>)
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
function handleDelete(id){
   db.collection('videoCallData').doc(id).delete()
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
        <Hidden mdDown>
        
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
        
        style={{width: '500px'}}
        keepMounted
        open={Boolean(anchorE2)}
        onClose={handleVideoClose}
      >
        {/* {
        videoData.map(data => (
          <div style={{display: 'flex', justifyContent: 'space-between'}} key={data.id}>
          <MenuItem onClick={handleVideoClose}>{data.callerId} {data.message} </MenuItem>
          <div >{getStatus(data.status, data.call_id, data.id)}</div>
         
          </div>
        ))
      } */}
      
               { 
               videoData.map(data => (
                 <div key={data.id}>
          <MenuItem >
            
               <div>
                    <div className="px-2 sm:px-4 border-r border-gray-300 dark:border-gray-700 flex items-center justify-center">
                         
                    </div>
                    <div className="flex flex-col justify-center xl:-ml-6 pl-4 xl:pl-1 w-3/5">
                        <p className="text-sm text-gray-800 dark:text-gray-100 font-semibold">{data.callerId}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-normal">Inviting you to join the video session - </p>
                    </div>
                  
                </div>
            
           
            <style>
                {`
                .translate-show{
                    transform : translateX(0%);
                }
                .translate-hide{
                    transform : translateX(150%);
                }
                `}
            </style>
        </MenuItem>
        <div style={{display: 'flex', padding: '20px', justifyContent: 'flex-end', paddingTop: 0}}>
           <div className="flex flex-col justify-center border-l items-center border-gray-300 dark:border-gray-700 w-1/3 sm:w-1/6">
                        <div className="pt-2 pb-2 border-b border-gray-300 dark:border-gray-700 w-full flex justify-center">
                            <span className="text-sm text-gray-500 font-bold cursor-pointer">{getStatus(data.status, data.call_id, data.id)}</span>
                        </div>
                       
         </div>
        <div className="pt-2 pb-2 flex justify-center w-full cursor-pointer" onclick={() => setFlag(false)}>
             <button onClick={(e) => handleDelete(data.id)} className="text-sm text-red-600 dark:text-red-400 cursor-pointer">Dismiss</button>
         </div> 
        </div>
         
        <Divider/>
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