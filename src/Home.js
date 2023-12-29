import React, {Component} from 'react';
import {} from 'react-native-gesture-handler';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Button,
  ActivityIndicator,
  Modal,
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
import Loader from 'react-native-modal-loader';
var cameraPosition = 'front';
class Home extends Component {
  constructor(props) {
    super(props);
    this.apiKey = '47807831';
    this.sessionId = '';
    this.token = '';
    this.sessionRef = React.createRef();
    this.state = {
      animation: false,
      isConnectPressed: false,
      connectionId: null,
      isConnected: false,
      isConnectedSubscriber: false,
      iConnectedPublisher: false,
      iSessionDetailsFetch: false,
      isLoading: false,
      showModal: false,
      publisherProperties: {
        publishAudio: true,
        publishVideo: true,
        publishCaptions: true,
        cameraPosition: 'front',
      },

      subscriberProperties: {
        subscribeToAudio: true,
        subscribeToVideo: true,
        subscribeToCaptions: false,
      },

      publisherEventHandlers: {
        streamCreated: event => {
          console.log('Publisher stream created!', event);
        },
        streamDestroyed: event => {
          console.log('Publisher stream destroyed!', event);
        },
        sessionConnected: event => {
          this.setState({
            iConnectedPublisher: true,
          });
        },
      },
    };

    this.subscriberEventHandlers = {
      streamCreated: event => {
        console.log('Stream created!', event);
      },
      streamDestroyed: event => {
        console.log('Stream destroyed!', event);
      },
      sessionConnected: event => {
        this.setState({
          isConnectedSubscriber: true,
        });
      },
    };

    this.sessionEventHandlers = {
      streamCreated: event => {
        console.log('Stream created!', event);
      },
      streamDestroyed: event => {
        console.log('Stream destroyed!', event);
      },
      sessionConnected: event => {
        this.setState({
          isConnected: true,
        });
      },
    };
  }
  _onPressButton() {
    this._fetchSessionid();
    this.setState({isLoading: true});
  }
  _onConnectSession() {
    //alert(JSON.stringify(this.props));
    //this.props.navigation.navigate('SessionConnect');
    if (this.state.isConnected !== undefined) {
      if (!this.state.isConnected) {
        this.setState({
          animation: true,
          isConnectPressed: true,
        });
      } else {
        alert('Stream is already connected');
      }
    } else {
      this.setState({
        animation: true,
        isConnectPressed: true,
      });
    }
  }

  _onDisConnectSession() {
    // if (this.state.isConnected !== undefined) {
    //  else {
    //     alert('Stream is already disconnected');
    //   }
    // }
    // if (this.state.isConnected) {

    // }
    this.setState({
      isConnected: false,
      isConnectPressed: false,
    });
  }
  _onToggleVideo() {
    console.log(
      'Toggle created!' + this.state.publisherProperties.publishVideo,
    );
    if (!this.state.publisherProperties.publishVideo !== undefined) {
      if (!this.state.publisherProperties.publishVideo) {
        this.setState({
          publisherProperties: {
            publishVideo: true,
          },
        });
      } else if (this.state.publisherProperties.publishVideo) {
        this.setState({
          publisherProperties: {
            publishVideo: false,
          },
        });
      }
    } else {
      this.setState({
        publisherProperties: {
          publishVideo: true,
        },
      });
    }
  }

  _onCycleCamera() {
    console.log(
      'Cycle Camera!' +
        this.state.publisherProperties.cameraPosition +
        '------' +
        cameraPosition,
    );
    if (this.state.publisherProperties.cameraPosition !== undefined) {
      if (this.state.publisherProperties.cameraPosition == 'front') {
        cameraPosition = 'back';
        this.setState({
          publisherProperties: {
            cameraPosition: 'back',
          },
        });
      } else if (this.state.publisherProperties.cameraPosition == 'back') {
        cameraPosition = 'front';
        this.setState({
          publisherProperties: {
            cameraPosition: 'front',
          },
        });
      }
    } else if ((cameraPosition = 'front')) {
      cameraPosition = 'back';
      this.setState({
        publisherProperties: {
          cameraPosition: 'back',
        },
      });
    } else {
      cameraPosition = 'front';
      this.setState({
        publisherProperties: {
          cameraPosition: 'front',
        },
      });
    }
  }
  // componentDidUpdate(prevProps,prevState) {
  //   //alert('did update');
  //   if(prevState.isConnected !== this.state.isConnected){
  //     this.setState({animation: false});
  //   }
  // }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(
  //     ' should comp called' +
  //       JSON.stringify(cameraPosition) +
  //       ' == ' +
  //       this.state.publisherProperties.cameraPosition,
  //   );
  //   if (this.state.publisherProperties.cameraPosition == 'back') {
  //     console.log(' should comp called ...1');
  //     return false;
  //   } else if (this.state.publisherProperties.cameraPosition !== 'undefined') {
  //   }
  //   console.log(' should comp called ...2');
  //   return true;
  // }
  _MuteAudio() {
    console.log(
      'Audio Mute status!' + this.state.publisherProperties.publishAudio,
    );
    if (this.state.publisherProperties.publishAudio !== undefined) {
      if (this.state.publisherProperties.publishAudio) {
        this.setState({
          publisherProperties: {
            publishAudio: false,
          },
        });
      } else {
        alert('audio is already Muted');
      }
    } else {
      this.setState({
        publisherProperties: {
          publishAudio: false,
        },
      });
    }
  }
  _UnmuteAudio() {
    console.log(
      'Audio Unmute status!' + this.state.publisherProperties.publishAudio,
    );
    if (this.state.publisherProperties.publishAudio !== undefined) {
      if (!this.state.publisherProperties.publishAudio) {
        this.setState({
          publisherProperties: {
            publishAudio: true,
          },
        });
      } else {
        alert('audio is already Unmuted');
      }
    } else {
      this.setState({
        publisherProperties: {
          publishAudio: false,
        },
      });
    }
  }
  _fetchSessionid = async () => {
    let responsess = await fetch(
      'https://neru-68eeb4cf-video-server-live.euw1.runtime.vonage.cloud/session/47807831/testing-video-calling',
      {
        method: 'GET',
      },
    ).catch(function (error) {
      alert(
        'There has been a problem with your fetch operation: ' + error.message,
      );
      console.log(
        'There has been a problem with your fetch operation: ' + error.message,
      );
      // ADD THIS THROW error
      throw error;
    });
    let json = await responsess.json();
    console.log('API key  ----------' + json.apiKey);
    console.log('Session ID  ----------' + json.sessionId);
    console.log('Token  ----------' + json.token);
    this.sessionId = json.sessionId;
    this.token = json.token;
    this.setState({
      iSessionDetailsFetch: true,
      isLoading: false,
      showModal : true,
    });
   
  };

