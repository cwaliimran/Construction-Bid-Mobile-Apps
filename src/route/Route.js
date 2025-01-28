import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddBid from '../pages/bid/AddBid';
import SignIn from '../pages/auth/SignIn';
import Home from '../pages/home/Home';
import SubmitBid from '../pages/bid/SubmitBid';
import ProfileScreen from '../pages/user/ProfileScreen';
import ResetPassword from '../pages/auth/ResetPassword';
const Stack = createStackNavigator();

const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignIn} // Placeholder component
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home} // Placeholder component
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddBid"
          component={AddBid} // Placeholder component
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SubmitBid"
          component={SubmitBid} // Placeholder component
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen} // Placeholder component
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword} // Placeholder component
          options={{headerShown: false}}
        />
        {/* 
        <Stack.Screen
          name="Profile"
          component={Profile} // Placeholder component
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile} // Placeholder component
          options={{headerShown: false}}
        />{' '}
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
