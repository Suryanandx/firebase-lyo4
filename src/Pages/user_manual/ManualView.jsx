import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import ViewData from "./ViewData";
import {firebaseLooper} from "../../utils/tools"
import { Button, Dialog, DialogActions, DialogContent, FormHelperText, TextField, Toolbar, Typography } from "@material-ui/core";
import { storage } from "../../firebase";
import { Alert } from "react-bootstrap";
function ManualView() {
   
    const [manual, setManual] = useState([]);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [activate, setActivate] = useState(false)
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleUpload = () => {
    const promises = [];
    images.map((image) => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((urls) => {
              setUrls((prevState) => [...prevState, urls]);
            });
        }
      );
        setActivate(true)
    });

    Promise.all(promises)
      .then(() => alert("All images uploaded. Please click 'OK' to see preview"))
      .catch((err) => console.log(err));
  };

    function handleOpen(){
        setOpen(true);
    }

    function handleClose(){
        setOpen(false);
    }
    useEffect(() => {
            db.collection('userManual').onSnapshot((snapshot) => {
                const data = firebaseLooper(snapshot)
                setManual(data)
            })
    }, [])

    function handleSubmit(e){
        e.preventDefault();
        const index = manual.length
        db.collection('userManual').add({title, desc, urls, index}).then(() => {
                        setTitle("")
                        setDesc('')
                        setUrls([])
                        setOpen(false)
                        setImages([])
        })
    }
    return (
        <>
            <div className="flex flex-col w-full items-center justify-center pt-6 lg:pt-15 f-f-l">
                <h1 className="text-2xl md:text-6xl xl:text-8xl font-black text-center text-indigo-700 md:leading-tight">
                   User Manual
                </h1>
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button onClick={handleOpen} variant="contained" >Add new</Button>
            </div>
            <div className="mx-auto container px-4 xl:px-0 pt-8 lg:pt-20">
                <div className="flex flex-col w-full items-center justify-center f-f-l">

                 
                    {/* <ViewData title="Authentication" desc="The application is protected by Firebase Authentication and all your data is stored in firestore. Login with your credentials" url="https://firebasestorage.googleapis.com/v0/b/lyodata.appspot.com/o/userManual%2FScreenshot%202021-07-26%20at%2011.13.51%20AM.png?alt=media&token=d0c80dd4-0b6f-42e5-881d-77df2fd7c986" />
                    <ViewData title="Dashboard" desc="This is the page you enter after login. You'll find an overview of all the data available in the application." url="https://firebasestorage.googleapis.com/v0/b/lyodata.appspot.com/o/userManual%2FScreenshot%202021-07-26%20at%2011.16.47%20AM.png?alt=media&token=abe4d7e4-c377-4211-9a8b-097a82e83b2b"/>
                    <ViewData title="ADD Details " desc={`Add any data by clicking on the "Add __" Button and filling in a form like the given.`} url="https://firebasestorage.googleapis.com/v0/b/lyodata.appspot.com/o/userManual%2Fadd-content.PNG?alt=media&token=8d07d40b-5cad-4f7a-b1db-935820402506"/>
                    <ViewData title="Update Details " desc={`Update any data by clicking the "Pen" icon available on any component and changing the necessary fields`} url="https://firebasestorage.googleapis.com/v0/b/lyodata.appspot.com/o/userManual%2Fedit-content.PNG?alt=media&token=701f2d23-1875-491a-8556-bee3973f8c8d"/>
                    <ViewData title="Delete Data " desc={`Delete any data by clicking on "delete" icon available on any component which will give you a warning like this `} url="https://firebasestorage.googleapis.com/v0/b/lyodata.appspot.com/o/userManual%2Fdel.PNG?alt=media&token=b3b38f8e-3645-4ef7-b21b-3541c4f9243e"/>
                    <ViewData title="Machines" desc={`From sidebar you have "Machines" menu which is the root document of all the available data in the application`} url="https://firebasestorage.googleapis.com/v0/b/lyodata.appspot.com/o/userManual%2Fmachines.png?alt=media&token=5b9e435b-1e56-4f8c-a91b-8cd71fdb1616"/>
                    <ViewData title="File Manager" desc={"A CMS to manage OR store files for references - All formats supported "} url="https://firebasestorage.googleapis.com/v0/b/lyodata.appspot.com/o/userManual%2Ffile-manager.PNG?alt=media&token=1a9e3519-6f63-412b-b680-54903316ab05"/>
                    <ViewData title="Users" desc={`From sidebar you have Users menu where "Admins" can change certain data of an authenticated user"`} url="https://firebasestorage.googleapis.com/v0/b/lyodata.appspot.com/o/userManual%2Fusers.PNG?alt=media&token=103a884a-57ca-4c8c-bbe1-9f47f0eb333a"/>
                    <ViewData title="Account" desc={`from Sidebar you have Accounts menu where you can change your authentication credentials like Email Password and Avatar`} url="https://firebasestorage.googleapis.com/v0/b/lyodata.appspot.com/o/userManual%2Facco.PNG?alt=media&token=a7acef9d-3524-487f-ba16-a4307d6c27c4"/> */}
                    {
                        manual.map((data) => (
                            <ViewData d_id={data.id} key={data.id} title={data.title} desc={data.desc} images={data.urls} />
                        ))
                    }
                </div>

                <Dialog fullWidth open={open} onClose={handleClose}>
                    <Toolbar>
                        <Button onClick={handleClose}>Close</Button>
                    </Toolbar>
                    <DialogContent>
                        <form onSubmit={handleSubmit}>
                             <Typography variant='h1' align='center' gutterBottom>Add Manual Data</Typography>
                        <TextField required value={title} label='Title' onChange={(e) => setTitle(e.target.value)} style={{marginBottom: '3%'}} variant='outlined' fullWidth/>
                        <TextField required value={desc} label="Description" onChange={(e) => setDesc(e.target.value)}style={{marginBottom: '3%'}} rows={4} multiline variant='outlined' fullWidth/>
                        <input multiple onChange={handleChange} style={{marginBottom: '3%'}} type="file" variant='outlined' fullWidth/>
                        <Button onClick={handleUpload} variant='contained' color="primary" disabled={title === '' || desc === ''} fullWidth >Add </Button>
                        <FormHelperText>Please enter above details to unblock</FormHelperText>
                        <Dialog fullWidth onClose={() => setActivate(!activate)} open={activate}>
                    <DialogContent>
                        <Alert severity="success">New Data has been added . To confirm please click on "Confirm"</Alert>
                    </DialogContent>
                    <DialogActions>
                        <Button  onClick={(e)=> {handleSubmit(e);
                        setActivate(!activate)
                        
                        }
                        } variant="contained" style={{background: 'green', color: 'white'}}>Confirm</Button>
                    </DialogActions>
                </Dialog>
                        </form>
                       
                        <br />
     
      <br />
      {urls.map((url, i) => (
        <img
          key={i}
          style={{ width: "500px" }}
          src={url || "http://via.placeholder.com/300"}
          alt="firebase-image"
        />
      ))}
                    </DialogContent>
                </Dialog>

              
            </div>
        </>
    );
}

export default ManualView;
