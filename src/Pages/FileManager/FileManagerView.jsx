import { Button, TextField, Typography } from "@material-ui/core"
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { firebaseLooper } from "../../utils/tools";
import AddFiles from "./AddFiles"
import FileView from "./FileView";

 const FileManagerView = () => {
     const [fileData, setFileData] = useState([])
     const [title, setTitle] = useState('')
     useEffect(() => {
        db.collection('FileManager').onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setFileData(data)
        })
     }, [])
  return (
      <>
      <Typography variant='h1' align='center'><b>File Manager</b></Typography>
               <Typography variant='body2' align='center' gutterBottom >These are all your Files</Typography>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
               
                 <div className="relative"> 
                 
                 <input style={{ border: '2px solid whitesmoke'}} onChange={(e) => setTitle(e.target.value)} type="text" className="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search Files..."/>
                  <div className="absolute top-4 right-3"> <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> </div>
              </div>
               <Button href={`/Add-files`}  style={{width: '10%', marginLeft: '4%', marginRight: '3%',color: 'white', backgroundColor: 'orange'}}>Add Files</Button>
              </div>
            <br/>
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
         
      <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
       {
           fileData.
          filter((data) => {
              if(title === ""){
                  return data
              } else if (data.title.toLowerCase().includes(title.toLocaleLowerCase())){
                      return data
              }else if (data.desc.toLowerCase().includes(title.toLocaleLowerCase())){
                      return data
              }
             
            }).map(data => (
               <FileView key={data.id} data={data}/>
           ))
       }
      </div>
    </div>
    </>
  );
};

export default FileManagerView