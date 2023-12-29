import React, {Component} from 'react';
import {} from 'react-native-gesture-handler';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  BackHandler,
} from 'react-native';
import {
  OTSession,
  OTPublisher,
  OTSubscriber,
  OTPublisherProperties,
  OTSessionEventHandlers,
  OTSessionSessionOptions,
  OTSubscriberEventHandlers,
  SignalEvent,
} from 'opentok-react-native';
var requestRaised = false;
var connectionId = '';
//var eventhandle: OTSessionEventHandlers;
const sessionRef = null;
class ConnectSession extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '47773001';
    this.sessionId =
      '1_MX40Nzc3MzAwMX5-MTcwMDU1MTI4Mjk4OH5RVTJqOHI4YXFaR3c4THN5S1JTc0V1eld-fn4';
    this.token =
      'T1==cGFydG5lcl9pZD00Nzc3MzAwMSZzaWc9YzhjOGQ3NWRjOTE0OWUzZGUxOWM4NzYwNmI2YjNhZWYxYzI2MjAxNDpzZXNzaW9uX2lkPTFfTVg0ME56YzNNekF3TVg1LU1UY3dNRFUxTVRJNE1qazRPSDVSVlRKcU9ISTRZWEZhUjNjNFRITjVTMUpUYzBWMWVsZC1mbjQmY3JlYXRlX3RpbWU9MTcwMDU1MTI4MyZub25jZT0wLjAxNzg1MzI3NzYxOTA0NTg3JnJvbGU9bW9kZXJhdG9yJmV4cGlyZV90aW1lPTE3MDMxNDMyODMmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=';
    this.state = {
      connectionId: null,
      signal: {
        data: '',
        type: '',
      },
      text: '',
      messages: [],
    };
  }

  //  sessionOptions = (sessionOptions) => {
  //   sessionOptions.androidOnTop: 'publisher',
  //   androidZOrder: 'onTop',
  //   useTextureViews: true,
  // }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.backAction());
  }
  backAction = () => {
    console.log('back pressed' + JSON.stringify(sessionRef));
    sessionRef.disconnect();
    this.props.navigation.goBack();
  };

  sessionEventHandlers(eventhandlers) {
    if (
      eventhandlers.type === 'connection' &&
      eventhandlers.data === 'ended' &&
      !requestRaised
    ) {
      const myConnectionId =
        this.session.getSessionInfo().connection.connectionId;
      const oldMessages = this.state.messages;
      const messages =
        eventhandlers.connectionId === myConnectionId
          ? [...oldMessages, {data: `Me: ${eventhandlers.data}`}]
          : [...oldMessages, {data: `Other: ${eventhandlers.data}`}];
      this.setState({
        messages,
      });
    }
  }

  // endCall = async () => {
  //   try {
  //     if (connectionId) {
  //       requestRaised = true;
  //       sessionRef.current?.signal({
  //         data: 'ended',
  //         type: 'connection',
  //         to: connectionId.current,
  //       });
  //     }

  //     setApiRequested(true);
  //     await axios.put(
  //       `${REQUESTS}/${id}/destroyTokboxSession`,
  //       {
  //         sessionId: roomId,
  //       },
  //       getOptionsWithToken(),
  //     );
  //     navigation.goBack();
  //   } catch (error) {
  //     handleApiError(error);
  //   } finally {
  //     setApiRequested(false);
  //   }
  // };

  render() {
    return (
      <View style={styles.container}>
        <OTSession
          //options={options => this.sessionOptions(options)}
          ref={sessionRef}
          apiKey={this.apiKey}
          sessionId={this.sessionId}
          //eventHandlers={() => this.sessionEventHandlers()}
          token={this.token}>
          <OTPublisher style={{width: 200, height: 200}} />
          <OTSubscriber style={{width: 200, height: 200}} />
        </OTSession>
        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Disconnect</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Toggle Video</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Cycle Camera</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._onPressButton}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Unmute</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._onPressButton}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Mute </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._onPressButton}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Call SIP</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  callSIPURL = async () => {
    let responsess = await fetch(
      'https://api.opentok.com/v2/project/46269242/dial',
      {
        method: 'POST',
        headers: {
          'X-OPENTOK-AUTH':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI0NjI2OTI0MiIsImlzdCI6InByb2plY3QiLCJpYXQiOjE2ODQ0MjU1NzEsImV4cCI6MTY4NDQyOTEzOX0.prXkBT7UR_z5lNANdObUOz41Yk0hS0gZztMWGjhvzac',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId:
            '1_MX40NjI2OTI0Mn5-MTY4NDQyMjQ4NjcwNX44RFZzLy9tbFJlMmRRMmFjaUxvZ2dGUnR-fn4',
          token:
            'T1==cGFydG5lcl9pZD00NjI2OTI0MiZzaWc9YmQ4ZDJiYTMwOGQxMjY2NmQzYjYyMjExYWRiYzg0YjgxMDVmZDBlZDpzZXNzaW9uX2lkPTFfTVg0ME5qSTJPVEkwTW41LU1UWTRORFF5TWpRNE5qY3dOWDQ0UkZaekx5OXRiRkpsTW1SUk1tRmphVXh2WjJkR1VuUi1mbjQmY3JlYXRlX3RpbWU9MTY4NDQyMjQ4NyZub25jZT0wLjI3NDUwNzUxMzAyNDgxNjI0JnJvbGU9bW9kZXJhdG9yJmV4cGlyZV90aW1lPTE2ODUwMjcyODcmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=',
          sip: {
            uri: 'sip:dsaini@sip.linphone.org;transport=tls',
          },
        }),
      },
    ).catch(function (error) {
      console.log(
        'There has been a problem with your fetch operation: ' + error.message,
      );
      // ADD THIS THROW error
      throw error;
    });
    let json = await responsess.json();
    console.log('Second  ----------' + JSON.stringify({json}));
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 100,
    paddingVertical: 50,
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#5ead97',
  },
  buttonText: {
    padding: 20,
    color: 'white',
    fontSize: 18,
  },
});

export default ConnectSession;
