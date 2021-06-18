import { DialogContent, makeStyles,  Paper,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow  } from "@material-ui/core";
import { Button, Dialog, Typography, TextField, DialogActions, Card } from "@material-ui/core"
import { useEffect } from "react"
import { useState } from "react"
import DQLayout from "../../components/DQNewSidebar/DQLayout";
import { db } from "../../firebase"
import { firebaseLooper } from "../../utils/tools";
import DQmodules from "../DQNew/DQmodules";
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

function DQConfig({match}) {
	const [purpose, setPurpose] = useState({})
	const [title, setTitle] = useState('')
	const [modules,setModules] = useState([])
	const [ desc, setDesc] = useState('')
	const [open, setOpen] = useState(false)
	const [openEdit, setOpenEdit] = useState(false)
	const [openAdd, setOpenAdd] = useState(false)
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
		.doc('configuration')
		
		.update({title, desc})
	}
	function handleEditUpdate(id){
		const title = titleModule
		const desc = descModule

		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('configuration')
		.collection('modules')
		.doc(id)
		.update({title, desc})
	}

	function handleSubmit(){
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('configuration')
		.collection('modules')
		.add({title, desc})
	}
	useEffect(() => {
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('configuration')
		.onSnapshot(snapshot => {
			const data = snapshot.data()
			setPurpose(data)
			setTitle(data.title)
			setDesc(data.desc)
		})
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('configuration')
		.collection('modules')
		.onSnapshot(snapshot => {
			const data = firebaseLooper(snapshot)
			setModules(data)
			
		})
	}, [])
	return (
		<>
		
			(<>
			<DQLayout match={match}/>
		 <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
           <div style={{height: '100vh'}}>
			<Typography variant='h1' align='center' gutterBottom><b>{purpose.name}</b></Typography>
			<hr />
			<Typography variant='body1' align='left' gutterBottom><p className='italic'>{purpose.desc}</p></Typography>
			<hr />
			<div style={{display: 'flex', marginBottom: 'auto', paddingRight: '3%', justifyContent: 'flex-end'}}>
				<Button style={{color: 'white', background: 'black', marginRight: '4%'}} onClick={handleOpenAdd}>Add Module</Button>
				<Button style={{color: 'white', background: 'orange'}} onClick={handleOpen}>Edit</Button>
				
			</div>
			<Dialog style={{alignItems: 'center'}} fullWidth open={open} onClose={handleClose}>
				<DialogContent>
					<Typography variant='h4' align='center' gutterBottom><b>Edit Details</b></Typography>
					<form  >
					<TextField style={{marginBottom: '3%'}} value={title} variant='outlined' fullWidth onChange={(e) => setTitle(e.target.value)}/>
				<TextField multiline rows={7} value={desc} variant='outlined' fullWidth onChange={(e) => setTitle(e.target.value)}/>
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
			<TableCell><b className='text-lg font-bold italic'>Title</b></TableCell>
			<TableCell align="left"><b className='text-lg font-bold italic'>Description</b></TableCell>
			<TableCell align="right"><b className='text-lg font-bold italic'>Actions</b></TableCell>
			</TableRow>
			</TableHead>
					{
						modules.map(module => (
				
							<>
								
			<TableBody>
			
			<TableRow key={module.id}>
			<TableCell component="th" scope="row">
				{module.title}
			</TableCell>
			<TableCell align="left">{module.desc}</TableCell>
			<TableCell align="right">
				<div>
					<Button>E</Button>
					<Button>D</Button>
					<Button>C</Button>
				</div>
			</TableCell>
			</TableRow>
		
			</TableBody>
					</>
						))
					}
					
		</Table>
		</TableContainer>
					</>
			
		}
		</div>
		
          </Card>
        </div>
      </div>
      </> 
		<Dialog open={openAdd} fullWidth onClose={handleCloseAdd}>
		<DQLayout match={match}/>
		<div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
          <Typography >Add New Modules</Typography>
	  <form>
		<TextField  variant='outlined' fullWidth onChange={(e) => setTitle(e.target.value)}/>
		<TextField  variant='outlined' fullWidth onChange={(e) => setDesc(e.target.value)}/>  
		<Button onClick={handleSubmit}>Add New</Button>
	  </form>
          </Card>
        </div>
      </div>
      </Dialog>
      <Dialog style={{alignItems: 'center'}} fullWidth open={openEdit} onClose={handleCloseEdit}>
				<DialogContent>
					<Typography variant='h4' align='center' gutterBottom><b>Edit Details</b></Typography>
					<form  >
					<TextField style={{marginBottom: '3%'}} value={title} variant='outlined' fullWidth onChange={(e) => setTitle(e.target.value)}/>
				<TextField multiline rows={7} value={desc} variant='outlined' fullWidth onChange={(e) => setTitle(e.target.value)}/>
				</form>
				</DialogContent>
				
				
			<DialogActions>
				<Button onClick={handleCloseEdit}>Cancel</Button>
				<Button onClick={handleEditUpdate} style={{backgroundColor: 'orange', color: 'whitesmoke'}}>Update</Button>
			</DialogActions>
			</Dialog>
		</>
	)
}

export default DQConfig
