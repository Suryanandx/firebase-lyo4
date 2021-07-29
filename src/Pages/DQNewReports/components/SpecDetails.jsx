import { TextField, Button, IconButton, Toolbar } from "@material-ui/core"
import { useState } from "react"
import { useEffect } from "react"
import { db } from "../../../firebase"
import { firebaseLooper } from "../../../utils/tools"
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { Dialog } from "@material-ui/core"

function SpecDetails({match, tid}) {
	const [descs, setDescs] = useState([])
	const [desc, setDesc] = useState('')
    const [issueComment, setIssueComment] = useState('')
    const [open,setOpen] = useState(false)

	useEffect(() => {
		db.collection('DQNewReport').doc(match.params.id)
		.collection('content').doc('designSpecs').collection('points')
		.where('tid', '==', `${tid}`).onSnapshot(snap => {
			const data = firebaseLooper(snap)
			data.sort(function(a,b){
				return(a.index-b.index)
			})
			setDescs(data)
		})
	}, [])
	function handleChange(id, data){
		const desc = data
		db.collection('DQNewReport').doc(match.params.id)
		.collection('content').doc('designSpecs').collection('points')
		.doc(id).update({desc})
	}
	function handleDelete (id){
		
		db.collection('DQNewReport').doc(match.params.id)
		.collection('content').doc('designSpecs').collection('points')
		.doc(id).delete()
	}

	function handleSubmit(){
		db.collection('DQNewReport').doc(match.params.id)
		.collection('content').doc('designSpecs').collection('points')
		.add({desc,tid,index: descs.length})
	}
    function handleOpen(){
		setOpen(true)
	}

	function handleClose(){
		setOpen(false)
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

    function handleComment(id){
   
        db.collection('issueData').doc(id).onSnapshot(snapshot => {
         const data = snapshot.data()
         setIssueComment(data.content )
        })
    
    }
	return (
		<div>
			{
				descs.map(data => (
                    <>
                     <div>
                       { getResponse(data.response)}
					   {data.issue_id !== ""? <Button style={{marginLeft: '20px', color: 'orange'}} onClick={(e) => {
                  handleOpen(e);
                  handleComment(data.issue_id)
                }}>Check</Button> : <p></p>}
                    </div>
					<div style={{display: 'flex', justifyContent: 'space-between'}}>
						<p className='text-2xl mr-3'>⦿</p>
						<TextField className='mb-5' variant='outlined' disabled multiline fullWidth key={data.id} defaultValue={data.desc} onChange={handleChange(data.id,data.desc)}/>
                        </div>
                  
					</>
				))
			
			} 
			{/* <div className='p-10' style={{display: 'flex', justifyContent: 'space-evenly'}}>
				<TextField className='mr-5 mb-10'  variant='outlined' fullWidth  label='Add new Data' onChange={(e) => setDesc(e.target.value)}/>
				<Button onClick={handleSubmit} disabled={desc===''} style={{color: 'orange'}} >Add </Button>
			</div> */}
			<Dialog fullWidth onClose={handleClose} open={open}>
      <Toolbar>
        <Button onClick={handleClose}>Close</Button>
      </Toolbar>
              <b className='text-xl underline text-bold text-center mb-3'>Comment</b>
              <p className='text-xl text-blue-gray-500 text-center'>{issueComment}</p>
    </Dialog>
		</div>
	)
}

export default SpecDetails
