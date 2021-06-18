import { DialogContent, makeStyles } from "@material-ui/core";
import { Button, Dialog, Typography, TextField, DialogActions, Card } from "@material-ui/core"
import { useEffect } from "react"
import { useState } from "react"
import DQLayout from "../../components/DQNewSidebar/DQLayout";
import { db } from "../../firebase"


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

function DQPurpose({match}) {
	const [purpose, setPurpose] = useState({})
	const [title, setTitle] = useState(purpose.title)
	const [ desc, setDesc] = useState(purpose.desc)
	const [open, setOpen] = useState(false)
	const [opendelete, setOpenDelete] = useState(false)
	const classes = useStyles()

	function handleOpen(){
		setOpen(true)
	}
	function handleClose(){
		setOpen(false)
	}
	function handleOpenDel(){
		setOpenDelete(true)
	}
	function handleCloseDel(){
		setOpenDelete(false)
	}

	function handleUpdate(e){
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('purpose')
		.update({title, desc})
	}

	function handleSubmit(){
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('purpose')
		.update({title, desc})
	}
	useEffect(() => {
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('purpose')
		.onSnapshot(snapshot => {
			const data = snapshot.data()
			setPurpose(data)
			setTitle(data.title)
			setDesc(data.desc)
		})
	}, [])
	return (
		<>
		{purpose ?
			(<>
			<DQLayout match={match}/>
		 <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
           <div style={{height: '100vh'}}>
			<Typography variant='h1' align='center' gutterBottom><b>{purpose.title}</b></Typography>
			<hr />
			<Typography variant='body1' align='left' gutterBottom><p className='italic'>{purpose.desc}</p></Typography>
			<hr />
			<div style={{display: 'flex', marginBottom: 'auto', paddingRight: '3%', justifyContent: 'flex-end'}}>
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
		</div>
          </Card>
        </div>
      </div>
      </>)
		

		: 
		<>
		<DQLayout match={match}/>
		<div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
          <Button>Add New Purpose</Button>
	  <form onSubmit={handleSubmit} >
		<TextField value={title} variant='outlined' fullWidth onChange={(e) => setTitle(e.target.value)}/>
		<TextField value={desc} variant='outlined' fullWidth onChange={(e) => setTitle(e.target.value)}/>  
		<Button type="submit">Add New</Button>
	  </form>
          </Card>
        </div>
      </div>
      </>}
		</>
	)
}

export default DQPurpose
