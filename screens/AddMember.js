import React, {useRef, useState} from 'react';
import {
  // Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

import {Input} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {Sizes} from '../components/const';
import CustomHeader from '../components/Header';
import {Picker} from '@react-native-picker/picker';
import {useFocusEffect} from '@react-navigation/core';
import {getUserData} from '../Storage';
import axios, {CancelToken} from '../axios';
import DropdownAlert from 'react-native-dropdownalert';

const AddMember = ({navigation}) => {
  const [CircleList, setCircleList] = useState([]);
  // input feilds
  const [circle, setCircle] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [UserName, setUserName] = useState('');
  const [Email, setEmail] = useState('');
  const [City, setCity] = useState('');
  const [Mobile, setMobile] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  // input feilds

  const [KeyboardView, setKeyboardView] = useState(false);

  // input refs
  const FirstNameRef = useRef();
  const LastNameNameRef = useRef();
  const UserNameRef = useRef();
  const EmailRef = useRef();
  const CityRef = useRef();
  const MobileRef = useRef();
  const PasswordRef = useRef();
  const ConfirmPasswordRef = useRef();
  // input refs
  const dropDownAlertRef = useRef();

  const onFocusHandler = reference => {
    console.log(reference.current.props.name);
    if (
      reference.current.props.name === 'FirstName' ||
      reference.current.props.name === 'LastName'
    ) {
      if (KeyboardView) setKeyboardView(false);
    } else {
      if (!KeyboardView) setKeyboardView(true);
    }
  };
  const onsubmitHandler = () => {
    let formDataArray = [
      {name: 'circle', value: circle},
      {name: 'FirstName', value: FirstName},
      {name: 'LastName', value: LastName},
      {name: 'UserName', value: UserName},
      {name: 'Email', value: Email},
      {name: 'City', value: City},
      {name: 'Mobile', value: Mobile},
      {name: 'Password', value: Password},
      {name: 'ConfirmPassword', value: ConfirmPassword},
    ];
    if (Password !== ConfirmPassword) {
      console.log(ConfirmPasswordRef.current.props);
      dropDownAlertRef.current.alertWithType(
        'error',
        '',
        "Password doesn't match.",
      );
      return 'error';
    }
    for (let i = 0; i < formDataArray.length; i++) {
      const element = formDataArray[i];
      if (element.value === '') {
        dropDownAlertRef.current.alertWithType(
          'error',
          '',
          element.name + ' is empty.',
        );
        return 'error';
      }
    }
    getUserData().then(userdata => {
      const Postdata = {
        adminUserId: userdata.id,
        circleId: circle,
        city: City,
        confirmPassword: ConfirmPassword,
        email: Email,
        firstName: FirstName,
        gender: 'male',
        lastName: LastName,
        mobile: Mobile,
        password: Password,
        username: UserName,
      };
      setUserData(userdata);
      axios({
        url: '/users/addMember',
        method: 'POST',
        data: Postdata,
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + userdata.token,
        },
      }).then(data => {
        console.log(data);
        if (data.status === 400) {
          dropDownAlertRef.current.alertWithType(
            'error',
            '',
            "User name 'email' is already taken.",
          );
        } else if (data.status === 200) {
          dropDownAlertRef.current.alertWithType(
            'success',
            'success',
            'New member added ',
          );
          setTimeout(() => {
            navigation.navigate('AllMembers');
          }, 1000);
        } else {
          dropDownAlertRef.current.alertWithType(
            'error',
            'Error',
            'Something went wrong Please try again',
          );
        }
      });
    });
    // users/addMember
    // adminUserId: 11
    // circleId: 10
    // city: "city"
    // confirmPassword: "pass"
    // email: "demo@user.com"
    // firstName: "demo"
    // gender: "male"
    // lastName: "demo "
    // mobile: "1234567891"
    // password: "pass"
    // username: "demo user "
    console.log(formDataArray);
  };
  const [UserData, setUserData] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const source = CancelToken.source();

      getUserData().then(userdata => {
        setUserData(userdata);
        axios({
          url: '/users/GetCircles/' + userdata.id,
          method: 'GET',
          cancelToken: source.token,

          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + userdata.token,
          },
        }).then(data => {
          setCircleList(data.data);
          console.log(data, navigation);
        });
      });
      return () => {
        source.cancel('hey yo! going too fast. take it easy');
      };
    }, [navigation]),
  );
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  return (
    <View>
      <CustomHeader label="Add Member" />
      <View style={{backgroundColor: '#f0f0f0', height: Sizes.height}}>
        <View style={style.containerStyle}>
          <LinearGradient
            colors={['#0339f8', '#0101a7']}
            star={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            locations={[0, 1]}
            style={style.containerTitle}>
            <View>
              <Text style={style.containerTitleText}>Add New Member</Text>
            </View>
          </LinearGradient>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={{height: 30}} />
            <KeyboardAvoidingView
              enabled={KeyboardView}
              behavior="position"
              keyboardVerticalOffset={keyboardVerticalOffset}>
              <Picker
                selectedValue={circle}
                onValueChange={(itemValue, itemIndex) => setCircle(itemValue)}>
                <Picker.Item label="Select Circle" value="" enabled={false} />
                {CircleList.map((c, i) => (
                  <Picker.Item key={c.id} label={c.name} value={c.id} />
                ))}
              </Picker>
              <Input
                type="text"
                placeholder="First Name"
                name="FirstName"
                clearButtonMode={'while-editing'}
                returnKeyLabel={'next'}
                returnKeyType={'next'}
                ref={FirstNameRef}
                value={FirstName}
                onFocus={() => onFocusHandler(FirstNameRef)}
                onChangeText={e => setFirstName(e)}
                onSubmitEditing={() => {
                  LastNameNameRef.current.focus();
                }}
              />
              <Input
                type="text"
                placeholder="Last Name"
                name="LastName"
                clearButtonMode={'while-editing'}
                returnKeyLabel={'next'}
                returnKeyType={'next'}
                ref={LastNameNameRef}
                onFocus={() => onFocusHandler(LastNameNameRef)}
                value={LastName}
                onChangeText={e => setLastName(e)}
                onSubmitEditing={() => {
                  UserNameRef.current.focus();
                }}
              />
              <Input
                type="text"
                placeholder="Username"
                name="UserName"
                clearButtonMode={'while-editing'}
                returnKeyLabel={'next'}
                returnKeyType={'next'}
                ref={UserNameRef}
                onFocus={() => onFocusHandler(UserNameRef)}
                value={UserName}
                onChangeText={e => setUserName(e)}
                onSubmitEditing={() => {
                  EmailRef.current.focus();
                }}
              />
              <Input
                type="text"
                placeholder="Email"
                name="Email"
                textContentType={'emailAddress'}
                autoCompleteType={'email'}
                clearButtonMode={'while-editing'}
                returnKeyLabel={'next'}
                returnKeyType={'next'}
                keyboardType={'email-address'}
                ref={EmailRef}
                onFocus={() => onFocusHandler(EmailRef)}
                value={Email}
                onChangeText={e => setEmail(e)}
                onSubmitEditing={() => {
                  CityRef.current.focus();
                }}
              />
              <Input
                type="text"
                placeholder="City"
                name="City"
                clearButtonMode={'while-editing'}
                returnKeyLabel={'next'}
                returnKeyType={'next'}
                ref={CityRef}
                onFocus={() => onFocusHandler(CityRef)}
                value={City}
                onChangeText={e => setCity(e)}
                onSubmitEditing={() => {
                  MobileRef.current.focus();
                }}
              />
              <Input
                type="tex"
                placeholder="Mobile"
                name="Mobile"
                clearButtonMode={'while-editing'}
                returnKeyLabel={'next'}
                returnKeyType={'next'}
                ref={MobileRef}
                onFocus={() => onFocusHandler(MobileRef)}
                value={Mobile}
                onChangeText={e => setMobile(e)}
                onSubmitEditing={() => {
                  PasswordRef.current.focus();
                }}
              />
              <Input
                type="tex"
                placeholder="Password"
                name="Password"
                clearButtonMode={'while-editing'}
                returnKeyLabel={'next'}
                returnKeyType={'next'}
                ref={PasswordRef}
                secureTextEntry={true}
                onFocus={() => onFocusHandler(PasswordRef)}
                value={Password}
                onChangeText={e => setPassword(e)}
                onSubmitEditing={() => {
                  ConfirmPasswordRef.current.focus();
                }}
              />
              <Input
                type="tex"
                placeholder="Confirm Password"
                name="ConfirmPassword"
                clearButtonMode={'while-editing'}
                returnKeyLabel={'done'}
                returnKeyType={'done'}
                ref={ConfirmPasswordRef}
                secureTextEntry={true}
                onFocus={() => onFocusHandler(ConfirmPasswordRef)}
                value={ConfirmPassword}
                onChangeText={e => setConfirmPassword(e)}
                onSubmitEditing={onsubmitHandler}
                errorMessage={''}
              />

              <Button
                onPress={onsubmitHandler}
                mode="contained"
                style={{
                  marginHorizontal: 70,
                  marginTop: 10,
                }}>
                Submit
              </Button>
            </KeyboardAvoidingView>
            <View style={{height: 300}} />
          </ScrollView>
        </View>
      </View>
      <DropdownAlert ref={dropDownAlertRef} />
    </View>
  );
};
// linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)
const style = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#fff',
    margin: 40,
    marginHorizontal: 20,
    padding: 10,

    borderRadius: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  containerTitle: {
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    position: 'relative',
    bottom: 30,
    height: 100,
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  containerTitleText: {color: '#fff', fontSize: 20},
});
export default AddMember;
