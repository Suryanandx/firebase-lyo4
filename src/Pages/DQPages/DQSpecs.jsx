import { DialogContent, makeStyles,  Paper,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow  } from "@material-ui/core";
import { Button, Dialog, Typography, TextField, DialogActions, Card } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useEffect } from "react"
import { useState } from "react"
import DQLayout from "../../components/DQNewSidebar/DQLayout";
import { db } from "../../firebase"
import { firebaseLooper } from "../../utils/tools";
import DQmodules from "../DQNew/DQmodules";
import DQConfigView from "./DQCOnfigDetails/DQConfigView";
import DQSpecsView from "./DQCOnfigDetails/DQSpecsView";
import DQModule from "./DQModule/DQModule";


const useStyles = makeStyles((theme) => ({
  layoutRoot: {
   backgroundColor: 'whitesmoke',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#141256',
  },
 wrapper: {
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 250
  },
  
  },
  container: {
      display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
  },
  content: {
   padding: '20px',
      flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
    },
}));

function DQSpecs({match}) {
	const [purpose, setPurpose] = useState({})
	const [name, setName] = useState('')
	const [review, setReview] = useState('')
	const [specs,setSpecs] = useState([])
	const [ desc, setDesc] = useState('')
	const [open, setOpen] = useState(false)
	const [openEdit, setOpenEdit] = useState(false)
	const [openAdd, setOpenAdd] = useState(false)
	const [index, setIndex] = useState(0)
		const [opendelete, setOpenDelete] = useState(false)
	const [titleModule, setTitleModule] = useState('')
	const [ descModule, setDescModule] = useState('')
	const classes = useStyles()

	function handleOpen(){
		setOpen(true)
	}
	function handleClose(){
		setOpen(false)
	}
	function handleOpenEdit(){
		setOpenEdit(true)
	}
	function handleCloseEdit(){
		setOpenEdit(false)
	}
	function handleOpenAdd(){
		setOpenAdd(true)
	}
	function handleCloseAdd(){
		setOpenAdd(false)
	}
	function handleOpenDel(){
		setOpenDelete(true)
	}
	function handleCloseDel(){
		setOpenDelete(false)
	}

	function handleUpdate(id){
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('specifications')
		
		.update({name, desc})
	}
	

	function handleSubmit(){
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('specifications')
		.collection('specDetails')
		.add({ desc,index})
	}

	function handleSubmitNew(){
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('specifications')
		.set({name, desc})
	}
	useEffect(() => {
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('specifications')
		.onSnapshot(snapshot => {
			const data = snapshot.data()
			setPurpose(data)
			if(data){
				setName(data.name)
				setDesc(data.desc)
			}
			
		})
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('specifications')
		.collection('specDetails')
		.onSnapshot(snapshot => {
			const data = firebaseLooper(snapshot)
			data.sort(function(a,b){
				return(a.index-b.index)
			})
			setSpecs(data)
			setIndex(data.length)
			
		})
	}, [])
	return (
		<div>
		
			<>
			<DQLayout match={match}/>
		 <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
           <div style={{height: '100vh'}}>
			{
			purpose ?	<>
				<Typography variant='h1' align='center' gutterBottom><b>{purpose.name}</b></Typography>
			<hr />
			<Typography variant='body1' align='left' gutterBottom><p className='italic'>{purpose.desc}</p></Typography>
			<hr />
			<div style={{display: 'flex', marginBottom: 'auto', paddingRight: '3%', justifyContent: 'flex-end'}}>
				<Button style={{color: 'white', background: 'black', marginRight: '4%'}} onClick={handleOpenAdd}>Add Specs</Button>
				<Button style={{color: 'white', background: 'orange'}} onClick={handleOpen}>Edit</Button>
				
			</div>
			<Dialog style={{alignItems: 'center'}} fullWidth open={open} onClose={handleClose}>
				<DialogContent>
					<Typography variant='h4' align='center' gutterBottom><b>Edit Details</b></Typography>
					<form  >
					<TextField style={{marginBottom: '3%'}} value={name} variant='outlined' fullWidth onChange={(e) => setName(e.target.value)}/>
				<TextField multiline rows={7} value={desc} variant='outlined' fullWidth onChange={(e) => setDesc(e.target.value)}/>
				</form>
				</DialogContent>
				
				
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleUpdate} style={{backgroundColor: 'orange', color: 'whitesmoke'}}>Update</Button>
			</DialogActions>
			</Dialog>
			{
					<>
					<TableContainer component={Paper}>
		<Table className={classes.table} aria-label="simple table">
			<TableHead>
			<TableRow>
			<TableCell align='center' ><b className='text-lg font-bold italic'>Description</b></TableCell>
			
			<TableCell align="right"><b className='text-lg font-bold italic'>Actions</b></TableCell>
			</TableRow>
			</TableHead>
					{
						specs.map(specs => (
				
							<>
							<DQSpecsView specs={specs} match={match} key={specs.id}/>	
			
					</>
						))
					}
					
		</Table>
		</TableContainer>
					</>
					}
					</>
					 :

					<div>
						<div style={{padding: '10%', paddingTop: '0'}} >
						<Typography variant='h1' align='center' gutterBottom><b>Add New Specification Details</b></Typography>	
						<TextField style={{marginBottom: '20px'}} label='Title' variant='outlined' fullWidth onChange={(e) => setName(e.target.value)}/>
						<TextField style={{marginBottom: '5%'}} label='Description' multiLine rows={7}  variant='outlined' fullWidth onChange={(e) => setDesc(e.target.value)}/>  
						<Button fullWidth style={{background: 'orange', color: 'white'}} onClick={handleSubmitNew}>Add New</Button>
					</div>
					</div>
			
		
		}
		</div>
		
          </Card>
        </div>
      </div>
      </> 
	
		<Dialog open={openAdd} fullWidth onClose={handleCloseAdd}>
          <Typography variant='h4' align='center' gutterBottom><b>Add New Specifications</b></Typography>
	 <Alert severity='info'>Reviews are generally added from glass</Alert>
	  <DialogContent>
		   <>
		<TextField required label='Description' style={{marginBottom: '20px'}} multiLine rows={5}  variant='outlined' fullWidth onChange={(e) => setDesc(e.target.value)}/>
		 
		
	  </> 
	  </DialogContent>
	  <DialogActions>
		  <Button disabled={desc===''} style={{background: 'orange', color:'white'}} onClick={handleSubmit}>Add New</Button>
	  </DialogActions>

	
          
      </Dialog>
     
		
	
	</div>
)}

export default DQSpecs
