import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import EditIcon from '@material-ui/icons/Edit';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Alert, AlertTitle } from '@material-ui/lab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { db } from '../../../firebase';
const useStyles = makeStyles((theme) => ({
  root: {
    borderBottomColor: "black",
    backgroundColor: theme.palette.background.dark,
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
      boxShadow: "10px 20px 30px #f8f1f1",
      marginBottom: "50px",
      alignItems: "center",
      justifyContent: "center",
      justifyItems: "center"
  },
  divButton: {
      backgroundColor: "#32e0c4",
      marginRight: "20px",
      color: "white",
      borderRadius: "10px"

  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
      border: "#141256",
      borderRadius: '20px',
      margin: theme.spacing(3, 0, 2),
  }
}));

const ComponentDataBox = ({data}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [title, setContentName] = useState(data.title)
    const [value, setValue] = useState(data.value);
    const [createdAt, setCreatedAt] = useState(data.createdAt);
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState()
   const history = useHistory();

   const handleEdit = () => {
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
    db.collection('componentData').doc(id).delete()
}

  const updateContent=(id) => {
    setLoading(true)
    db.collection('componentData').doc(id).update({title, value}).then((data) => {
        console.log(data)
        window.location.reload()
        setLoading(false)
    })
    
  }


    return (
        <div>
             <div className={classes.dataBox}>
               <Container maxWindth="sm" sm={12}>
              <TableContainer component={Paper}>
      <Table style={{minWidth: 500}} aria-label="custom pagination table">
        <TableBody>
         
            <TableRow key={data.id}>
              <TableCell component="th" scope="row">
               <b> {data.title} </b>
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {data.value}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
              <Button style={{ marginRight: "20%", marginTop: '0', marginBottom: '0'}} startIcon={<EditIcon/>} onClick={handleEdit}   color="primary">Edit</Button>
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                <Button style={{ marginLeft: "20%"}} onClick={handleClickOpen}  color="secondary" startIcon={<DeleteIcon/>}>Delete</Button>
           
              </TableCell>
              

            </TableRow>
        </TableBody>
      </Table>
      
    </TableContainer>
           <div style={{marginLeft: '25%'}}>
             
            {/* <Button style={{marginRight: "20%"}} startIcon={<AccountTreeIcon/>} variant="contained" className={classes.divButton}><Link to={`/Content/${data.id}/Steps`} style={{color: "white" ,textDecoration: "none"}}> Steps</Link></Button> */}
           
           </div>
            
                {/* Dialogs */}

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
                        Deleting will be a permanent action and data pervailing will be permanently deleted and can not be retrieved back.
                    </DialogContentText>
                    </DialogContent>
                    </Alert>
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
                <Dialog
                    open={openEdit}
                    onClose={handleEditClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{`Edit ${title}`}</DialogTitle>
                    <DialogContent>
                      <Alert severity="info" variant="standard">You are currently editing Contents data</Alert>
                    <form className={classes.form}  >
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
                        label="Expected Value"
                        defaultValue={value}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="title"
                          name="title"
                          autoFocus
                          onChange={(e) => setValue(e.target.value)}
                        />
                       
                    
                    <DialogActions>
                      <Button color="secondary" onClick={handleEditClose}>Cancel</Button>
                       {!loading && <Button
                          type="submit"
                          fullWidth
                          variant="outlined"
                          color="primary"
                          className={classes.submit}
                          onClick={(e)=> updateContent(data.id)}
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
                          className={classes.submit}
                        >Updating values...</Button>
                      }   
                    </DialogActions>
                     
                  </form>
                    </DialogContent>
                </Dialog>
            </Container>
            </div>
        </div>
    )
}

export default ComponentDataBox
