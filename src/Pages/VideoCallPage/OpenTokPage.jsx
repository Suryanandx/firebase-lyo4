import React from 'react';
import './OpenTok.css';
import { OTSession, OTStreams, preloadScript } from 'opentok-react';
import ConnectionStatus from './components/ConnectionStatus';
import Publisher from './components/Publisher';
import Subscriber from './components/Subscriber';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Chatbox from './components/Chatbox';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

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
      
         <section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-20">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Connected Users</h1>
      
    </div>
    <div class="flex flex-wrap -m-4">
      
          <OTStreams>
        <div class="lg:w-1/3 sm:w-1/2 p-4">
        <div class="flex relative">
          <Subscriber />
        </div>
        </div>
        </OTStreams>
          <div class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
            
         
      </div>
     
    
    </div>
  </div>
</section>

         

             

      </OTSession>
        </div>
         
     
      </Container>
   
    );
  }
}

export default preloadScript(OpenTokPage);