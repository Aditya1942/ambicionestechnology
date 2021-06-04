import React, {useRef, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import {Button, TextInput} from 'react-native-paper';
import DropdownAlert from 'react-native-dropdownalert';
import {Sizes} from '../components/const';
import CustomHeader from '../components/Header';
import axios from '../axios';
import {getUserData} from '../Storage';
import {useFocusEffect} from '@react-navigation/core';

const Circles = () => {
  const [CircleName, setCircleName] = useState('');
  const [allCircles, setCircles] = useState([]);
  const [userData, setUserData] = useState([]);
  const [Update, setUpdate] = useState('');
  useFocusEffect(
    React.useCallback(() => {
      getUserData().then(userdata => {
        setUserData(userdata);
        axios({
          url: '/users/GetCircles/' + userdata.id,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + userdata.token,
          },
        }).then(data => {
          setCircles(data.data);
          console.log(data, Update);
        });
      });
    }, [Update]),
  );

  const addNewCircle = () => {
    axios({
      url: '/users/AddCircle',
      method: 'POST',
      data: {name: CircleName, userId: userData.id},
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + userData.token,
      },
    }).then(data => {
      console.log(data);
      if (data.status === 200) {
        dropDownAlertRef.current.alertWithType(
          'success',
          'Success',
          'New circle Added',
        );
      } else if (data.status === 400) {
        dropDownAlertRef.current.alertWithType(
          'warn',
          '',
          'Circle name already used.',
        );
      }
      setCircleName('');
      setUpdate(data);
    });
  };
  const dropDownAlertRef = useRef();
  return (
    <SafeAreaView>
      <CustomHeader label="Circle" />
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#f0f0f0',
          height: Sizes.height,
        }}>
        <View style={{marginTop: 50, width: 300}}>
          <Text
            style={{
              color: '#e83e8c',
              fontSize: 16,
              marginLeft: 10,
            }}>
            5000 Kr. Fixed
          </Text>
          <TextInput
            Type={'outlined'}
            style={{backgroundColor: '#fff'}}
            label="Circle Name"
            value={CircleName}
            onChangeText={text => setCircleName(text)}
          />
          <Button
            onPress={addNewCircle}
            mode="contained"
            style={{
              marginHorizontal: 70,
              marginTop: 10,
            }}>
            Add New Circle
          </Button>
        </View>
        <ScrollView style={{width: Sizes.width, marginTop: 5}}>
          {allCircles.map((c, i) => (
            <ListItem key={i} bottomDivider>
              <Avatar
                rounded
                title={i + 1}
                overlayContainerStyle={{backgroundColor: '#4162cc'}}
              />

              <ListItem.Content>
                <ListItem.Title>{c.name}</ListItem.Title>
                {/* <ListItem.Subtitle>{c.subtitle}</ListItem.Subtitle> */}
              </ListItem.Content>
            </ListItem>
          ))}

          {/* <Card
          containerStyle={{
            borderWidth: 0,
            elevation: 0,
            backgroundColor: '#f0f0f0',
          }}
          wrapperStyle={{
            backgroundColor: '#fff',
            width: Sizes.width * 0.9,
            elevation: 0,
          }}>
          {Circles.map((c, i) => (
            <View
              style={{
                padding: 15,
                borderWidth: 1,
                borderColor: '#e1e8ee',
                borderTopWidth: i === 0 ? 1 : 0,
              }}>
              <Text>{c.name}</Text>
            </View>
          ))}
        </Card> */}
        </ScrollView>
        <View style={{height: 150}} />
      </View>

      <DropdownAlert ref={dropDownAlertRef} />
    </SafeAreaView>
  );
};

export default Circles;
