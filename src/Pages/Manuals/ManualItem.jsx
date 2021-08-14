import React, { useState } from 'react'
import { Grid, Card, CardContent, Button, makeStyles, Typography, Container, Dialog, DialogTitle, DialogContentText, DialogContent, TextField, DialogActions, FormHelperText } from '@material-ui/core';
import { Alert } from 'bootstrap';
import { AlertTitle } from '@material-ui/lab';
import { db } from '../../firebase';
import { DescriptionTwoTone } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';

const ManualItem = ({data}) => {
     const [title, setContentName] = useState(data.title)
    const [desc, setDesc] = useState(data.desc);
    const [value, setValue] = useState(data.value);
    const [createdAt, setCreatedAt] = useState(data.createdAt);
   const [loading, setLoading] = useState(false);
   const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
     const handleEditOpen = () => {
      setOpenEdit(true)
    }
    const handleEditClose = () => {
      setOpenEdit(false)
    }

    const handleClickOpen = () => {
    setOpen(true);
  };

   const handleClose = () => {
    setOpen(false);
  };

     const handleDelete = (id) => {
    db.collection('manualData').doc(id).delete()
}

  const updateManual=(id) => {
    setLoading(true)
    db.collection('manualData').doc(id).update({title, desc}).then((data) => {
        console.log(data)
        setLoading(false)
    }).then(() => {setOpenEdit(false)})
    
  }
        

    return (
      
            <Grid item xs={12} sm={6} md={4} key={data.id}>
                    {/* <Card className="mb-4">
                        
                        <CardContent className="p-3">
                        <h5 className="card-title font-weight-bold font-size-lg">
                            {data.title}
                        </h5>
                        <p className="card-text">
                            {data.desc}
                        </p>
                        <Button href={`/Manuals/${data.id}/Steps`} style={{backgroundImage: 'linear-gradient(to right top, #f0782b, #ed7d2a, #ea8229, #e68729, #e38b29, #e39326, #e39b24, #e2a323, #e3b21f, #e1c21e, #ded122, #d8e12b)', color: 'white'}} variant="contained">
                            Steps
                        </Button>
                         <Button onClick={() => handleEditOpen()} style={{color: 'darkblue'}}>Edit</Button>
                          <Button onClick={() => handleClickOpen()} style={{color: 'red'}}>Delete</Button>
                        </CardContent>
                     
                    </Card> */}

    <div className="w-full max-w-sm px-4 py-3 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        {/* <div className="flex items-center justify-between">
            <span className="text-sm font-light text-gray-800 dark:text-gray-400">Courses and MOOCs</span>
            <span className="px-3 py-1 text-xs text-indigo-800 uppercase bg-indigo-200 rounded-full dark:bg-indigo-300 dark:text-indigo-900">psychology</span>
        </div> */}

        <div>
            
            <div className="flex items-center justify-between">
              <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">{data.title}</h1>
            
            <Button component={NavLink} style={{background: '#0C03EB'}} to={`/Manuals/${data.id}/Steps`} className="px-3 py-1 text-xs text-white uppercase bg-indigo-700 rounded-full dark:bg-indigo-300 dark:text-indigo-900">Steps</Button>
        </div>
           {data.desc &&  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{data.desc.slice(0,30)}</p>}
        </div>

        <div>
           

            <div className="flex items-center justify-center mt-4">
                <button onClick={() => handleEditOpen()} class="mr-2 text-gray-800 cursor-pointer dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
                </button>

                <button onClick={() => handleClickOpen()} className="mr-2 text-gray-800 cursor-pointer dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                  </svg>
                </button>
            </div>
        </div>
    </div>
                    <div>
                    <Dialog
                    open={openEdit}
                    onClose={handleEditClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{`Edit ${title}`}</DialogTitle>
                    <DialogContent>
                     
                    <form   >
                        <TextField
                        label="Content Name"
                        defaultValue={title}
                        error={title === "" || title.length > 35}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="title"
                          name="title"
                          autoFocus
                          onChange={(e) => setContentName(e.target.value)}
                        />
                        <TextField
                        label="Description"
                        defaultValue={desc}
                        error={desc === "" || desc.length > 300}
                        multiline
                        rows={5}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="title"
                          name="title"
                          autoFocus
                          onChange={(e) => setDesc(e.target.value)}
                        />
                       
                       <FormHelperText>Description should be {desc.length}/300</FormHelperText>
                    
                    <DialogActions>
                      <Button color="secondary" onClick={handleEditClose}>Cancel</Button>
                       {!loading && <Button
                          type="submit"
                          fullWidth
                          variant="outlined"
                          color="primary"
                          disabled={title==="" || desc==="" || desc.length > 300 || title.length > 35} 
                          onClick={(e)=> updateManual(data.id)}
                        >
                          Update
                          </Button>}
                      {
                        loading && <Button
                          type="submit"
                          fullWidth
                          variant="outlined"
                          color="primary"
                          disabled
                          
                        >Updating values...</Button>
                      }   
                    </DialogActions>
                     
                  </form>
                    </DialogContent>
                </Dialog>

                    </div>
                    
                
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                  
                    <DialogTitle id="alert-dialog-title">{"Are You Sure You Want To Delete?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText color="white" id="alert-dialog-description">
                        Deleting will be a permanent action and data pervailing will be permanently deleted and can not be retrieved back.
                    </DialogContentText>
                    </DialogContent>
                   
                    <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="primary">
                        Disagree
                    </Button>
                    <Button
                    variant="outlined"
                       onClick={(e)=>{
                        handleDelete(data.id);
                         handleClose()}} color="secondary" autoFocus>
                        Agree
                    </Button>
                    
                    </DialogActions>
                    
                </Dialog>
                </Grid> 
        
    )
}

export default ManualItem
