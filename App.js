import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import Login from './screens/Login';
import {getUserData} from './Storage';
import {Provider as PaperProvider} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Member from './screens/Member';
import BottomTab from './components/BottomTab';
import Circles from './screens/Circles';
import Profile from './screens/Profile';
import {Sizes} from './components/const';
import {StatusBar, Text, View} from 'react-native';
import DrawerScreen from './screens/DrawerScreen';

// http://omba-app.ambicionestechnology.com/api/account/login
//{username: "admin", password: "Pa$$w0rd"}
const Stack = createStackNavigator();
const MainTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const BottomTabScreen = () => {
  return (
    <MainTab.Navigator tabBar={props => <BottomTab {...props} />}>
      <MainTab.Screen name="Home" component={Home} />
      <MainTab.Screen name="Member" component={Member} />
      <MainTab.Screen name="Circles" component={Circles} />
      <MainTab.Screen name="Profile" component={Profile} />
    </MainTab.Navigator>
  );
};

const CustomDrawer = () => {
  return (
    <Drawer.Navigator
      drawerPosition={'right'}
      drawerContent={props => <DrawerScreen {...props} />}
      drawerStyle={{backgroundColor: '#fff', width: Sizes.width * 0.8}}>
      <Drawer.Screen name="Main" component={BottomTabScreen} />
    </Drawer.Navigator>
  );
};

const Main = () => {
  const [LoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    getUserData().then(data => {
      console.log(data);
      if (!data) {
        setLoggedIn(false); //
      } else {
        setLoggedIn(true); //
      }
    });
  }, []);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {LoggedIn ? (
        <>
          <Stack.Screen name="Home" component={CustomDrawer} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
        </>
      )}
    </Stack.Navigator>
  );
};
const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={Main} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <StatusBar hidden={true} />
        <MainStack />
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
