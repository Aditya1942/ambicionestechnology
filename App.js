import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
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
import Register from './screens/Register';
import axios, {CancelToken} from './axios';
import T_and_C from './screens/T_and_C';

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

const Main = ({navigation, route}) => {
  const [LoggedIn, setLoggedIn] = useState(
    route.params !== undefined ? route.params.isLoggedin : true,
  );
  const [Udata, setUdata] = useState([]);
  const UpdatePushToken = (token, jwtToken, userId) => {
    axios({
      url: '/account/updateDeviceToken/' + userId,

      method: 'POST',
      data: {deviceToken: token},
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + jwtToken,
      },
    }).then(res => {
      console.log(res);
    });
  };
  useEffect(() => {
    if (LoggedIn)
      getUserData().then(data => {
        console.log(data);
        setUdata(data);
        if (data) {
          messaging()
            .getToken()
            .then(token => {
              console.log(token);
              UpdatePushToken(token, data.token, data.id);
              // return saveTokenToDatabase(token);
            });
        } else {
          setUdata([]);
        }
      });

    return messaging().onTokenRefresh(token => {
      console.log(token);
      if (Udata.length > 0) {
        UpdatePushToken(token, Udata.token, Udata.id);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Terms" component={T_and_C} />
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
