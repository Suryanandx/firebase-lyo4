import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import React, { useState } from 'react'
import { db } from '../../firebase'
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
const FileView = ({data}) => {
   const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
      const [title, setTitle] = useState(data.title)
    const [desc, setDesc] = useState(data.desc)
    
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
    db.collection('FileManager').doc(id).delete()
}
const updateFile=(id) => {
    const reqData = {title,desc}
      db.collection('FileManager').doc(id).update(reqData).then((data)=>{
              console.log(data)
      })
  }
    return (
        <div className="overflow-hidden transition-shadow duration-300 bg-white rounded shadow-sm">
          <img
            src="https://img.freepik.com/free-vector/illustration-document-icon_53876-28510.jpg?size=626&ext=jpg"
            className="object-cover w-full h-64"
            alt=""
          />
          <div className="p-5 border border-t-0">
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
              <a
                href='#'
                className="transition-colors duration-200 text-blue-gray-900 hover:text-deep-purple-accent-700"
                aria-label="Category"
                title="traveling"
              >
                Uploaded on
              </a>
              <span className="text-gray-600">— {data.date}</span>
            </p>
            <Button onClick={handleEdit}><EditIcon/></Button>
             <Button onClick={handleClickOpen}><DeleteForeverIcon/> </Button>
            </div>
            
            <a
              href={data.url}
              aria-label="Category"
              title="Simple is better"
              className="inline-block mb-3 text-2xl font-bold leading-5 transition-colors duration-200 hover:text-yellow-700 text-yellow-900"
            >
              {data.title}
            </a>
            <p className="mb-2 text-gray-700">
              {data.desc}
            </p>
            <a
              href={data.url}
              aria-label=""
              className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              Open
            </a>
          </div>
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
                 fullWidth
                    open={openEdit}
                    onClose={handleEditClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                   <DialogTitle id="alert-dialog-title">{<b>Edit {title}</b>}</DialogTitle>
                      <DialogContent>

                           <form >
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
                          rows={5}
                          fullWidth
                          name="desc"
                          onChange={(e) => setDesc(e.target.value)}
                          id="desc"
                          multiline
                        />
                          <DialogActions>
                            <Button color="secondary" onClick={handleEditClose}>Cancel</Button>
                            <Button type='submit'  onClick={(e)=> 
                            {updateFile(data.id);
                               handleEditClose();
                          }} variant='outlined' color='primary'>Update</Button> 
                          </DialogActions>
                      </form>  
                      </DialogContent>
               
                </Dialog>
        </div>
    )
}

export default FileView
