import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, View} from 'react-native';
import {getUserInfo} from '../Storage';
import CustomHeader from '../components/Header';
import {Sizes} from '../components/const';
import {Avatar} from 'react-native-elements';
import {Input} from 'react-native-elements';

const Profile = ({navigation}) => {
  const [UserData, setUserData] = useState([]);
  const [created, setCreated] = useState('');
  useEffect(() => {
    getUserInfo().then(userData => {
      console.log(userData);
      setUserData(userData);
      var d = new Date(userData.created);
      var Months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];

      setCreated(`${d.getDate()} ${Months[d.getMonth()]} ${d.getFullYear()}`);
      console.log(`${d.getDate()} ${d.getMonth()} ${d.getFullYear()}`);
    });
  }, []);
  console.log(Sizes.height);
  return (
    <SafeAreaView>
      <View style={{}}>
        <CustomHeader label="Profile" headerHeight={Sizes.ITEM_HEIGHT * 1.2} />
        <View
          style={{
            position: 'relative',
            bottom: 100,
            left: Sizes.width / 2,
            transform: [{translateX: -80}],
          }}>
          <Avatar
            rounded
            size="xlarge"
            overlayContainerStyle={{backgroundColor: 'grey'}}
            icon={{name: 'user', type: 'font-awesome'}}
          />
        </View>
        <View
          style={{
            marginTop: 20,
            position: 'relative',
            bottom: 80,
            margin: 30,
          }}>
          <View>
            <Input
              disabled
              value={
                UserData?.firstName && UserData?.lastName
                  ? `${UserData?.firstName} ${UserData?.lastName}`
                  : ''
              }
              label="Name:"
              labelStyle={{color: '#4162cc'}}
              inputContainerStyle={{borderColor: '#4162cc', marginTop: 0}}
            />
          </View>
          <View>
            <Input
              disabled
              value={UserData?.city}
              label="Location:"
              labelStyle={{color: '#4162cc'}}
              inputContainerStyle={{borderColor: '#4162cc', marginTop: 0}}
              containerStyle={{margin: 0, padding: 0}}
            />
          </View>
          <View>
            <Input
              disabled
              value={UserData?.mobile}
              label="Mobile:"
              labelStyle={{color: '#4162cc', margin: 0, padding: 0}}
              inputContainerStyle={{borderColor: '#4162cc', marginTop: 0}}
            />
          </View>
          <View>
            <Input
              disabled
              value={created}
              label="Member Since:"
              labelStyle={{color: '#4162cc', margin: 0, padding: 0}}
              inputContainerStyle={{borderColor: '#4162cc', marginTop: 0}}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
