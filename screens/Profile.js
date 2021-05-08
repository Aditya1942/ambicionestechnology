import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, Text, View} from 'react-native';
import {getUserData} from '../Storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-elements';
import CustomHeader from '../components/Header';

const Profile = ({navigation}) => {
  const [UserData, setUserData] = useState([]);
  useEffect(() => {
    getUserData().then(data => {
      console.log(data);
      if (data) {
        setUserData(data);
        if (data?.status === 401) {
          Alert.alert(data?.title);
        }
      }
    });
  }, []);
  const LogOut = () => {
    AsyncStorage.removeItem('@userData');
    navigation.reset({
      routes: [{name: 'HomeScreen'}],
    });
  };
  return (
    <SafeAreaView>
      <CustomHeader lable="Profile" />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
        }}>
        <Text style={{color: 'black'}}>{UserData.username}</Text>
        <Text>{UserData.token}</Text>
        <Button title="LogOut" onPress={LogOut} />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
