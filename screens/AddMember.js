import React, {useState} from 'react';
import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Input} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {Sizes} from '../components/const';
import CustomHeader from '../components/Header';
import {Picker} from '@react-native-picker/picker';

const AddMember = () => {
  const [circle, setCircle] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [UserName, setUserName] = useState('');
  const [Email, setEmail] = useState('');
  const [City, setCity] = useState('');
  const [Mobile, setMobile] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
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
          <ScrollView>
            <KeyboardAvoidingView behavior={'padding'}>
              <Picker
                selectedValue={circle}
                onValueChange={(itemValue, itemIndex) => setCircle(itemValue)}>
                <Picker.Item label="Select Circle" value="" enabled={false} />
                <Picker.Item label="Circle 1" value="Circle 1" />
                <Picker.Item label="Circle 2" value="Circle 2" />
              </Picker>
              <Input
                type="text"
                placeholder="First Name"
                value={FirstName}
                onChangeText={e => setFirstName(e)}
              />
              <Input
                type="text"
                placeholder="Last Name"
                value={LastName}
                onChangeText={e => setLastName(e)}
              />
              <Input
                type="text"
                placeholder="Username"
                value={UserName}
                onChangeText={e => setUserName(e)}
              />
              <Input
                type="text"
                placeholder="Enail"
                value={Email}
                onChangeText={e => setEmail(e)}
              />
              <Input
                type="text"
                placeholder="City"
                value={City}
                onChangeText={e => setCity(e)}
              />
              <Input
                type="tex"
                placeholder="Mobile"
                value={Mobile}
                onChangeText={e => setMobile(e)}
              />
              <Input
                type="tex"
                placeholder="Password"
                value={Password}
                onChangeText={e => setPassword(e)}
              />
              <Input
                type="tex"
                placeholder="Confirm Password"
                value={ConfirmPassword}
                onChangeText={e => setConfirmPassword(e)}
              />
              <Button
                style={{borderRadius: 10}}
                color="#82b1ff"
                title="Submit"
                type="outline"
              />
            </KeyboardAvoidingView>
            <View style={{height: 150}} />
          </ScrollView>
        </View>
      </View>
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
