import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TableCell, TableRow, TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { db } from '../../../firebase'
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';

import EditIcon from '@material-ui/icons/Edit';
import { Alert, AlertTitle } from '@material-ui/lab';
const ItemRow= ({row}) => {

    const [step, setStep] = useState(row.step)
    const [time1, setTime] = useState(row.time1)
    const [time2, setKeepTime] = useState(row.time2)
    const [temp1, setTemp] = useState(row.temp1)
    const [pressure, setPressure] = useState(row.pressure)
    const [openEdit, setOpenEdit] = useState(false)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
      const handleEditOpen = () => {
      setOpenEdit(true)
    }
    const handleEditClose = () => {
      setOpenEdit(false)
    }

     const handleDelete = (id) => {
    db.collection('recipeeData').doc(id).delete()
}
const updateRecipeValues=(id) => {
    setLoading(true)
    const recipeValues = {time1, time2, step, pressure, temp1}
    db.collection('recipeeData').doc(id).update(recipeValues).then((data) => {
        console.log(data)
       
        setLoading(false)
    })
    
  }

  function handleOpen(){
    setOpen(true)
  }

  function handleClose(){
    setOpen(false)
  }

    return (
         <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.step}
              </TableCell>
              <TableCell align="right">{row.time1}</TableCell>
              <TableCell align="right">{row.time2}</TableCell>
              <TableCell align="right">{row.temp1}</TableCell>
              <TableCell align="right">{row.pressure}</TableCell>
              <TableCell align="right">
                  <Button onClick={() => handleEditOpen()}><EditIcon/></Button>
                  <Button onClick={() => handleOpen()}><DeleteSweepIcon/></Button>
                  
                  </TableCell>
                 <Dialog
                    open={openEdit}
                    onClose={handleEditClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title"><b>Edit {step}</b></DialogTitle>
                    <DialogContent>
                     
                    <form   >
                        <TextField
                        label="Step"
                        defaultValue={step}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="title"
                          name="title"
                          autoFocus
                          onChange={(e) => setStep(e.target.value)}
                        />

                       <TextField
                        label="Time (min)"
                        defaultValue={time1}
                          variant="outlined"
                          margin="normal"
                          required
                          type='number'
                          fullWidth
                          id="title"
                          name="title"
                          autoFocus
                          onChange={(e) => setTime(e.target.value)}
                        />
                       <TextField
                        label="Keep Time (min)"
                        defaultValue={time2}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          type='number'
                          id="title"
                          name="title"
                          autoFocus
                          onChange={(e) => setKeepTime(e.target.value)}
                        />
                        <TextField
                        label="Temperature (deg C)"
                        defaultValue={temp1}
                          variant="outlined"
                          margin="normal"
                          required
                          type='number'
                          fullWidth
                          id="title"
                          name="title"
                          autoFocus
                          onChange={(e) => setTemp(e.target.value)}
                        />
                           
                        <TextField
                        label="Pressure (mT)"
                        defaultValue={pressure}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          type='number'
                          id="title"
                          name="title"
                          asutoFocus
                          onChange={(e) => setPressure(e.target.value)}
                        />

                       
                    
                    <DialogActions>
                      <Button color="secondary" onClick={handleEditClose}>Cancel</Button>
                       {!loading && <Button
                          type="submit"
                          fullWidth
                          variant="outlined"
                          color="primary"
                          disabled={step === ''|| temp1 === '' || pressure === '' || time1 === '' || time2 === ''}
                          onClick={(e)=> {
                              updateRecipeValues(row.id)
                                handleEditClose()
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
                     <Alert severity="info">Incomplete set of data will not allow you to update details !</Alert>
                  </form>
                    </DialogContent>
                </Dialog>
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
                        handleDelete(row.id);
                        }} color="secondary" variant="outlined" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
            </TableRow>
    )
}

export default ItemRow
