/* eslint-disable prettier/prettier */
import React from 'react';
import {} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
// import Home from '../screens/Home';
// import {RoutesList} from './routes';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} />
    </NavigationContainer>
  );
}
 // callSIPURL = async () => {
  //   let responsess = await fetch(
  //     'https://api.opentok.com/v2/project/46269242/dial',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'X-OPENTOK-AUTH':
  //           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI0NjI2OTI0MiIsImlzdCI6InByb2plY3QiLCJpYXQiOjE2ODQ0MjU1NzEsImV4cCI6MTY4NDQyOTEzOX0.prXkBT7UR_z5lNANdObUOz41Yk0hS0gZztMWGjhvzac',
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         sessionId:
  //           '1_MX40NjI2OTI0Mn5-MTY4NDQyMjQ4NjcwNX44RFZzLy9tbFJlMmRRMmFjaUxvZ2dGUnR-fn4',
  //         token:
  //           'T1==cGFydG5lcl9pZD00NjI2OTI0MiZzaWc9YmQ4ZDJiYTMwOGQxMjY2NmQzYjYyMjExYWRiYzg0YjgxMDVmZDBlZDpzZXNzaW9uX2lkPTFfTVg0ME5qSTJPVEkwTW41LU1UWTRORFF5TWpRNE5qY3dOWDQ0UkZaekx5OXRiRkpsTW1SUk1tRmphVXh2WjJkR1VuUi1mbjQmY3JlYXRlX3RpbWU9MTY4NDQyMjQ4NyZub25jZT0wLjI3NDUwNzUxMzAyNDgxNjI0JnJvbGU9bW9kZXJhdG9yJmV4cGlyZV90aW1lPTE2ODUwMjcyODcmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=',
  //         sip: {
  //           uri: 'sip:dsaini@sip.linphone.org;transport=tls',
  //         },
  //       }),
  //     },
  //   ).catch(function (error) {
  //     console.log(
  //       'There has been a problem with your fetch operation: ' + error.message,
  //     );
  //     // ADD THIS THROW error
  //     throw error;
  //   });
  //   let json = await responsess.json();
  //   console.log('Second  ----------' + JSON.stringify({json}));
  // };
