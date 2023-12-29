import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {} from 'react-native-gesture-handler';
import Home from './src/Home';
import ConnectSession from './src/ConnectSession';

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: true}}>
          <Stack.Screen
            screenOptions={{headerShown: true}}
            navigation={this.props.navigation}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            screenOptions={{headerShown: true}}
            navigation={this.props.navigation}
            name="SessionConnect"
            component={ConnectSession}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
