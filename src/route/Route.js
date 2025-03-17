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
import UpdateProfile from '../pages/user/UpdateProfile';

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
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddBid" component={AddBid} />
        <Stack.Screen name="SubmitBid" component={SubmitBid} />
        <Stack.Screen name="UpdateBid" component={UpdateBid} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="AddItem" component={AddItem} />
        <Stack.Screen name="ViewBid" component={ViewBid} />
        <Stack.Screen name="EditItem" component={EditItem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
