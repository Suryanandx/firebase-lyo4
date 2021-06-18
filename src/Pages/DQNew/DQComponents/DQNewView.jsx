import { DialogActions, DialogTitle } from "@material-ui/core"
import { DialogContent } from "@material-ui/core"
import { DialogContentText } from "@material-ui/core"
import { Button, Dialog, Typography } from "@material-ui/core"
import { useState } from "react"
import { db } from "../../../firebase"

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
    db.collection('DQNew').doc(report.id).update({name, desc})
  }
	console.log(report)
	return (
		<div>
			    <div className="container items-center px-5 py-12 lg:px-20">
            <div className="p-6 mx-auto bg-white border rounded-lg shadow-xl lg:w-1/2">
              <div className="flex flex-col items-start py-2 rounded-lg lg:flex-row">
                <div className="flex items-center justify-center w-full lg:justify-start lg:w-1/2">
                  <img src="https://dummyimage.com/200x200/F3F4F7/8693ac" alt="placeholder" className="rounded-lg"/>
                </div>
                <div className="flex flex-col w-full text-blueGray-500 lg:ml-4">
                   <div style={{display: 'flex' , justifyContent: 'space-evenly'}}>
                     <h2 className="mt-4 mb-8 text-lg font-semibold tracking-widest text-black uppercase lg:mt-0 title-font"> {report.name}</h2>
                <Button onClick={handleOpen}>Edit</Button>
                <Button onClick={handleOpenDelete}>Delete</Button>
              </div>
                  
                  <p className="mb-3 text-base leading-relaxed text-blueGray-500"> {report.desc}</p>
		  <Button  fullWidth style={{backgroundColor: 'orange', color: 'white', margintop:'3%'}}><a href={`/DQ/${report.id}/content`}>Content</a></Button>
     
                </div>
              </div>
            </div>
            <Dialog fullWidth open={open} onClose={handleClose}>
               <div>
           
          <div class="container items-center px-4 py-12 lg:px-15">
              
            <form  class="flex flex-col w-full p-10 px-8 pt-6 mx-auto my-6 mb-4 transition duration-500 ease-in-out transform bg-white border rounded-lg lg:w-1/2 ">
             <Typography variant='h3' align='center'><b>AUpdate {name}</b></Typography> 
            
             
              <div class="relative pt-4">
                <label for="name" class="text-base leading-7 text-gray-500">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text"  placeholder="Enter Name" class="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"/>
              </div>
              
             
              <div class="flex flex-wrap mb-6 -mx-3">
                <div class="w-full px-3">
                  <label class="text-base leading-7 text-gray-500" for="description"> Description </label>
                  <textarea value={desc} onChange={(e) => setDesc(e.target.value)} class="w-full h-32 px-4 py-2 text-base text-gray-500 transition duration-500 ease-in-out transform bg-white border rounded-lg focus:border-blue-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 apearance-none autoexpand" id="description" type="text" name="description" placeholder="Describe your material...." required=""></textarea>
                </div>
              </div>
              
              <div class="flex items-center w-full pt-4">
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} class="w-full py-3 text-base text-white transition duration-500 ease-in-out transform bg-yellow-900 border-yellow-900 rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-yellow-800 "> Update </Button>
              </div>
            </form>
          </div>
      
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
		</div>
	)
}

export default DQNewView
