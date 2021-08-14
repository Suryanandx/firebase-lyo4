import { Box, Button, Card, CircularProgress, Container, FormControl, Grid, InputLabel, LinearProgress, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom'
import {useDropzone} from 'react-dropzone';
import {db, storage, storageRef} from '../../firebase'
import { DropzoneArea } from 'material-ui-dropzone';
import Alert from '@material-ui/lab/Alert';
import { v4 as uuid } from 'uuid'
import ManualDashboardLayout from '../../components/ManualSidebar/ManualDashboardLayout'
import StepDashboardLayout from '../../components/StepSidebar/StepDashboardLayout';
import { useStorage } from '../../utils/useStorage';
import { firebaseLooper } from '../../utils/tools';
const useStyles = makeStyles((theme) => ({
  paper: {
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#141256',
  },
  form: {
    width:"100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    maxWidth: "50%",
      background: "#ff7a00",
      borderRadius: '20px',
      margin: theme.spacing(3, 0, 2),
  },
  drag: {
 
  border: "4px dashed #fff",
  },
  drop: {
    textAlign: "center",
    color: "#4a47a3",
    fontFamily: "roboto"
  },
  backButton: {
      margiinTop: "30px",
        backgroundColor: "#A997DF",
        color: "white",
        
    },
    wrapper: {
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 256
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


const AddSteps = ({match}) => {


  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [format, setFormat] = useState('')
   const [type, setType] = useState('');
  const [manual_id, setCid] = useState(match.params.id)
  const [file, setFile] = useState(null);
  const [error, setError] = useState('')
  const [media, setMedia] = useState({
    mediaData: null
  })
   const types = ["image/png", "image/jpeg", "image/jpg"];
   const videoTypes = ["video/mp4", "video/mkv", "video/mov"];
   const audioTypes = ["audio/mp3", 'audio/mpeg']
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('')
  const history = useHistory();
  const handleReturn = () => {
    history.go(-1)
  }
  const [indexD, setIndex] = useState([])
  useEffect(() => {
    db.collection('stepData').where('manual_id', '==', `${match.params.id}`).onSnapshot(doc=>{
      const data = firebaseLooper(doc)
      setIndex(data)
    })
  }, [])
  const handleChange = (loadedFiles) => {

   
        let selectedFile = loadedFiles[0]
        
        if (selectedFile) {

          if(type === "" || format === ""){
            setError("Please Select a Type / Format first to proceed")
          }
          if(format === 'image'){
             if (types.includes(selectedFile.type)) {
                setError(null);
                setFile(selectedFile);
            } else {
                setFile(null);
                setError("Please select an image file (png or jpg)");
            }
          }else if(format === 'video'){
            if (videoTypes.includes(selectedFile.type)) {
                setError(null);
                setFile(selectedFile);
            } else {
                setFile(null);
                setError("Please select a video file (mp4 or mkv)");
            }
          }else if(format === 'audio'){
            if (audioTypes.includes(selectedFile.type)) {
                setError(null);
                setFile(selectedFile);
            } else {
                setFile(null);
                setError("Please select an audi file (mp3 )");
            }
          }
           
        }
       
       
    }
    const { progress, url } = useStorage(file);

    const handleSubmit = (e) => {
    e.preventDefault();
    const index = indexD.length
    const steps = {title, desc, manual_id, url, type, index, format };
    setLoading(true);
    db.collection('stepData').add(steps).then(()=>{
      setLoading(false)
      setMessage('Step Added successfully !')
     
    })
  }

  function getPreview(url){
    if(format === 'image'){
      return <img width='450' src={url}/>
    }
    else if(format === 'video'){
      return <video
    style={{ width: '90%', marginTop: '20px'}}
    controls
      src={url}
      alt="First slide"
    />
    }
    else if(format === 'image'){
      return <audio width='450' src={url}/>
    }
  }
 
 

  const classes= useStyles();
    return (
      <>
     
        <div >
        <div >
          <Card >
            <Box
               py={3}
              style={{
                backgroundColor: 'background.default',
                minHeight: '100%',
              }}
            >
              <Container  maxWidth={false}>
          <div className={classes.paper}>
            <Alert severity="info">You are currently Adding New Steps</Alert>
            <br/>
            <Typography component="h1" variant="h4">
          Add  Step
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div style={{display: 'flex'}}>
          <Grid 
           container
           spacing={3}
          style={{marginRight: "50px"}} >
          <Grid
          item
            lg={12}
            sm={12}
            xl={6}
            xs={12}
          >
            <TextField
              label="Content id"
              value={manual_id}
              variant='outlined'
              margin='normal'
              fullWidth
              disabled
              onChange={(e) => setCid(e.target.value)}
              />
              <TextField
              value={title}
                variant="outlined"
                error={title.length > 40}
                margin="normal"
                required
                fullWidth
                id="title"
                label="Step Title"
                name="title"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
              value={desc}
               
                variant="outlined"
                margin="normal"
                required
                fullWidth
                rows={7}
                name="step_description"
                label="Description"
                onChange={(e) => setDesc(e.target.value)}
                id="step_description"
                multiline
                style={{marginBottom: '20px'}}
                
              />
              <FormControl   style={{marginBottom: '20px'}} fullWidth variant='outlined'>
              <InputLabel>Select Type</InputLabel>
              <Select
              required
              label="Select Type"
              value={type}
               required
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value='info'>Info</MenuItem>
                 <MenuItem value='camera'>Camera</MenuItem>
                  <MenuItem value='critical'>Critical</MenuItem>
                   <MenuItem value='normal'>Normal</MenuItem>
              </Select>
              </FormControl>
              <FormControl   style={{marginBottom: '20px'}} fullWidth variant='outlined'>
          <InputLabel>Select Format </InputLabel>
              <Select
             
              value={format}
                label="Select Format"
               required
                
                onChange={(e) => setFormat(e.target.value)}
              >
                <MenuItem value='image'>Image</MenuItem>
                 <MenuItem value='video'>Video</MenuItem>
                  <MenuItem value='audio'>Audio</MenuItem>
                  
              </Select>
              </FormControl>
             
              <br/>
              
          </Grid>
         
          
              <Grid
            xs={12}
            lg={12}
            sm={12}
            >
      {error &&  <Alert severity="error">{error}</Alert>}
      <br/>
       <InputLabel variant="contained">Add Media</InputLabel>
       <DropzoneArea
       
       dropzoneClass={classes.drop}
        showFileNames
        onChange={(loadedFiles) => handleChange(loadedFiles)}
        dropzoneText="Drag and Drop / Click to ADD Media"
        showAlerts={false}
        filesLimit={1}
      />
    
     {/* <h5>{progress}% Uploaded</h5> */}
     <LinearProgress style={{marginTop: 10}} variant="determinate" value={progress} />
     <div style={{display: 'flex', justifyContent: 'center'}}>
       {url ?
         getPreview(url)
         : <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAREAAAC4CAMAAADzLiguAAAANlBMVEXp7vG6vsHs8fS2ur3c4eTU2dzm6u3P1Ne4vL/u8/a4vL67v8G0ubzDx8rY3eDEyMvh5unKz9Izr04MAAADb0lEQVR4nO2c63KrIBRGFY1CY4x5/5c93nKiICZGGOvuWj86adowYc0HWxgxSQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOC3oiJwdJ/2oJr6Epy6Sc4qxeTXKtNPfoYfP9NXDj//f0xfv97oX2X6cU4l5pGl6TWNgdbF0b37AnPXUWwMVEd37wvqLKKQNnzm6A5uxcRMSEuWH93DrTRV/8XbaVBnQdFj9u4nm13Vpc+ILk3wy5FCn3LYqHL43hG+9ti0PqmRCNGO2HRMVJlGNqIx8mpakpEQyzRBRlSSd+u0vT0RY8Tkt6rq1mnXcl9fpBjp130DOt2Vk8HI9exG1G16VV81u5qWkBF7Ibxn6SrDSF5ZC7UdqxIRRoyzcZR9P25EGCnsiLRLwK87JMGIqt3NkjdL15VdQxFGSkfIm+v7Irt7jUmovm0f3B3o1Q7pVHuViMjIZeOo6aYdffP8hwQjSePuQq+U33Ee9ikRYcQ4tSar/Z996vMoEWHkue31wTSiJpV6WYkII4myjFS5rz/FdIAtKpFhxJpJqod3Xp3POEtKJFTf7vdGv2KSeYU4F7cLSoRkJFHJvRqcZDr3CnFrkntdIsVIW3CK8tam/ZEbb1+ckrSUEjlG2jeNUsbvw10PjimZf0KSkfVPLAyZxYHzV4woT0LcgSOk1rylWLu7YpaSv5KR9ftvpin5G0ZWhoyjRKIRU1tvF9XbO5JeSgQaMXU1nyrfJmSmRJ6RVkia3iZ/+CAhaVdcRiXijPRCpoPAex3iSYm06qvq+Q7ZZ0NmVDIxIiYjTyGdkv5vG4SINGIm9/32Kfl4yAg1YuppIlolWxIi0Yip7R2ybTdGizNiC9mMFlZr1O6zA8Iysjsh0oy0ZXf36SNRRsxlU1WRb8RcQpw/EmSkuw4JcGJPkJE6wJBJJVXfxXuMdho5d0YwkmDEBSM2GLGJboRaYxs5d0YSjNgZeVRBjoNXYowkTR6GsWkBRgI3jRG7aYzYTWPEbvqkRqI97sCc1MiwaaYfSRGa/JzPH3k+oyYNciEyZ2j4dE8Ac49vhmXHYdCjyOM+68p3QusXY8owm6uL6LPNqz0RlWTXozv3Haq5R5hXW66XMyakxwRb400p/IcNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4FD+AZS0NBe99dfKAAAAAElFTkSuQmCC'/>
       }
     </div>
     </Grid>       
          </Grid>
   
     </div>

       <div style={{display: 'flex', justifyContent: 'center', marginTop: '25px'}}>
         {!loading && <Button

            type="submit"
            style={{width: '50%', color: 'white', background: 'orange'}}
            variant="contained"
            color="primary"
            
          >
            Add Step
            </Button>}
         {
           loading && <Button
            type="submit"
            style={{width: '50%', color: 'white', background: 'orange'}}
            variant="contained"
            color="primary"
            disabled
            
          >Adding Step...</Button>
         }   
       </div>
         
          </form>
          </div>
          
        </Container>
        </Box>
          </Card>
        </div>
      </div>
        
        </>
    )
}

export default AddSteps
