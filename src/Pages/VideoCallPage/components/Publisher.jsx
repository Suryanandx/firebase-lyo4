 import React, { useState } from 'react';
import { OTPublisher } from 'opentok-react';
import CheckBox from './CheckBox';
import '../OpenTok.css'
import { Button, Card, Container, Grid, Hidden, Toolbar } from '@material-ui/core';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';

class Publisher extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
       publishScreen: false,
      error: null,
      audio: true,
      video: true,
      videoSource: 'camera',
     showControls: true
      
    };

 this.publisherScreenEventHandlers = {
      accessDenied: () => {
        console.log("User denied access to media Screen source");
      },
      streamCreated: () => {
        console.log("Publisher SCreen created");
      },
      mediaStopped: () => {
        this.setState({ publishScreen: false });
      },
      streamDestroyed: ({ reason }) => {
        console.log(`Publisher Screen destroyed because: ${reason}`);
      },
    };
 
  
  }

  setAudio = (audio) => {
    this.setState({ audio });
  }

  setVideo = (video) => {
    this.setState({ video });
  }

  changeVideoSource = (videoSource) => {
    (this.state.videoSource !== 'camera') ? this.setState({videoSource: 'camera'}) : this.setState({ videoSource: 'screen' })
  }

  onError = (err) => {
    this.setState({ error: `Failed to publish: ${err.message}` });
  }

  onPublishScreen = () => {
    console.log("Publish Screen Success");
    this.setState({ error: null });
  };
  
  toggleScreenshare = () => {
    this.setState((state) => ({
      publishScreen: !state.publishScreen,
    }));
  };

 

  render() {
    
    const {  publishScreen } = this.state;
    return (
      <div className='bg-black mx-10 mb-10 p-10'>
          <Container className="bg-black">
        <Grid
        container
        spacing={3}
        >
         
         
          <Grid
           item
           
            >
             {
          publishScreen && 
           (<OTPublisher
           
          properties={{
            width: 800, height: 350,
            publishAudio: this.state.audio,
            publishVideo: this.state.video,
            videoSource:  'screen' ,
            showControls: true,
          
          }}
          onPublish={this.onPublishScreen}
          eventHandlers={this.publisherScreenEventHandlers}
          onError={this.onError}
        />)
        }
          </Grid>
        </Grid>
       

      </Container>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
         
        <div  style={{display: 'flex',background: 'black', justifyContent: 'flex-end'}}>
           <OTPublisher
         properties={{
              showControls: true,
              insertMode: 'append',
              publishAudio: true,
              publishVideo: this.state.video,
              width:500, height: 270
          }}
        />
        </div>
         <Toolbar  style={{display: 'flex',background: 'black', justifyContent: 'flex-end'}}>
          <div style={{marginRight: '20px'}}>
            <Button style={{color: 'orange'}} variant='outlined' onClick={this.toggleScreenshare}><ScreenShareIcon/></Button>
          </div>
          
        <div className='bg-black'>
          <CheckBox
          label="Video"
          initialChecked={this.state.video}
          onChange={this.setVideo}
        />
        </div>
        <div>
         
        </div>
        
        </Toolbar>
        </div>
         
       
      
      <div>
         {this.state.error ? <b id="error">{this.state.error}</b> : null}
      </div>
      </div>
      
    );
  }
}
export default Publisher;
