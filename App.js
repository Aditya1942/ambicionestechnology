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
import {StatusBar} from 'react-native';
import DrawerScreen from './screens/DrawerScreen';
import Splash from './screens/Splash';
import messaging from '@react-native-firebase/messaging';

// http://omba-app.ambicionestechnology.com/api/account/login
//{username: "admin", password: "Pa$$w0rd"}
const Stack = createStackNavigator();
const MainTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const BottomTabScreen = () => {
  return (
    <MainTab.Navigator tabBar={props => <BottomTab {...props} />}>
      <MainTab.Screen name="Home" component={Home} />
      <MainTab.Screen name="Members" component={Member} />
      <MainTab.Screen name="Circles" component={Circles} />
      <MainTab.Screen name="Profile" component={Profile} />
      <MainTab.Screen name="Menu" component={Profile} />
    </MainTab.Navigator>
  );
};

const CustomDrawer = () => {
  return (
    <Drawer.Navigator
      drawerPosition={'left'}
      drawerContent={props => <DrawerScreen {...props} />}
      drawerStyle={{backgroundColor: '#fff', width: Sizes.width * 0.8}}>
      <Drawer.Screen name="Main" component={BottomTabScreen} />
    </Drawer.Navigator>
  );
};

const Main = ({route}) => {
  const [LoggedIn, setLoggedIn] = useState(route?.params?.isLoggedin || false);
  useEffect(() => {
    console.log(route);
    getUserData().then(data => {
      console.log(data);
      if (!data) {
        setLoggedIn(false); //
      } else {
        setLoggedIn(true); //
      }
    });
  }, [route]);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {LoggedIn ? (
        <>
          <Stack.Screen name="CustomDrawer" component={CustomDrawer} />
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
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="HomeScreen" component={Main} />
    </Stack.Navigator>
  );
};

const App = () => {
  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then(token => {
        console.log(token);
        // return saveTokenToDatabase(token);
      });

    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      console.log(token);

      // saveTokenToDatabase(token);
    });
  }, []);
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
