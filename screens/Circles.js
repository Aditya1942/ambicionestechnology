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
import Modal from 'react-native-modal';

const Circles = () => {
  const [CircleName, setCircleName] = useState('');
  const [allCircles, setCircles] = useState([]);
  const [userData, setUserData] = useState([]);
  const [Update, setUpdate] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
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
    if (CircleName !== '') {
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
        setModalVisible(false);
        setCircleName('');
        setUpdate(data);
      });
    }
  };
  const dropDownAlertRef = useRef();
  return (
    <SafeAreaView>
      <CustomHeader label="Circle" toggleModal={toggleModal} />
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#f0f0f0',
          height: Sizes.height,
        }}>
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
        </ScrollView>
        <View style={{height: 150}} />
      </View>
      <View style={{flex: 1}}>
        <Modal
          isVisible={isModalVisible}
          animationIn="bounceIn"
          onBackdropPress={() => setModalVisible(false)}>
          <View
            style={{
              height: Sizes.ITEM_HEIGHT,
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 10,
            }}>
            <TextInput
              Type={'outlined'}
              style={{backgroundColor: '#fff'}}
              label="Circle Name"
              value={CircleName}
              onSubmitEditing={addNewCircle}
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
        </Modal>
      </View>

      <DropdownAlert ref={dropDownAlertRef} />
    </SafeAreaView>
  );
};

export default Circles;
