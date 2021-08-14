import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormHelperText, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { Alert, AlertTitle } from '@material-ui/lab';


export default function RecipeData({rows, length, match}) {
    const [title, setTitle] = useState(rows.title)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)

 const handleEditOpen = () => {
      setOpenEdit(true)
    }
    const handleEditClose = () => {
      setOpenEdit(false)
    }
    const handleOpen = () =>{
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = (id) => {
        db.collection('recipes').doc(id).delete().then(() =>{
            console.log('data deleted')
        })
    }
   const updateRecipe=(id) => {
    setLoading(true)
    db.collection('recipes').doc(id).update({title}).then((data) => {
        console.log(data)
       
        setLoading(false)
    })
    
  }
 
  return (
    <TableContainer component={Paper}>
      <Table style={{minWidth: 500}} aria-label="custom pagination table">
        <TableBody>
         
            <TableRow key={rows.id}>
              <TableCell component="th" scope="row">
                <b>{rows.title}</b>
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {rows.createdBy}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
               <Button ><Link to={`/Recipe/${rows.id}/Recipe-values`} style={{textDecoration: 'none', color: 'inherit'}}>Open</Link></Button>
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
              <Button onClick={() => handleEditOpen()} style={{color: 'darkblue'}}>Edit</Button>
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
               <Button onClick={handleOpen} style={{color: 'red'}}>Delete</Button>
              </TableCell>
              
               
            </TableRow>
        </TableBody>
      </Table>
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
                    handleDelete(rows.id);
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
                    <DialogTitle id="alert-dialog-title">{`Edit ${title}`}</DialogTitle>
                    <DialogContent>
                     
                    <form   >
                        <TextField
                        label="Recipe Name"
                        defaultValue={title}
                        error={title=== "" || title.length > 40}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="title"
                          name="title"
                          autoFocus
                          onChange={(e) => setTitle(e.target.value)}
                        />
                    <FormHelperText>Title should be max {title.length}/40</FormHelperText>
                    <DialogActions>
                      <Button color="secondary" onClick={handleEditClose}>Cancel</Button>
                       {!loading && <Button
                          type="submit"
                          fullWidth
                          variant="outlined"
                          color="primary"
                         disabled={title=== "" || title.length > 40}
                          onClick={(e)=>{ 
                            updateRecipe(rows.id);
                            handleEditClose();
                          }}
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
    </TableContainer>
  );
}