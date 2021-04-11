import React, { useState } from 'react'
import { Grid, Card, CardContent, Button, makeStyles, Typography, Container, Dialog, DialogTitle, DialogContentText, DialogContent, TextField, DialogActions } from '@material-ui/core';
import { Alert } from 'bootstrap';
import { AlertTitle } from '@material-ui/lab';
import { db } from '../../firebase';
import { DescriptionTwoTone } from '@material-ui/icons';

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
        window.location.reload()
        setLoading(false)
    })
    
  }
        

    return (
       
            <Grid item xs={12} sm={6} md={4} key={data.id}>
                    <Card className="mb-4">
                        
                        <CardContent className="p-3">
                        <h5 className="card-title font-weight-bold font-size-lg">
                            {data.title}
                        </h5>
                        <p className="card-text">
                            {data.desc}
                        </p>
                        <Button href={`/Manuals/${data.id}/Steps`} style={{backgroundColor:'orangered', color: 'white'}} variant="contained">
                            Steps
                        </Button>
                         <Button onClick={() => handleEditOpen()} style={{color: 'darkblue'}}>Edit</Button>
                          <Button onClick={() => handleClickOpen()} style={{color: 'red'}}>Delete</Button>
                        </CardContent>
                      
                    </Card>
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
                       
                       
                    
                    <DialogActions>
                      <Button color="secondary" onClick={handleEditClose}>Cancel</Button>
                       {!loading && <Button
                          type="submit"
                          fullWidth
                          variant="outlined"
                          color="primary"
                         
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
