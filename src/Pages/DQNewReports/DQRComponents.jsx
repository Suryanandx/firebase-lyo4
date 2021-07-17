import { Button, Card,Toolbar, makeStyles,Dialog,DialogContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow , Typography} from "@material-ui/core"
import { useEffect, useState } from "react"
import { db } from "../../firebase"
import { firebaseLooper } from "../../utils/tools"

function DQRComponents({match, moduleId,type}) {
	const [reports, setReports] = useState([])
	const [open, setOpen] = useState(false)
	const [issuecomment, setIssueComment] = useState('')

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
		.doc('config')
		.collection('components')
		.where('module_id', '==', `${moduleId}`)
		.onSnapshot(snapshot => {
			const data = firebaseLooper(snapshot)
			setReports(data)
		})
	}, [])
	 function handleComment(id){
   
    db.collection('issueData').doc(id).onSnapshot(snapshot => {
     const data = snapshot.data()
     setIssueComment(data.content )
    })

}
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
		
		<hr />
		<div style={{paddingRight: '5%', paddingLeft: '5%'}}>
			 {type===0 &&
				 <TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}}>Name</TableCell>
            <TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right">Expected Value</TableCell>
	    <TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right">Response</TableCell>
            <TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right">Issue </TableCell>
            <TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right">Actions</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((row) => (
            <TableRow key={row.name}>
              <TableCell style={{background: '#E8F6EF'}} component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
	      <TableCell align="right">{getResponse(row.response)}</TableCell>
              <TableCell align="right">{row.issue_id ? <b>{row.issue_id}</b> : <b>N/A</b>}</TableCell>
              
             <TableCell align="right">
			 {row.issue_id !== ""? <Button style={{background: 'orange', color: 'white'}} onClick={(e) => {
                  handleOpen(e);
                  handleComment(row.issue_id)
                }}>Check</Button> : <p>N/A</p>}
		  </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
	}
	{type===1 &&<TableContainer component={Paper}>
      <Table  aria-label="simple table">
        <TableHead>
		<TableRow>
			
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}}><b className='text-md font-bold italic'>Description</b></TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="left"><b className='text-md font-bold italic'>Required Parameters</b></TableCell>
			
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="left"><b className='text-md font-bold italic'>Instrument/Gauges</b></TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="left"><b className='text-md font-bold italic'>Preferred Pipe & Connection</b></TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="left"><b className='text-md font-bold italic'>Response</b></TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right">Issue </TableCell>
			<TableCell style={{background: '#4C4C6D', color: 'white', font: 'bold'}} align="right"><b className='text-md font-bold italic'>Options</b></TableCell>
			
			</TableRow>
        </TableHead>
        <TableBody>
          {reports.map((row) => (
            <TableRow key={row.name}>
              <TableCell style={{background: '#E8F6EF'}} component="th" scope="row">
                {row.desc}
              </TableCell>
              <TableCell align="left">{row.req}</TableCell>
			  <TableCell align="left">{row.inst}</TableCell>
			  <TableCell align="left">{row.connection}</TableCell>
	      <TableCell align="left">{getResponse(row.response)}</TableCell>
              <TableCell align="left">{row.issue_id ? <b>{row.issue_id}</b> : <b>N/A</b>}</TableCell>
              
             <TableCell align="right">
			 {row.issue_id !== ""? <Button style={{background: 'orange', color: 'white'}} onClick={(e) => {
                  handleOpen(e);
                  handleComment(row.issue_id)
                }}>Check</Button> : <p>N/A</p>}
		  </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
    <Dialog fullWidth onClose={handleClose} open={open}>
      <Toolbar>
        <Button onClick={handleClose}>Close</Button>
      </Toolbar>
              <b className='text-xl underline text-bold text-center mb-3'>Comment</b>
              <p className='text-xl text-blue-gray-500 text-center'>{issuecomment}</p>
    </Dialog>
		</div>
		
    </>
	)
}

export default DQRComponents
