import { Button, Dialog, DialogActions,Toolbar, DialogContent, DialogContentText, DialogTitle, TableBody, TableCell, TableRow, TextField, Typography } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"
import { useState } from "react"

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { db } from "../../firebase";
import { useStorage } from "../../utils/useStorage";
import moment from "moment";

function PrintView({data, match}) {
	const [name, setTitle] = useState(data.name)
	const [error, setError] = useState('')
	const types = ["image/png", "image/jpeg", "image/jpg"];
	const [file, setFile] = useState(null)
	const [open, setOpen] = useState(false)
	const [openDel, setOpenDel] = useState(false)
	
	function handleOpenDel(){
		setOpenDel(true)
	}
	function handleCloseDel(){
		setOpenDel(false)
		
	}
	
	function handleOpen(){
		setOpen(true)
	}
	function handleClose(){
		setOpen(false)
	}
	function handleUpdate(){
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('approval')
		.collection('customer')
		.doc(data.id)
		.update({name})
	}
	function handleDelete(id){
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('approval')
		.collection('customer')
		.doc(id)
		.delete()
	}
	const handleChange = (e) => {
        let selectedFile = e.target.files[0];
        
        if (selectedFile) {
            if (types.includes(selectedFile.type)) {
                setError(null)
                setFile(selectedFile);
            } else {
                setFile(null);
                setError("Please select an image file (png or jpg)");
            }
        }
       
        
    }

    const {progress, url} = useStorage(file)
	return (
		<>
		<TableBody>
	
			<TableRow key={data.id}>
			<TableCell style={{background: '#E8F6EF'}} component="th" scope="row">
				{data.name}
			</TableCell>
			<TableCell align="left"><img src={data.url} width='350px' height='250px'/></TableCell>
			<TableCell align="left">{data.timestamp.toDate().toString().substring(0,15)}</TableCell>
			
			{/* <TableCell align="right">
				<div>
					<Button  onClick={handleOpen}><EditIcon className='animate-bounce'/></Button>
					<Button onClick={handleOpenDel}><DeleteIcon className='hover:text-red-600'/></Button>
					
				</div>
			</TableCell> */}
			</TableRow>
		
			</TableBody>
			 <Dialog style={{alignItems: 'center'}} fullWidth open={open} onClose={handleClose}>
				<DialogContent>
					<Typography variant='h4' align='center' gutterBottom><b>Edit Details</b></Typography>
					<form  >
					<TextField style={{marginBottom: '3%'}} value={name} variant='outlined' fullWidth onChange={(e) => setTitle(e.target.value)}/>
					<div>
						<img src={data.url} height='350px' width="450px" />
						<br />
						<input type="file" onChange={handleChange}/>
					</div>

				</form>
				</DialogContent>
				
				
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleUpdate} style={{backgroundColor: 'orange', color: 'whitesmoke'}}>Update</Button>
			</DialogActions>
			</Dialog>
			{/* Open delete dialog */}
			 <Dialog
			 
                    open={openDel}
                    onClose={handleCloseDel}
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
                    <Button onClick={handleCloseDel} color="primary" variant="outlined">
                        Disagree
                    </Button>
                    <Button   onClick={(e) => handleDelete(data.id)} color="secondary" variant="outlined" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
		
		</>
	)
}

export default PrintView
