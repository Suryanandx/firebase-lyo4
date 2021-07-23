import { Card, DialogContent, makeStyles, Typography } from "@material-ui/core"
import { Dialog } from "@material-ui/core"
import { Paper, Table, TableCell, TableContainer, TableHead, TableRow, Toolbar } from "@material-ui/core"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import DQLayout from "../../components/DQNewSidebar/DQLayout"
import DQRLayout from "../../components/DQRLayout/DQRLayout"
import { db } from "../../firebase"
import { firebaseLooper } from "../../utils/tools"

import AddApproval from "./AddApproval"
import ApprovalCView from "./ApprovalCView"
import ApprovalView from "./ApprovalView"
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

function Approval({match}) {
	const [checked, setChecked] = useState(false)
	const [approvalC, setApprovalC] = useState([])
	const [approvalV, setApprovalV] = useState([])
	const [open, setOpen] = useState(false)
	const classes = useStyles()
	function handleOpen(){
		setOpen(true)
	}
	function handleClose(){
		setOpen(false)
	}
	useEffect(() => {
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('approval')
		.collection('customer')
		.onSnapshot(snap => {
			const data = firebaseLooper(snap)
			setApprovalC(data)
		})
		db.collection('DQNew')
		.doc(match.params.id)
		.collection('content')
		.doc('approval')
		.collection('vendor')
		.onSnapshot(snap => {
			const data = firebaseLooper(snap)
			setApprovalV(data)
		})
	},[])

	return (<>
	<DQLayout match={match}/>
	 <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
           <div>
			{/* <Toolbar style={{display: 'flex', justifyContent: 'flex-end'}}>
			<Button onClick={handleOpen} style={{background: 'orange', color: 'white', marginBottom: '25px'}}>Add New Data</Button>
			</Toolbar> */}
			<Typography variant='h2' align='center' gutterBottom>PROTOCOL PREPARED AND REVIEWED BY</Typography>
			<TableContainer component={Paper}>
		<Table  aria-label="simple table">
			<TableHead>
			<TableRow>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}}><b className='text-lg font-bold italic'>Name</b></TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="left"><b className='text-lg font-bold italic'>Sign</b></TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="left"><b className='text-lg font-bold italic'>Date / Time</b></TableCell>
			{/* <TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right"><b className='text-lg font-bold italic'>Actions</b></TableCell> */}
			</TableRow>
			</TableHead>
					{
						approvalV.map(data => (
				
							<>
							<ApprovalView data={data} match={match} key={data.id}/>	
			
					</>
						))
					}
					
		</Table>
		</TableContainer>
		<br />
		<hr />
		<Typography variant='h2' align='center' gutterBottom>CUSTOMER DETAILS</Typography>
			<TableContainer component={Paper}>
		<Table  aria-label="simple table">
			<TableHead>
			<TableRow>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}}><b className='text-lg font-bold italic'>Name</b></TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="left"><b className='text-lg font-bold italic'>Sign</b></TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="left"><b className='text-lg font-bold italic'>Date / Time</b></TableCell>
			{/* <TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right"><b className='text-lg font-bold italic'>Actions</b></TableCell> */}
			</TableRow>
			</TableHead>
					{
						approvalC.map(data => (
				
							<>
							<ApprovalCView data={data} match={match} key={data.id}/>	
			
					</>
						))
					}
					
		</Table>
		</TableContainer>

		<Dialog open={open} onClose={handleClose} fullWidth >
			<DialogContent>
				<AddApproval match={match}/>
			</DialogContent>
		</Dialog>
		</div>
          </Card>
        </div>
	
      </div>
		 {/* <div style={{display: 'flex', justifyContent: 'flex-end'}}>
		<Button component={NavLink} to={`/DQ/${match.params.id}/Abbreviations`} style={{background: 'blue', color: 'white', marginLeft: '25px',  marginRight: '4%'}}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"/>
</svg>
					</Button>  
					<Button component={NavLink} to={`/DQ/${match.params.id}/Purpose`} style={{background: 'blue', color: 'white', marginLeft: '25px'}}>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-90deg-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14.854 4.854a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 4H3.5A2.5 2.5 0 0 0 1 6.5v8a.5.5 0 0 0 1 0v-8A1.5 1.5 0 0 1 3.5 5h9.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4z"/>
</svg>
				</Button>
	  </div>			 */}
		</>
	)
}

export default Approval
