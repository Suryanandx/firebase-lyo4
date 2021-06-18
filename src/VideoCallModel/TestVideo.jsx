import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';
import Page from '../components/Page.js';
import ConnectionStatus from '../Pages/VideoCallPage/components/ConnectionStatus.jsx';
import Publisher from '../Pages/VideoCallPage/components/Publisher.jsx';


function TestVideo({config}) {
    return (
      <Page title='Video Call | LyoIms'>
       
        <div style={{background: 'black', height: '200vh'}}>
           
        <OTSession apiKey={config.api_key} sessionId={config.session_id} token={config.token}>
         
         <div style={{width: '80%', marginRight: '2%'}}>
          <OTStreams>
            
              <OTSubscriber
          
          properties={{
              showControls: true,
              insertMode: 'append',
              width:500, height: 270
          }}
          />
         
        </OTStreams>
           </div>
           <div>
             <Publisher/>
          </div>
      
      </OTSession>
        </div>
      </Page>


    )
}

export default TestVideo
