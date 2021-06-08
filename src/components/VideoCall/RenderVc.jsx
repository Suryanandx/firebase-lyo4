import  { useEffect, useState } from 'react';
import '@opentok/client';
// import './index.css';
// import './polyfills';
// import {

//   API_KEY,
//   SESSION_ID,
//   TOKEN
// } from './config';
import VideoCall from './VideoCall';
 import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputLabel, Select, TextField, Toolbar } from '@material-ui/core';
import { db } from '../../firebase';
import { useAuth } from '../context/AuthContext';
import { firebaseLooper } from '../../utils/tools';
import { useVideoStorage } from '../../utils/useVideoStorage';
import OpenTokPage from '../../Pages/VideoCallPage/OpenTokPage';
import config from '../../Pages/VideoCallPage/config';
import { SettingsBackupRestoreSharp } from '@material-ui/icons';
import ListUsers from './ListUsers';
import screenfull from 'screenfull';
import Chatbox from '../../Pages/VideoCallPage/components/Chatbox';


import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import {

  API_KEY,
  SESSION_ID,
  TOKEN
} from './config';
import Whiteboard from '../Whiteboard/Whiteboard';
import InviteForm from '../InviteForm/InviteForm';
import AddIcon from '@material-ui/icons/Add';
import TestVideo from '../../VideoCallModel/TestVideo';
import EntryPage from '../../VideoCallModel/EntryPage';
import Page from '../Page';

const drawerWidth = 550;

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'black',
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

