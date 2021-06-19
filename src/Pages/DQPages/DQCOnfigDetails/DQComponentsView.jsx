import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TableBody, TableCell, TableRow, TextField, Typography } from "@material-ui/core"
import { RemoveCircleTwoTone } from "@material-ui/icons"
import { Alert, AlertTitle } from "@material-ui/lab"
import { useState } from "react"
import { db } from "../../../firebase"

function DQComponentsView({components, match, module_id}) {
	const [title, setTitle] = useState(components.title)
	const [value, setValue] = useState(components.value)
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
		.doc('configuration')
		.collection('components')
		.doc(components.id)
		.update({title, value})
	}
	function handleDelete(id){
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('configuration')
		.collection('components')
		.doc(components.id)
		.delete()
	}
	return (
		<>
		<TableBody>
			
			<TableRow key={module.id}>
			<TableCell component="th" scope="row" align='center'>
				{components.title}
			</TableCell>
			
			<TableCell  align='left'>
				{components.value}
			</TableCell>
			<TableCell align="right">
				<div>
					<Button onClick={handleOpen}>E</Button>
					<Button onClick={handleOpenDel}>D</Button>
					
				</div>
			</TableCell>
			</TableRow>
		
			</TableBody>
			 <Dialog style={{alignItems: 'center'}} fullWidth open={open} onClose={handleClose}>
				<DialogContent>
					<Typography variant='h4' align='center' gutterBottom><b>Edit Details</b></Typography>
					<form  >
					<TextField style={{marginBottom: '3%'}} value={title} variant='outlined' fullWidth onChange={(e) => setTitle(e.target.value)}/>
					<TextField style={{marginBottom: '3%'}} value={value} variant='outlined' fullWidth onChange={(e) => setValue(e.target.value)}/>
				</form>
				</DialogContent>
				
				
			<DialogActions>
				<Button variant='contained' color='secondary' onClick={handleClose}>Cancel</Button>
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
                    <Button   onClick={(e) => handleDelete(components.id)} color="secondary" variant="outlined" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
		</>
	)
}

export default DQComponentsView
