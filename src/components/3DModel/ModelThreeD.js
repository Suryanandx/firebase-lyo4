import { Card, makeStyles, Typography } from '@material-ui/core';
import {GLTFModel,AmbientLight,DirectionLight} from 'react-3d-viewer'
import {OBJModel} from 'react-3d-viewer'
import ManualDashboardLayout from '../ManualSidebar/ManualDashboardLayout.jsx'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"

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
    backgroundColor: '#edeef7',
   padding: '20px',
      flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
    },
}));




function ModelThreeD({match}) {
  const classes = useStyles()
 
  return (
    <> 
    <ManualDashboardLayout match={match}/>
    <div className={classes.wrapper}>
        <div className={classes.container}>
          <Card className={classes.content}>
           <>

   
    <div className='mx-auto'>
      <Typography variant='h1' align='center'><b>3D Models</b></Typography>
     <Carousel
           
              autoPlay
               infiniteLoop showStatus={false}
            showIndicators={false}
            showThumbs={false}
            interval={5000}
            >
               <div style={{width: '100%', height: '100vh', margin: '20%', marginTop: '5%', backgroundColor: '#edeef7'}}>
         <GLTFModel

        src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Buggy/glTF/Buggy.gltf"
      >
        <AmbientLight color={0xffffff}/>
        <DirectionLight color={0xffffff} position={{x:100,y:200,z:100}}/>
        <DirectionLight color={0xff00ff} position={{x:-100,y:200,z:-100}}/>
      </GLTFModel>
      </div>
      <div 
      style={{width: '100%', height: '100vh', margin: '20%', marginTop: '5%', backgroundColor: '#edeef7'}}
      >
          <GLTFModel
          width={500}
          texPath =""
        src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/2CylinderEngine/glTF/2CylinderEngine.gltf"
      >
        <AmbientLight color={0xffffff}/>
        <DirectionLight color={0xffffff} position={{x:100,y:200,z:100}}/>
        <DirectionLight color={0xff00ff} position={{x:-100,y:200,z:-100}}/>
      </GLTFModel>
      </div>
      <div
       style={{width: '100%', height: '100vh', margin: '20%', marginTop: '5%', backgroundColor: '#edeef7'}}
      >
      <GLTFModel
        src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf"
      >
        <AmbientLight color={0xffffff}/>
        <DirectionLight color={0xffffff} position={{x:100,y:200,z:100}}/>
        <DirectionLight color={0xff00ff} position={{x:-100,y:200,z:-100}}/>
      </GLTFModel>
      </div>

      <div
       style={{width: '100%', height: '100vh', margin: '20%', marginTop: '5%', backgroundColor: '#edeef7'}}
       >
         <GLTFModel
        src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/FlightHelmet/glTF/FlightHelmet.gltf"
      >
        <AmbientLight color={0xffffff}/>
       <DirectionLight color={0xffffff} position={{x:100,y:200,z:100}}/>
        <DirectionLight color={0xff00ff} position={{x:-100,y:200,z:-100}}/>
      </GLTFModel>
      </div>
       <div
        style={{width: '100%', height: '100vh', margin: '20%', marginTop: '5%', backgroundColor: '#edeef7'}}
        >
      <OBJModel 
        width="400" height="400"  
        position={{x:0,y:-100,z:0}} 
        src="https://raw.githubusercontent.com/alecjacobson/common-3d-test-models/master/data/xyzrgb_dragon.obj"
        onLoad={()=>{
          //...
        }}
        onProgress={xhr=>{
          //...
        }}
      />
    </div>
            </Carousel>
     
    </div>
    
   
    </>
          </Card>
        </div>
      </div>
      </>
   
  )
}

export default ModelThreeD