export default function RenderVc({config}) {
  const classes = useStyles();
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = React.useState(false);
     const [file, setFile] = useState(null);
   const [error, setError] = useState("")
   const [call_id, setCallId] = useState('')
   const [currentCall, setCurrentCall] = useState([])
   const [whiteboardOpen, setWhiteboardOpen] = useState(false)
    const [format, setFormat] = useState('')
    const [configData, setConfigData] = useState([])
    const [disabled, setDisabled] = useState(true)
    const [open, setOpen] = useState(false)
    const [openInvite, setOpenInvite] = useState(false)
    const [token, setToken] = useState(`${config.TOKEN}`)
    const [session_id, setSessionId] = useState(`${config.SESSION_ID}`)
    const types = ["image/png", "image/jpeg", "image/jpg"];
     const videoTypes = ["video/mp4", "video/mkv", "video/mov"];
   const audioTypes = ["audio/mp3", "audio/mpeg"]
      const [message, setMessage] = useState('')
      const {currentUser} = useAuth()
     useEffect(() => {
      
        
 
      db.collection('OpenTokConfig').get().then(snapshot => {
      const data = firebaseLooper(snapshot)
      console.log(data[0])
      setConfigData(data[0])
      
    })

    db.collection('CallCurrent').onSnapshot(snapshot => {
      const callData = firebaseLooper(snapshot)
        callData.sort(function(a,b){
          return(a.index-b.index)
        })
      setCurrentCall(callData[callData.length -1])
      setCallId(callData[callData.length-1].call_id)
      
    })

  }, [])

  const handleChange = (e) => {
        let selectedFile = e.target.files[0];
          
           if (selectedFile) {
          if(format === 'image'){
             if (types.includes(selectedFile.type)) {
                setError(null);
                setFile(selectedFile);
                setDisabled(false)
            } else {
                setFile(null);
                setError("Please select an image file (png or jpg)");
                
            }
          }else if(format === 'video'){
            if (videoTypes.includes(selectedFile.type)) {
                setError(null);
                setFile(selectedFile);
                 setDisabled(false)
            } else {
                setFile(null);
                setError("Please select a video file (mp4 or mkv)");
            }
          }else if(format === 'audio'){
            if (audioTypes.includes(selectedFile.type)) {
                setError(null);
                setFile(selectedFile);
                 setDisabled(false)
            } else {
                setFile(null);
                setError("Please select an audio file (mp3 )");
            }
          }
           
        }
    }
    let { progress, url } = useVideoStorage(file);

    const handleSubmit = () => {
      db.collection('CallMedia').add({call_id,url, format}).then(() => {
        setFile(null)
        setDisabled(true)
        setMessage('The File has been sent, If you wish to send another file repeat the same')
      })
    }
    const handleSession = () => {
      setSessionId(configData.session_id)
      setToken(configData.token)
    }
    const handleClickOpen = () => {
      setOpen(true)
    }
    const handleClose = () => {
      setOpen(false)
    }
     const openInviteBox = () => {
      setOpenInvite(true)
    }
    const closeInvite = () => {
      setOpenInvite(false)
    }
     const handleWhiteboardOpen = () => {
      setWhiteboardOpen(true)
    }
    const handleWhiteboardClose = () => {
      setWhiteboardOpen(false)
    }
    

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <Page title='Video Call | LyoIms'>
       <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        style={{top: 64, background: 'black'}}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
      >
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
           
          </Typography>
          <IconButton href="/">
            <Button style={{background: 'red', color: 'white'}}>Disconnect</Button>
          </IconButton>
          <IconButton target="_blank"  href="/machine-data">
            <Button style={{background: 'blue', color: 'white'}}>Machines</Button>
          </IconButton>
          <IconButton style={{color: 'orange'}} onClick={openInviteBox}>
            <AddIcon/>
          </IconButton>
          <IconButton target="_blank" href='/whiteboard' style={{color: 'orange'}} >
            <OpenInBrowserIcon/>
          </IconButton>
          <IconButton style={{color: 'orange'}} onClick={handleClickOpen}>
            <AttachFileIcon/>
          </IconButton>
          <IconButton
            style={{color: 'orange'}}
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(openDrawer && classes.hide)}
          >
           <QuestionAnswerIcon/>
          </IconButton>
          
        </Toolbar>
      </AppBar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: openDrawer,
        })}
      >
        <div className={classes.drawerHeader} />
       <TestVideo config={config}/>
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
       
      {currentUser ? <Chatbox call_id={call_id}/> : <b>You need to <a href='/login'>Login</a> to enable chat</b>}
      </Drawer>
           <Dialog fullWidth open={open} onClose={handleClose}>
             <Toolbar>
              <Button onClick={handleClose}>Close</Button>
           </Toolbar>            
               <h2 className="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl">Share Media </h2>                  <select
             style={{ border: '2px solid whitesmoke', margin: '2%'}}
                
                value={format}
                  
                required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setFormat(e.target.value)}
                >
                  <option value='' selected hidden>Select a Format</option>
                  <option value='image'>Image</option>
                  <option value='video'>Video</option>
                    <option value='audio'>Audio</option>
                    
                </select>
                
                
                <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-black rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-black hover:text-black">
                    <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal">Select a file</span>
                    <input onChange={handleChange} type='file' class="hidden" />
                </label>
           
                {file && <p>{progress}% uploaded</p>}
                <p className="mt-2 text-gray-600 dark:text-gray-400"></p>
                
                
                    <button onClick={handleSubmit} style={{backgroundColor: 'orange', marginLeft: '25%'}} disabled={disabled} href="#" className="px-5 py-2 w-50 mb-10 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-700">Send Now</button>
                
                {message && <b style={{color: 'green'}}>{message}</b>}


            </Dialog> 
             
            <Dialog fullScreen open={whiteboardOpen} onClose={handleWhiteboardClose}>
              <Toolbar>
              <Button onClick={handleWhiteboardClose}>Close</Button>
           </Toolbar> 
              <Whiteboard/>
            </Dialog>

            <Dialog open={openInvite} onClose={closeInvite} fullWidth>
              <Toolbar>
              <Button onClick={closeInvite}>Close</Button>
           </Toolbar>
              <InviteForm/>
            </Dialog>
           
    </div>
    </Page>
   
  );
}