import { Table,Button, Dialog, DialogActions,Toolbar, DialogContent, DialogContentText, DialogTitle, TableBody, TableCell, TableRow, TextField, Typography, Collapse, Box, TableHead } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"
import { useEffect, useState } from "react"
import { db } from "../../../firebase"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { firebaseLooper } from "../../../utils/tools";
import DQComponentsView from "../../DQPages/DQCOnfigDetails/DQComponentsView";
import DQComponents from "../../DQPages/DQCOnfigDetails/DQComponents";
import BrandView from "../../brands/brandsComp/BrandView";
import ServiceView from "../../servicesreq/ServiceComp/ServiceView";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
function DQConfigView({module, match,type}) {
	const [title, setTitle] = useState(module.title)
	const[length,setLength] = useState(0)
	const [desc, setDesc] = useState(module.desc)
	const [open, setOpen] = useState(false)
	const [openDel, setOpenDel] = useState(false)
	const [openC, setOpenC] = useState(false)
    const [components, setComponents] = useState([])
    useEffect(() => {
        db.collection('DQNew').doc(match.params.id)
        .collection('content').doc('config')
        .collection('components') 
        .where('module_id', '==', module.id)
        .onSnapshot(snap => {
            const data = firebaseLooper(snap)
	    data.sort(function(a,b){
		    return(a.index-b.index)
	    })
            setComponents(data)
	    setLength(data.length)
        })
    }, [])
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
		.doc('config')
		.collection('module')
		.doc(module.id)
		.update({title, desc})
	}
	function handleDelete(id){
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('config')
		.collection('module')
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
					<Button onClick={(e) => setOpenC(!openC)}>{!openC ? <ExpandMoreIcon/> : <ExpandLessIcon/>}</Button>
				</div>
			</TableCell>
			</TableRow>
            <Collapse in={openC} timeout="auto" unmountOnExit>
                <DQComponents index={length} type={type} match={match} module_id={module.id}/>
           { type ===0 &&
           <div style={{display: 'flex', justifyContent: 'center'}}  >
              <br />
              <Table align aria-label="purchases">
                <TableHead>
                  
                  <TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}}><b className='text-md font-bold italic'>Title</b></TableCell>
				<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="left"><b className='text-md font-bold italic'>Value</b></TableCell>
				<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right"><b className='text-md font-bold italic'>Actions</b></TableCell>
                 
                </TableHead>
                <>
               
                  {
                  components.map(data => (
                      <DQComponentsView match={match} key={data.id} components={data}/>
                  ))
                }
                    
                </>
              </Table>
            </div>}
            {
                type===1 &&
                <div style={{display: 'flex', justifyContent: 'center'}}  >
                <br />
                <Table align aria-label="purchases">
                  <TableHead>
                    
			<>
			<TableRow>
				<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}}></TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}}><b className='text-md font-bold italic'>Description</b></TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="left"><b className='text-md font-bold italic'>Required Parameters</b></TableCell>
			
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="left"><b className='text-md font-bold italic'>Instrument/Gauges</b></TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="left"><b className='text-md font-bold italic'>Preferred Pipe & Connection</b></TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right"><b className='text-md font-bold italic'>Options</b></TableCell>
			
			</TableRow>
			</>
                   
                  </TableHead>
                  <>
                  
                    {
                    components.map(data => (
                        <ServiceView match={match} key={data.id} module={data}/>
                    ))
                  }
                      
                  </>
                </Table>
              </div>
            }
          </Collapse>
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
                
	   
		</>
	)
}

export default DQConfigView
