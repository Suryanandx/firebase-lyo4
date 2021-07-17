import { Button, Dialog, TableCell, TableRow, Toolbar, Collapse } from "@material-ui/core"
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { useGridState } from "@material-ui/data-grid"
import { useState } from "react"
import DQRComponents from "./DQRComponents"
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
function DQRConfigView({row, match}) {
	const [open, setOpen] = useState(false)
	function handleOpen(){
		setOpen(true)
	}
	function handleClose(){
		setOpen(false)
	}
	return (
		<>
			 <TableRow key={row.name}>
              <TableCell style={{background: '#E8F6EF'}} component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.desc}</TableCell>
             
              
              <TableCell align="right"><Button className='animate-pulse' onClick={() => setOpen(!open)}>{!open ? <ArrowForwardIcon/> : <ArrowUpwardIcon/>}</Button></TableCell>
	      
            </TableRow>
			<Collapse in={open}>
		<br />
		<DQRComponents type={row.type} key={row.id} moduleId={row.id} match={match}/>
		<br />
	      </Collapse>
		</>
	)
}

export default DQRConfigView
