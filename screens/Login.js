import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Image, Input} from 'react-native-elements';
import {Button} from 'react-native-elements';
import {setUserData, setUserMember} from '../Storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Sizes} from '../components/const';
import axios from '../axios';
import DropdownAlert from 'react-native-dropdownalert';
const Login = ({navigation}) => {
  Sizes;
  const {width} = Sizes;
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const passwordRef = useRef();
  const [Loading, setLoading] = useState(false);
  const dropDownAlertRef = useRef();
  const HandleSubmit = () => {
    console.log(UserName, Password);
    var formData = {username: UserName, password: Password};
    if (UserName.length > 0 && Password.length > 0) {
      setLoading(true);
    }
    axios({
      url: '/account/login',
      method: 'POST',
      data: formData,
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        // Some Code if fetching is successful
        let responseJson = response.data;
        console.log(responseJson);
        console.log(response);
        if (response.status !== 200) {
          setLoading(false);
          if (responseJson.title === 'Unauthorized') {
            dropDownAlertRef.current.alertWithType(
              'error',
              'Unauthorized',
              'Invalid Password',
            );
          } else {
            dropDownAlertRef.current.alertWithType(
              'error',
              'Unauthorized',
              'Invalid UserName or Password',
            );
          }
        } else if (response.status === 200) {
          setUserData(responseJson).then(() => {
            if (responseJson) {
              axios({
                url: `/users/GetMembers/${responseJson.id}?pageNumber=1&pageSize=5&predicate=liked`,
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  authorization: 'Bearer ' + responseJson.token,
                },
              }).then(data => {
                console.log('getMember', data, navigation);
                setUserMember(data.data);
                navigation.replace('HomeScreen');
              });
            }
          });
        } else {
          dropDownAlertRef.current.alertWithType(
            'error',
            'Error',
            'Something went wrong',
          );
        }
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
        dropDownAlertRef.current.alertWithType('error', 'Error', error.message);
        // Some Code if fetching is failed
      });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          background: '#f0f0f0',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{
                marginTop: 15,
                height: 70,
                width: 70,
              }}
              source={require('../assets/Logos/red-croped.png')}
            />
            <Text
              style={{
                fontSize: 45,
                fontWeight: 'bold',
              }}>
              Log in
            </Text>
          </View>
          <KeyboardAvoidingView>
            <View
              style={{
                backgroundColor: '#fff',
                width: width * 0.9,
                marginTop: 30,
                padding: 10,
              }}>
              <Input
                placeholder="UserName"
                value={UserName}
                onChangeText={value => setUserName(value)}
                inputStyle={{color: 'black'}}
                containerStyle={{marginBottom: 10}}
                clearButtonMode={'while-editing'}
                returnKeyLabel={'next'}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  passwordRef.current.focus();
                }}
                leftIcon={<Icon name="user" size={24} color="black" />}
              />
              <Input
                placeholder="Password"
                value={Password}
                inputStyle={{color: 'black'}}
                containerStyle={{marginBottom: 10}}
                textContentType={'password'}
                autoCompleteType={'password'}
                clearButtonMode={'while-editing'}
                returnKeyLabel={'done'}
                returnKeyType={'done'}
                onChangeText={value => setPassword(value)}
                secureTextEntry={true}
                ref={passwordRef}
                onSubmitEditing={HandleSubmit}
                leftIcon={<Icon name="lock" size={24} color="black" />}
              />
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginVertical: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Register');
                }}>
                <Text style={{color: '#1a66ff', fontSize: 16}}>
                  Register Now
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{color: '#958d9e', fontSize: 16}}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          width: width,
          bottom: 0,
          marginVertical: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          title="Log in"
          onPress={HandleSubmit}
          loading={Loading}
          buttonStyle={{
            width: width * 0.8,
            height: 50,
            backgroundColor: '#6236ff',
            borderRadius: 15,
          }}
          titleStyle={{fontSize: 25}}
        />
      </View>
      <DropdownAlert ref={dropDownAlertRef} />
    </SafeAreaView>
  );
};

export default Login;
