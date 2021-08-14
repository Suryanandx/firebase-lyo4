import React, { useEffect, useRef, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../Logo';
import Navbar from './Navbar';
import { db } from '../../firebase';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { IconButton } from '@material-ui/core';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        Arizon Systems Pvt Ltd.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#ff7a00',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  button_submit: {
      background:'#ff7a00',
      borderRadius: '15px',
      margin: theme.spacing(3, 0, 2),
  }
}));

export default function LogIn() {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
   const [navbar, setNavbar] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [passwordOn, setPasswordOn] = useState("password")

  useEffect(() => {
     db.collection('company').doc('navbar').onSnapshot(snapshot => {
      const data = snapshot.data()
      setNavbar(data)
    })
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(email,password)
      history.push("/")
    } catch {
      setError("Failed to Login. Invalid credentials !")
    }

    setLoading(false)
  }

  return (
        <div>

        <div className="bg-white font-family-karla h-screen">

    <div className="w-full flex flex-wrap">
        <div style={{backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/lyodata.appspot.com/o/login%2FGroup%20244.png?alt=media&token=9903cf0f-9a60-4955-93b0-cb057089f561")`}} className="w-1/2 shadow-2xl bg-yellow-800 ">
            <div className="object-cover w-full h-screen hidden md:block ">
              <img className='ml-auto mr-auto pt-64' src={navbar.url} alt="" />
            </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col">

          
          
            <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-36">
                 
                <p style={{font: 'normal normal bold 40px/21px Montserrat', letterSpacing: '2.36px', color: '#43425D', opacity: 1}}  className="text-center text-black font-bold text-xl p-4">
              
              {navbar.name}</p>
            
            <p style={{font: 'normal normal normal 20px/13px Roboto', color: '#4D4F5C', opacity: 0.5}} className="text-center text-3xl">Welcome back! Please login to your account.</p>
                 {error && <b style={{color: 'red'}}>{error}</b>}
                <form style={{justifyContent: 'center'}} className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
                   
                        
                        <TextField className='mb-4' variant='outlined' required onChange={(e) => setEmail(e.target.value)} type="email" id="email" label="Email" />
                        <div style={{display: 'flex'}}>
                          <TextField variant='outlined' fullWidth required onChange={(e) => setPassword(e.target.value)} type={passwordOn} id="password" label="Password" />
                        { passwordOn === "password" ?
                          <IconButton onClick={(e) => setPasswordOn("text")}>
                            <VisibilityOffIcon/>
                          </IconButton>
                          : 
                          <IconButton onClick={(e) => setPasswordOn("password")}>
                            <VisibilityIcon/>
                          </IconButton>
                        }
                        </div>
                        
                  
    
                   <button type='submit' style={{backgroundColor: 'orange', alignItems: 'center', marginLeft: '25%'}} className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8 w-50 " >Log In</button>
                </form>
                <div className="text-center pt-12 pb-12">
                    <p>Don't remember password? <a href="/forgotPass" className="underline font-semibold">Reset Password.</a></p>
                </div>
            </div>

        </div>
    </div>

</div>
        </div>
  );
}