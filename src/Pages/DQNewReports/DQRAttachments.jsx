import { Button, Card,Toolbar, makeStyles,Dialog,DialogContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow , Typography} from "@material-ui/core"
import { useEffect, useState } from "react"
import DQRLayout from "../../components/DQRLayout/DQRLayout"
import { db } from "../../firebase"
import { firebaseLooper } from "../../utils/tools"


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

  
function DQRAttachments({match}) {
	const [reports, setReports] = useState([])
	const [open, setOpen] = useState(false)
	const [issuecomment, setIssueComment] = useState('')
    const classes = useStyles()

	function handleOpen(){
		setOpen(true)
	}

	function handleClose(){
		setOpen(false)
	}
	useEffect(() => {
		db.collection('DQNewReport')
		.doc(match.params.id)
		.collection('content')
		.doc('attachments')
		.collection('details')
		.onSnapshot(snapshot => {
			const data = firebaseLooper(snapshot)
			setReports(data)
		})
	}, [])

	
	function getResponse(res) {
		if(res === 1){
			return(

				<b style={{background: '#BBE5B3 0% 0% no-repeat padding-box', borderRadius: '100px', border: '2px solid var(--unnamed-color-ffffff)'}}>Accepted</b>
			)
		}else if(res === 2){
			return(
				<b style={{background: '#FF616D 0% 0% no-repeat padding-box', borderRadius: '100px', border: '2px solid var(--unnamed-color-ffffff)'}}>Rejected</b>
			)
		}else if (res === 3){
			return(
				<b style={{background: '#FFEAC9 0% 0% no-repeat padding-box', borderRadius: '100px', border: '2px solid var(--unnamed-color-ffffff)'}}>Issued</b>
			)
		}else {
			return(
				<b style={{background: '#CDF0EA 0% 0% no-repeat padding-box', borderRadius: '100px', border: '2px solid var(--unnamed-color-ffffff)'}}>Not Updated</b>
			)
		}
	}
	return (
		<>
		<DQRLayout match={match}/>
        <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
          <hr />
		<div style={{paddingRight: '5%', paddingLeft: '5%'}}>
		
				 <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}}>Description</TableCell>
            <TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right">Drawing Number</TableCell>
	    <TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right">Revision</TableCell>
         
          
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((row) => (
            <TableRow key={row.desc}>
              <TableCell style={{background: '#E8F6EF'}} component="th" scope="row">
                {row.desc}
              </TableCell>
              <TableCell align="right">{row.dno}</TableCell>
              <TableCell align="right">{row.rev}</TableCell>
	     
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Dialog fullWidth onClose={handleClose} open={open}>
      <Toolbar>
        <Button onClick={handleClose}>Close</Button>
      </Toolbar>
              <b className='text-xl underline text-bold text-center mb-3'>Comment</b>
              <p className='text-xl text-blue-gray-500 text-center'>{issuecomment}</p>
    </Dialog>
		</div>
		
          </Card>
        </div>
      </div>
		
    </>
	)
}

export default DQRAttachments
