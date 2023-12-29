import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {
  OTPublisher,
  OTPublisherProperties,
  OTSession,
  OTSessionEventHandlers,
  OTSessionSessionOptions,
  OTSubscriber,
  OTSubscriberEventHandlers,
  SignalEvent,
} from 'opentok-react-native';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from 'react-native-screens/native-stack';

import {REQUESTS} from '../../../util/apiContants';
import useApiOptions from '../../../hooks/useApiOptions';
import useNetworkErrorHandling from '../../../hooks/useNetworkErrorHandling';
import {alertWithOneButton} from '../../../util/alerts';

const sessionOptions: OTSessionSessionOptions = {
  androidOnTop: 'publisher',
  androidZOrder: 'onTop',
  useTextureViews: true,
};

const publisherProperties: OTPublisherProperties = {cameraPosition: 'front'};

const HandleRequest: React.FC<any> = ({route: {params}}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const {tokboxApiKey, roomId, subscriberToken, description, id} = params;
  const {t} = useTranslation();
  const requestRaised = useRef(false);
  const connectionId = useRef('');
  const {handleApiError} = useNetworkErrorHandling();
  const {getOptionsWithToken} = useApiOptions();
  const sessionRef = useRef<any>(null);
  const [apiRequested, setApiRequested] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const sessionEventHandlers: OTSessionEventHandlers = {
    signal: (event: SignalEvent) => {
      if (event.type === 'connection' && event.data === 'ended' && !requestRaised.current) {
        alertWithOneButton(
          t('handle_request.call_end'),
          t('handle_request.call_end_message'),
          t('global.ok_label'),
          () => {
            navigation.pop();
          },
        );
      }
    },
  };

  const subscriberEventHandlers: OTSubscriberEventHandlers = {
    connected: (event: any) => {
      connectionId.current = event.stream?.connection?.connectionId;
      setIsSubscribed(true);
    },
    disconnected: () => {
      setIsSubscribed(false);
    },
    otrnError: error => {
      console.log('Subscriber connection error', error);
    },
    error: error => {
      setIsSubscribed(false);
    },
  };

  const endCall = async () => {
    try {
      if (connectionId.current) {
        requestRaised.current = true;
        sessionRef.current?.signal({
          data: 'ended',
          type: 'connection',
          to: connectionId.current,
        });
      }

      setApiRequested(true);
      await axios.put(
        `${REQUESTS}/${id}/destroyTokboxSession`,
        {
          sessionId: roomId,
        },
        getOptionsWithToken(),
      );
      navigation.goBack();
    } catch (error) {
      handleApiError(error);
    } finally {
      setApiRequested(false);
    }
  };

  return (
    <View style={styles.pageContainer}>
      <OTSession
        ref={sessionRef}
        options={sessionOptions}
        apiKey={tokboxApiKey}
        sessionId={roomId}
        eventHandlers={sessionEventHandlers}
        token={subscriberToken}>
        <OTSubscriber
          style={styles.subscriber}
          eventHandlers={subscriberEventHandlers}
        />
        <OTPublisher
          properties={publisherProperties}
          style={isSubscribed ? styles.publisher : styles.subscriber}
        />
      </OTSession>
      <View style={styles.footer}>
        <View style={styles.description}>
          <Text variant={'bodyLarge'}>{description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            mode={'contained'}
            onPress={endCall}
            disabled={apiRequested}
            loading={apiRequested}>
            {t('handle_request.end_call')}
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  videoCall: {
    flex: 1,
  },
  description: {
    padding: 8,
  },
  footer: {
    padding: 8,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 8,
  },
  subscriber: {width: '100%', height: '100%'},
  publisher: {
    width: 120,
    height: 120,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default HandleRequest;
