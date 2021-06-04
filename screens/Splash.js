import Login from './Login';
import Video from 'react-native-video';
import React, {useEffect, useState} from 'react';
import {StatusBar, View} from 'react-native';
import {getUserData} from '../Storage';

const Splash = ({navigation}) => {
  useEffect(() => {
    console.log(navigation);
    let LoggedIn = false;
    getUserData().then(data => {
      console.log(data);
      if (!data) {
        LoggedIn = false; //
      } else {
        LoggedIn = true; //
      }
    });
    setTimeout(() => {
      navigation.replace('HomeScreen', {isLoggedin: LoggedIn});
    }, 2000); //<-- Time until it jumps to "MainView"
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: null,
        height: null,
        backgroundColor: '#970017',
      }}>
      <Video
        source={require('../assets/splash2.mp4')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        muted={false}
        repeat={true}
        resizeMode="contain"
      />
      <View>{StatusBar.setBackgroundColor('#970017', true)}</View>
      {/*<Image style={{ width: windowSize.width, height: windowSize.height}} source={require('./images/splash.png')}></Image>*/}
    </View>
  );
};
export default Splash;
