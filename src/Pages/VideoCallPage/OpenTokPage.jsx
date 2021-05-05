import React from 'react';
import './OpenTok.css';
import { OTSession, OTStreams, preloadScript } from 'opentok-react';
import ConnectionStatus from './components/ConnectionStatus';
import Publisher from './components/Publisher';
import Subscriber from './components/Subscriber';
import { Container, Grid } from '@material-ui/core';
import Chatbox from './components/Chatbox';

class OpenTokPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      connected: false
    };
    this.sessionEvents = {
      sessionConnected: () => {
        this.setState({ connected: true });
      },
      sessionDisconnected: () => {
        this.setState({ connected: false });
      }
    };
  }

  onError = (err) => {
    this.setState({ error: `Failed to connect: ${err.message}` });
  }

  render() {
    return (
      <Container style={{display: 'flex'}}>
        <div>
            <OTSession
        apiKey={this.props.apiKey}
        sessionId={this.props.sessionId}
        token={this.props.token}
        eventHandlers={this.sessionEvents}
        onError={this.onError}
        >

        {this.state.error ? <b id="error">{this.state.error}</b> : null}

        <ConnectionStatus connected={this.state.connected} />
         <Grid
        container
        
        >
      <Grid
      item
            lg={4}
            sm={6}
            xl={3}
            xs={12}>

         
           <Publisher />
       
      </Grid>
        </Grid>
      
        
        <Grid
        container
        
        >
          <h4 style={{width: '200px'}}><b>Connected Users</b></h4>
      
         <OTStreams>
          <Subscriber />
        </OTStreams>
     
        </Grid>
      </OTSession>
        </div>
         
     
      </Container>
   
    );
  }
}

export default preloadScript(OpenTokPage);