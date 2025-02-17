import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
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
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

const Route = () => {
  const {user} = useSelector(state => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={!user ? 'SignIn' : 'Home'}>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddBid"
          component={AddBid}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SubmitBid"
          component={SubmitBid}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UpdateBid"
          component={UpdateBid}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddItem"
          component={AddItem}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewBid"
          component={ViewBid}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditItem"
          component={EditItem}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
