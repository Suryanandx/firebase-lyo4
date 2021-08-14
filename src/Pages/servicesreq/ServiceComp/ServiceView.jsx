import { Button, Dialog, DialogActions,Toolbar, DialogContent, DialogContentText, DialogTitle, TableBody, TableCell, TableRow, TextField, Typography } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"
import { useState } from "react"
import { db } from "../../../firebase"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function ServiceView({module, match}) {
	const [req, setReq] = useState(module.req)
	const [desc, setDesc] = useState(module.desc)
	const [inst, setInst] = useState(module.inst)
	const [connection, setConnection] = useState(module.connection)
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
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('config')
		.collection('components')
		.doc(module.id)
		.update({inst,connection,req, desc})
	}
	function handleDelete(id){
		db.collection('DQNew').doc(match.params.id)
		.collection('content').doc('config')
		.collection('components')
		.doc(id)
		.delete()
	}
	return (
		<>
		<TableBody>
			
			<TableRow key={module.id}>
				
			<TableCell className='text-3xl'  scope="row">
				⚫
			</TableCell>
			<TableCell align="left">{module.desc}</TableCell>
			<TableCell align="left">{module.req}</TableCell>
			<TableCell align="left">{module.inst}</TableCell>
			<TableCell align="left">{module.connection}</TableCell>
			
			<TableCell align="right">
				<div>
					<Button  onClick={handleOpen}><EditIcon/></Button>
					<Button onClick={handleOpenDel}><DeleteIcon/></Button>
		
				</div>
			</TableCell>
			</TableRow>
		
			</TableBody>
			 <Dialog style={{alignItems: 'center'}} fullWidth open={open} onClose={handleClose}>
				<DialogContent>
					<Typography variant='h4' align='center' gutterBottom><b>Edit Details</b></Typography>
					<form  >
						<TextField value={desc} style={{marginBottom: '30px'}} multiLine rows={5} variant='outlined' label='Description' fullWidth onChange={(e) => setDesc(e.target.value)}/>
		<TextField style={{marginBottom: '30px'}} multiLine value={req} rows={5} variant='outlined' label='Requirement' fullWidth onChange={(e) => setReq(e.target.value)}/>
		<TextField style={{marginBottom: '30px'}} multiLine value={inst} rows={5} variant='outlined' label='Instrument / gauges' fullWidth onChange={(e) => setInst(e.target.value)}/>
			
		<TextField style={{marginBottom: '30px'}} multiLine value={connection} rows={5} variant='outlined' label='Preferred Pipe & Connection' fullWidth onChange={(e) => setConnection(e.target.value)}/>		
	
					</form>
				</DialogContent>
				
				
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button disabled={inst === '' || desc==='' || connection === ''|| req ===''} onClick={handleUpdate} style={{backgroundColor: 'orange', color: 'whitesmoke'}}>Update</Button>
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
		
		</>
	)
}

export default ServiceView
