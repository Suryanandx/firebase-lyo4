 import React, { useState } from 'react';
import { OTPublisher } from 'opentok-react';
import CheckBox from './CheckBox';
import '../OpenTok.css'
import { Button, Card, Container, Grid } from '@material-ui/core';
import screenfull from 'screenfull';

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
      <div>
        <Container className="publisher">
        <Grid
        container
        spacing={3}
        >
          <Grid
          id='publisher'
           item
            lg={4}
            sm={6}
            xl={3}
            xs={12}>
            <OTPublisher
           
          properties={{
            width:500, height:300,
            publishAudio: this.state.audio,
            publishVideo: this.state.video,
            videoSource: this.state.videoSource === 'screen' ? 'screen' : undefined,
            showControls: this.state.showControls,
            
          }}
          onError={this.onError}
        />
          </Grid>
          <Grid
           item
            >
             {
          publishScreen && 
           (<OTPublisher
           
          properties={{
            width: 700, height: 300,
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
        <Card style={{width: '500px',display: 'flex', justifyContent: 'space-between'}}>
          <div>
            <Button variant='outlined' onClick={this.toggleScreenshare}>Share screen</Button>
          </div>
           <div>
             <CheckBox
          label="Publish Audio"
          initialChecked={this.state.audio}
          onChange={this.setAudio}
        />
           </div>
        <div>
          <CheckBox
          label="Publish Video"
          initialChecked={this.state.video}
          onChange={this.setVideo}
        />
        </div>
        <div>
         
        </div>
        
        </Card>
        

      </Container>
      <div>
         {this.state.error ? <b id="error">{this.state.error}</b> : null}
      </div>
      </div>
      
    );
  }
}
export default Publisher;
