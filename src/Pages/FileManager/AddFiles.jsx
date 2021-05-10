import { Box, Button, Card, Container, Grid, InputLabel, makeStyles, Select, TextField, Typography } from '@material-ui/core'
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
import moment from 'moment';
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


const AddFiles = ({match}) => {


  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [format, setFormat] = useState('')
   const [type, setType] = useState('');
 const date= moment(new Date()).format('DD/MM/YYYY')
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
    
  }, [])
  const handleChange = (loadedFiles) => {
        let selectedFile = loadedFiles[0]
        setFile(selectedFile)
       
    }
    const { progress, url } = useStorage(file);

    const handleSubmit = (e) => {
    e.preventDefault();
    const index = indexD.length
    const steps = {title, desc, url, date};
    setLoading(true);
    db.collection('FileManager').add(steps).then(()=>{
      setLoading(false)
      setMessage('Step Added successfully !')
      history.push('/file-manager')
    })
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
            <Alert severity="info">You are currently Adding New Files </Alert>
            <br/>
            <Typography component="h1" variant="h3" align='center'>
          <b>Add  New File</b>
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
              value={title}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Document Name"
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
              
          </Grid>
         
          
              <Grid
            xs={12}
            lg={12}
            sm={12}
            >
      <Alert severity="warning">Don't leave Media Field empty !</Alert>
      <br/>
       <InputLabel variant="contained">Add the New File</InputLabel>
       <DropzoneArea
       showPreviews={true}
       dropzoneClass={classes.drop}
        showFileNames
        onChange={(loadedFiles) => handleChange(loadedFiles)}
        dropzoneText="Drag and Drop / Click to Add Files"
        showPreviewsInDropzone={false}
         useChipsForPreview
        showAlerts={false}
        filesLimit={1}
      />
    
     <h5>{progress}% Uploaded</h5>
     
     </Grid>       
          </Grid>
   
     </div>

         {!loading && <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add File
            </Button>}
         {
           loading && <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled
            className={classes.submit}
          >Adding Files, Please Wait...</Button>
         }   
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

export default AddFiles