import { Button, Dialog, DialogActions,Toolbar, DialogContent, DialogContentText, DialogTitle, TableBody, TableCell, TableRow, TextField, Typography } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"
import { useState } from "react"
import { db } from "../../../firebase"
import DQComponents from "../DQCOnfigDetails/DQComponents"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
function DQConfigView({module, match}) {
	const [title, setTitle] = useState(module.title)
	const [desc, setDesc] = useState(module.desc)
	const [open, setOpen] = useState(false)
	const [openDel, setOpenDel] = useState(false)
	const [openC, setOpenC] = useState(false)
	function handleOpenDel(){
		setOpenDel(true)
	}
	function handleCloseDel(){
		setOpenDel(false)
		
	}
	function openComponent(){
		setOpenC(true)
	}
	function closeComponent(){
		setOpenC(false)
	
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
		.collection('modules')
		.doc(module.id)
		.update({title, desc})
		.then(() => {setOpen(false)})
	}
	function handleDelete(id){
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('configuration')
		.collection('modules')
		.doc(id)
		.delete()
	}
	return (
		<>
		<TableBody>
			
			<TableRow key={module.id}>
			<TableCell style={{background: '#E8F6EF'}} component="th" scope="row">
				{module.title}
			</TableCell>
			<TableCell align="left">{module.desc}</TableCell>
			<TableCell align="right">
				<div>
					<Button  onClick={handleOpen}><EditIcon className='animate-bounce'/></Button>
					<Button onClick={handleOpenDel}><DeleteIcon className='hover:text-red-600'/></Button>
					<Button onClick={openComponent}>Open</Button>
				</div>
			</TableCell>
			</TableRow>
		
			</TableBody>
			 <Dialog style={{alignItems: 'center'}} fullWidth open={open} onClose={handleClose}>
				<DialogContent>
					<Typography variant='h4' align='center' gutterBottom><b>Edit Details</b></Typography>
					<form  >
					<TextField style={{marginBottom: '3%'}} value={title} variant='outlined' fullWidth onChange={(e) => setTitle(e.target.value)}/>
				<TextField multiline rows={7} value={desc} variant='outlined' fullWidth onChange={(e) => setDesc(e.target.value)}/>
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
                    <Button   onClick={(e) => handleDelete(module.id)} color="secondary" variant="outlined" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
		<Dialog fullScreen open={openC} onclose={closeComponent}>
			<Toolbar>
			<Button onClick={closeComponent}>close</Button>
			</Toolbar>
			<b>{module.id}</b>
			<DQComponents key={module.id} match={match} module_id={module.id} />
		</Dialog>
		</>
	)
}

export default DQConfigView
