import React, { useEffect, useState } from 'react';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, InputLabel, makeStyles, Select, Snackbar, TextField, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { db, storageRef } from '../../firebase';
import { Alert, AlertTitle } from '@material-ui/lab';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useStepStorage } from '../../utils/useStepStorage';
const useStyles = makeStyles((theme) => ({
  root: {
    borderBottomColor: "black",
    backgroundColor: 'white',
  
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  dataBox:{
      borderRadius: "20px",
      background: 'white',
     
      alignItems: "center"
  },
  divButton: {
      color: "#32e0c4",
      
  }
}));

const StepItem = ({ data})  => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openView, setOpenView] = useState(false)
    const [title, setTitle] = useState(data.title)
    const [desc, setDesc] = useState(data.desc)
     const [file, setFile] = useState(null)
     const [format, setFormat] = useState(data.format)
    const [createdAt, setCreatedAt] = useState(data.createdAt)
     const [type, setType] = useState(data.type);
    const [error,setError] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false);
    const types = ["image/png", "image/jpeg", "image/jpg"];
    const videoTypes = ["video/mp4", "video/mkv", "video/mov"];
   const audioTypes = ["audio/mp3", "audio/mpeg"]
       const handleChange = (e) => {
        let selectedFile = e.target.files[0]
        setDisabled(false)
           if (selectedFile) {
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
          const { progress, url } = useStepStorage(file);

          function getMedia(){
            if (format === 'image'){
              return <img className="h-64 bg-cover lg:rounded-lg lg:h-full"  src={data.url}/>
            }else if(format === 'video'){
              return  (
                <div className="h-64 bg-cover lg:rounded-lg lg:h-full">
                  <video  controls>
                <source src={data.url}/>
              </video>
                </div>
              )
            }else if(format === 'audio'){

              return (
              <div className="h-64 bg-cover lg:rounded-lg lg:h-full">
                <audio style={{marginTop: '15%', marginRight: '50px'}} controls>
             <source src={data.url}/>
              </audio>
              </div>
              )
            }
          }

    const handleView = () => {
      setOpenView(true)
      
    }

    const handleViewClose = () => {
      setOpenView(false)
    }

    const handleClickOpen = () => {
    setOpen(true);
  };

   const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
      setOpenEdit(true)
    }
  const handleEditClose = () => {
      setOpenEdit(false)
    }

  const handleDelete = (id) => {
    db.collection('stepData').doc(id).delete().then((data) => {
      return(
        <Snackbar ></Snackbar>
      )
    })
}
const handleImageUpdate = (id) => {
  const reqData = {url}
      db.collection('stepData').doc(id).update(reqData).then((data)=>{
        setLoading(false)
      
        console.log(data)
      })
}
const updateStep=(id) => {
    setLoading(true)
    
    const reqData = {title,desc,type,format}
      db.collection('stepData').doc(id).update(reqData).then((data)=>{
        setLoading(false)
        
        console.log(data)
      })
  }

  function getType() {
    if(type === 'info'){
      return(
        <div class="flex-shrink-0 w-24 h-24 text-blue-900 rounded-full inline-flex items-center justify-center">
          <svg  class="bi bi-info-square w-12 h-12" viewBox="0 0 24 24" fill="currentColor"  >
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
</svg>
        </div>
      )
    }else if (type === 'critical'){
      return(
        <div class="flex-shrink-0 w-24 h-24  text-yellow-900 rounded-full inline-flex items-center justify-center">
          
          <svg  fill="currentColor"  class="w-12 h-12" viewBox="0 0 24 24">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
        </svg>
        </div>
      )
    }else if ( type === 'normal'){
      return(
        <div class="flex-shrink-0 w-24 h-24  text-yellow-900 rounded-full inline-flex items-center justify-center">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-12 h-12" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </div>
      )
    }else if (type === 'camera'){
      return(
         <div class="flex-shrink-0 w-24 h-24  text-green-700 rounded-full inline-flex items-center justify-center">
          <svg fill="currentColor"  class="w-12 h-12" viewBox="0 0 24 24" >
  <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
  <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
</svg>
      </div>
      )

     
      
    }
  }
    return (
        
        <Container>
            <div className={classes.dataBox}>
            <Grid xs={12}>
                
         <section class="text-gray-600 body-font">
  <div class="container  mx-auto flex flex-wrap">
    <div class="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto">
      <div class="h-full w-6 absolute inset-0 flex items-center justify-center">
        <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
      </div>
      <div class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-yellow-800 text-white relative z-10 title-font font-medium text-sm">{data.index + 1}</div>
      <div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
        {getType()}
        <div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
          <h2 class="font-medium title-font text-gray-900 mb-1 text-xl">{data.title}</h2>
          <p class="leading-relaxed">{data.desc}</p>
        </div>
        <Button startIcon={<EditIcon/>}  onClick={handleEdit}  color="primary"></Button>
            <Button startIcon={<VisibilityIcon/>} 
            onClick={() =>
             {handleView()}} 
             className={classes.divButton}></Button>
            <Button startIcon={<DeleteForeverIcon/>}  onClick={handleClickOpen}  color="secondary"></Button>
      </div>
    </div>   
  </div>
</section>
            </Grid>
           
              <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                  <Alert severity="error" variant="filled">
                    <AlertTitle><strong>Delete</strong></AlertTitle>
                    <DialogTitle id="alert-dialog-title">{"Are You Sure You Want To Delete?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText color="white" id="alert-dialog-description">
                        Deleting will be a permanent action and data pervailing will be permanently deleted and can not be retrieved back.                    </DialogContentText>
                    </DialogContent>
                    </Alert>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary" variant="outlined">
                        Disagree
                    </Button>
                    <Button   onClick={(e)=>{
                        handleDelete(data.id);
                         handleClose()}} color="secondary" variant="outlined" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openEdit}
                    onClose={handleEditClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{<b>Edit {title}</b>}</DialogTitle>
                    <DialogContent>
                 
                    <form className={classes.form}  >
                        <TextField
                       
                        defaultValue={title}                       
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="title"
                          name="title"
                          autoFocus
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                        defaultValue={desc}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="desc"
                          onChange={(e) => setDesc(e.target.value)}
                          id="desc"
                          multiline
                        />
                        <InputLabel>Select Type</InputLabel>
                        <Select
                        variant='outlined'
                        value={type}                      
                          fullWidth
                          InputLabelProps={{
                            shrink: true,
                          }}
                          onChange={(e) => setType(e.target.value)}
                          style={{marginBottom: '15px'}}
                        >
                          <option value='info'>Info</option>
                          <option value='camera'>Camera</option>
                            <option value='critical'>Critical</option>
                            <option value='normal'>Normal</option>
                        </Select>
                        <br/>
                        <InputLabel >Select Format </InputLabel>
                          <Select
                          variant='outlined'
                          value={format}
                            label="Select Format"
                          required
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={(e) => setFormat(e.target.value)}
                          >
                            <option value='image'>Image</option>
                            <option value='video'>Video</option>
                              <option value='audio'>Audio</option>
                              
                          </Select>
                          {getMedia()}
                         <Alert>To Update Media Click <b>'Update Media'</b> After uploading a new Media file</Alert>
                        <InputLabel>Replace the current Media file</InputLabel>
                         <input type="file"  onChange={handleChange} />
                         {
                           <div>
                              <h4>{progress}% uploaded</h4>
                           </div>
                          
                         }
                       <Button disabled={disabled} style={{color: 'orangered'}} variant='outlined' fullWidth onClick={() => handleImageUpdate(data.id)}>Update Media</Button>
                    <DialogActions>
                      <Button color="secondary" onClick={handleEditClose}>Cancel</Button>
                       {!loading && <Button
                          type="submit"
                          
                          variant="outlined"
                          color="primary"
                          className={classes.submit}
                          onClick={(e)=> 
                            {updateStep(data.id);
                               handleEditClose();
                          }}
                        >
                          Update
                          </Button>}
                      {
                        loading && <Button
                          type="submit"
                         
                          variant="outlined"
                          color="primary"
                          disabled
                          className={classes.submit}
                        >Updating values...</Button>
                      }   
                    </DialogActions>
                     
                  </form>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={openView}
                    onClose={handleViewClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"View Data"}</DialogTitle>
                    <DialogContent>
                    
                    <form className={classes.form}  >
                        <TextField
                        defaultValue={title}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="title"
                          name="title"
                          autoFocus
                          disabled
                        />
                        <TextField
                        defaultValue={desc}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="desc"
                          disabled
                          id="desc"
                          multiline
                        />
                        {getMedia()}
                    <DialogActions>
                      <Button color="secondary" onClick={handleViewClose}>Cancel</Button>
                      <Button>Next </Button>
                    </DialogActions>
                     
                  </form>
                    </DialogContent>
                </Dialog>
            </div>
            
        </Container>
    )
}

export default StepItem