import Login from './Login';
import Video from 'react-native-video';
import React, {useEffect, useState} from 'react';
import {StatusBar, View} from 'react-native';
import {getUserData, setUserMember} from '../Storage';
import axios, {CancelToken} from '../axios';

const Splash = ({navigation}) => {
  useEffect(() => {
    console.log(navigation);
    let LoggedIn = false;
    getUserData().then(data => {
      const source = CancelToken.source();

      console.log(data);
      if (!data) {
        LoggedIn = false; //
      } else {
        LoggedIn = true; //
      }
      if (LoggedIn) {
        axios({
          url: `/users/GetMembers/${data.id}?pageNumber=1&pageSize=5&predicate=liked`,
          method: 'GET',
          cancelToken: source.token,

          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + data.token,
          },
        }).then(data => {
          console.log('getMember', data);
          setUserMember(data.data);
        });
      }
    });
    setTimeout(() => {
      navigation.replace('HomeScreen', {isLoggedin: LoggedIn});
    }, 12000); //<-- Time until it jumps to "MainView"
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
