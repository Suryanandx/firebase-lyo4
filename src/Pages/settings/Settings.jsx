import { Button, Typography } from "@material-ui/core"
import { useEffect,  useState } from "react"
import { database, db } from "../../firebase"
import { firebaseLooper, firebaseLooperTwo } from "../../utils/tools"
import GetAppIcon from '@material-ui/icons/GetApp';
import EditNavbar from "./EditNavbar";
import EditVideoCall from "./EditVideoCall";
import Page from "../../components/Page";
import AddApk from "./AddApk";

const Settings = () => {
    const [mobile, setMobile] = useState({})
    const [glass, setGlass] = useState({})
   
    useEffect(()=> {
        db.collection('apks').doc('mobile').onSnapshot(snapshot => {
            const data = snapshot.data()
            setMobile(data)
            
        })
        db.collection('apks').doc('glass').onSnapshot(snapshot => {
          const data = snapshot.data()
          setGlass(data)
          
      })
    } ,[])
 

    return (
      <Page title='Settings | LyoIms'>
        <section class="text-gray-600 body-font">
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
             <Typography variant='h3' gutterBottom align='left'><b>Settings</b></Typography>
             <Typography variant='body1' gutterBottom align='right'>Web app Version : 1.6.6</Typography>
          </div>
          <section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto flex items-center md:flex-row flex-col">
    <div class="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
      <h2 class="text-xs text-yellow-800 tracking-widest font-medium title-font mb-1">Lyodata APKS</h2>
      <h1 class="md:text-3xl text-2xl font-medium title-font text-gray-900">Mobile and Glass APK Downloads</h1>
    </div>
    <div class="flex md:ml-auto md:mr-0 mx-auto items-center flex-shrink-0 space-x-4">
      <a href={mobile.url}>
        <button class="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6" viewBox="0 0 512 512">
          <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
        </svg>
        <span class="ml-4 flex items-start flex-col leading-none">
          <span class="text-xs text-gray-600 mb-1">Mobile {mobile.version}</span>
          <span class="title-font font-medium">Download Apk</span>
        </span>
      </button>
      </a>
      <a href={glass.url}>
         <button class="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6" viewBox="0 0 512 512">
          <path d="M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z"></path>
        </svg>
        <span class="ml-4 flex items-start flex-col leading-none">
          <span class="text-xs text-gray-600 mb-1">Glass {glass.version}</span>
          <span class="title-font font-medium">Download Apk</span>
        </span>
      </button>
      </a>
      
     
    </div>
  </div>
</section>
<AddApk/>
          <hr />
          <EditNavbar/>
          <br />
          <EditVideoCall/>
          {

          }
        
  
</section>
      </Page>
        
    
    )
}

export default Settings
