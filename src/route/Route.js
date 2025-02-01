import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddBid from '../pages/bid/addbid/AddBid';
import ViewBid from '../pages/bid/viewbid/ViewBid';
import SignIn from '../pages/auth/signin/SignIn';
import Home from '../pages/home/Home';
import SubmitBid from '../pages/bid/submitbid/SubmitBid';
import UpdateBid from '../pages/bid/updatebid/UpdateBid';
import AddItem from '../pages/item/additem/AddItem';
import EditItem from '../pages/item/edititem/EditItem';
import ProfileScreen from '../pages/user/ProfileScreen';
import ResetPassword from '../pages/auth/resetpassword/ResetPassword';
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
          name="UpdateBid"
          component={UpdateBid} // Placeholder component
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
        <Stack.Screen
          name="AddItem"
          component={AddItem} // Placeholder component
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewBid"
          component={ViewBid} // Placeholder component
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditItem"
          component={EditItem} // Placeholder component
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