  closeModal(){
    this.setState({showModal : false});
  }
  render() {
    return (
      <View style={styles.container}>
        <Loader
          style={styles.loaderStyle}
          loading={this.state.isLoading}
          size={'large'}
          color="#ff66be"
        />
        {this.state.iSessionDetailsFetch ? (
          <>
            <View style={styles.containerFirst}>
              <TouchableOpacity onPress={() => this._onConnectSession()}>
                <View style={styles.buttonConnect}>
                  <Text style={styles.buttonText}>Connect</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._onDisConnectSession()}>
                <View style={styles.buttonDisconnect}>
                  <Text style={styles.buttonText}>Disconnect</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._onToggleVideo()}>
                <View style={styles.buttonToggleVideo}>
                  <Text style={styles.buttonText}>Toggle Video</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.containerSec}>
              <TouchableOpacity onPress={() => this._onCycleCamera()}>
                <View style={styles.buttonCycleCamera}>
                  <Text style={styles.buttonText}>Cycle Camera</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._UnmuteAudio()}>
                <View style={styles.buttonUnMute}>
                  <Text style={styles.buttonText}>Unmute</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._MuteAudio()}>
                <View style={styles.buttonMute}>
                  <Text style={styles.buttonText}>Mute </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.container}>
              <Modal
                animationType={'slide'}
                transparent={false}
                visible={this.state.showModal}
                onRequestClose={() => {
                  console.log('Modal has been closed.');
                }}>
                {/*All views of Modal*/}
                {/*Animation can be slide, slide, none*/}
                <View style={styles.modal}>
                  <Text selectable={true} style={styles.text}>Select and Copy this session id - {this.sessionId}</Text>
                  <Button
                   style={styles.modalButtonStyle}
                    title="Click To Close this view after copy"
                    onPress={() => {
                      this.closeModal();
                    }}
                  />
                </View>
              </Modal>
              </View>
              {/* <TouchableOpacity onPress={this._onPressButton}>
      <View style={styles.buttonCallSip}>
        <Text style={styles.buttonText}>Call SIP</Text>
      </View>
    </TouchableOpacity> */}
            </View>
          </>
        ) : (
          <TouchableOpacity onPress={() => this._onPressButton()}>
            <View style={styles.fetchSessionDetails}>
              <Text style={styles.buttonText}> Fetch Session Details </Text>
            </View>
          </TouchableOpacity>
        )}
        {this.state.isConnectPressed ? (
          <OTSession
            //options={options => this.sessionOptions(options)}
            ref={this.sessionRef}
            apiKey={this.apiKey}
            sessionId={this.sessionId}
            //eventHandlers={() => this.sessionEventHandlers()}
            token={this.token}>
            <OTPublisher
              properties={this.state.publisherProperties}
              style={{width: 200, height: 200}}
              eventHandlers={this.publisherEventHandlers}
            />
            <OTSubscriber
              properties={this.state.subscriberProperties}
              style={{width: 200, height: 200}}
              eventHandlers={this.suscriberEventHandlers}
            />
          </OTSession>
        ) : <View/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  containerFirst: {
    height: 100,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSec: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  activityIndicatorStyle: {
    height: 100,
    width: 100,
    alignContent: 'center',
    alignSelf: 'center',
  },
  loaderStyle: {
    height: 100,
    width: 100,
  },
  modalParentView : {
    flex: 1/2,
    alignItems: 'center',
    marginTop: 50,
    padding: 50,
  },
  modal: {
    flex: 1/2,
    alignItems: 'center',
    marginTop: 50,
    padding: 50,
    justifyContent: 'space-evenly',
    backgroundColor: '#e5e5e5'
  
  },
  modalButtonStyle: {
    flex: 1/2,
    marginTop: 500,
    padding: 10,
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
    fontSize: 20,
  },
  buttonConnect: {
    margin: 5,
    flex: 1 / 2,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5ead97',
  },
  fetchSessionDetails: {
    marginTop: 100,
    flex: 1,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5ead97',
  },
  buttonDisconnect: {
    margin: 5,
    flex: 1 / 2,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5ead97',
  },
  buttonCycleCamera: {
    margin: 5,
    flex: 1 / 2,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5ead97',
  },
  buttonToggleVideo: {
    margin: 5,
    flex: 1 / 2,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5ead97',
  },
  buttonMute: {
    margin: 5,
    flex: 1 / 2,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5ead97',
  },
  buttonUnMute: {
    margin: 5,
    flex: 1 / 2,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5ead97',
  },
  buttonCallSip: {
    margin: 5,
    flex: 1 / 2,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5ead97',
  },
  buttonText: {
    padding: 10,
    color: 'white',
    fontSize: 12,
  },
});

export default Home;
