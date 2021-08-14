import { DialogActions, DialogTitle } from "@material-ui/core"
import { DialogContent } from "@material-ui/core"
import { DialogContentText } from "@material-ui/core"
import { Button, Dialog, Typography,TextField } from "@material-ui/core"
import { useState } from "react"
import { db } from "../../../firebase"
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { NavLink } from "react-router-dom"
function DQNewView({report}) {
  const [name, setName] = useState(report.name)
  const [desc, setDesc] = useState(report.desc)
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  function handleOpen(){
    setOpen(true)
  }

  function handleClose(){
    setOpen(false)
  }
  function handleOpenDelete
  (){
    setOpenDelete(true)
  }

  function handleCloseDelete(){
    setOpenDelete(false)
  }
 function handleDelete(id){
   db.collection('DQNew').doc(id).delete()
 }
  function handleSubmit(){
    db.collection('DQNew').doc(report.id).update({name, desc}).then(() => {setOpen(false)})
  }
	console.log(report)
	return (
		<div>
			    <div>
            {/* <div className="p-6 mx-auto bg-white border rounded-lg shadow-xl lg:w-1/2">
              <div className="flex flex-col items-start py-2 rounded-lg lg:flex-row">
                
                <div className="flex flex-col w-full text-blueGray-500 lg:ml-4">
                   <div style={{display: 'flex' , justifyContent: 'space-evenly'}}>
                     <h2 className="mt-4 mb-8 text-lg font-semibold tracking-widest text-black uppercase lg:mt-0 title-font"> {report.name}</h2>
                <Button onClick={handleOpen}><EditIcon/></Button>
                <Button onClick={handleOpenDelete}><DeleteIcon/></Button>
              </div>
                  
                  <p className="mb-3 text-base leading-relaxed text-blueGray-500"> {report.desc}</p>
		  <Button component={NavLink}  to={`/DQ/${report.id}/Approval`} fullWidth style={{backgroundColor: 'orange', color: 'white', margintop:'3%'}}>Content</Button>
     
                </div>
              </div>
            </div> */}
            <Dialog fullWidth open={open} onClose={handleClose}>
               <div>
           
          < >
              <Typography variant='h3' align='center'><b>Update {name}</b></Typography> 
            <DialogContent  >

                <TextField style={{marginBottom: '20px'}} variant='outlined' fullWidth value={name} onChange={(e) => setName(e.target.value)} type="text"  placeholder="Enter Name" />
          
                  <TextField fullWidth multiLine rows={5} variant='outlined' value={desc} onChange={(e) => setDesc(e.target.value)} required/>
              
             
            </DialogContent>
          </>
       <DialogActions >
                <Button onClick={handleClose}>Cancel</Button>
                <Button disabled={name === '' || desc === '' || desc>300 || name > 35} style={{background: 'orange', color: 'white'}} onClick={handleSubmit} > Update </Button>
              </DialogActions>
        </div>
            </Dialog>
          </div>
          <Dialog open={openDelete} fullWidth onClose={handleCloseDelete}>
            <DialogTitle id="alert-dialog-title">{"Are You Sure You Want To Delete?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting will be a permanent action and data pervailing will be permanently deleted and can not be retrieved back.                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseDelete} color="secondary">
                        Disagree
                    </Button>
                    <Button   onClick={(e)=>{
                        handleDelete(report.id);
                         handleCloseDelete()}} color="primary" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
          </Dialog>
          <div className="xl:w-full w-11/12 mx-auto flex flex-wrap items-center justify-between xl:px-8 md:px-8 lg:px-8 mb-2 xl:mb-0 lg:mb-0 border-b border-gray-300 dark:border-gray-700">
                        <div className="xl:w-3/5 lg:w-2/4 w-full pt-6 xl:pb-6 lg:pb-8 md:pb-8 sm:pb-8">
                            <p className="text-lg font-bold text-gray-800 dark:text-gray-100 pb-1">{report.name}</p>
                            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">{report.desc}</p>
                        </div>
                        <div className="xl:w-1/5 lg:w-1/4 w-full pt-6 pb-8">
                            <div className="flex items-center w-full justify-between">
                                
                                <Button component={NavLink} to={`/DQ/${report.id}/Approval`} className="text-gray-400 hover:text-gray-500 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right" width={20} height={20} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <polyline points="9 6 15 12 9 18" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                        <div className="xl:w-1/5 lg:w-1/4 w-full pt-6 xl:pb-8 lg:pb-8 md:pb-8 sm:pb-8">
                            <div className="flex items-center xl:-ml-10">
                            <Button onClick={handleOpen}><EditIcon/></Button>
                            <Button onClick={handleOpenDelete}><DeleteIcon/></Button>
                            </div>
                        </div>
                        
                    </div>
		</div>
	)
}

export default DQNewView
