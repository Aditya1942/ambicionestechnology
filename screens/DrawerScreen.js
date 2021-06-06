import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Sizes} from '../components/const';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerScreen = ({navigation}) => {
  const LogOut = () => {
    AsyncStorage.removeItem('@userTokenData');
    navigation.reset({
      routes: [{name: 'HomeScreen'}],
    });
  };
  const DrawerItem = ({lable, navigateTo}) => {
    console.log(typeof navigateTo);
    const navigate = () => {
      if (navigateTo !== '') {
        if (typeof navigateTo === 'string') {
          navigation.navigate(navigateTo);
        } else {
          let route = {};
          navigateTo.forEach((nav, i) => {
            if (i === 1) {
              let a = {screen: nav, params: {}};
              route = a;
            }
            if (i === 2) {
              let a = {screen: nav, params: {}};
              route.params = a;
            }
          });
          console.log(route);
          navigation.navigate(navigateTo[0], route);
        }
      } else if (lable === 'Logout') {
        LogOut();
      }
    };

    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        style={{
          backgroundColor: '#fff',
          borderBottomColor: '#ebebeb',
          borderBottomWidth: 1,
          height: 60,
          width: Sizes.width * 0.8,
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}
        onPress={navigate}>
        <Text style={{fontSize: 16, fontWeight: '500'}}>{lable}</Text>
      </TouchableHighlight>
    );
  };
  return (
    <View>
      <View style={styles.drawerContainer}>
        <View style={styles.drawertitle}>
          <View style={{flex: 0.8, padding: 19, borderRightWidth: 0.3}}>
            <Text style={{fontSize: 16, fontWeight: '700'}}>Menu</Text>
          </View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              flex: 0.2,

              paddingVertical: 19,
            }}
            onPress={() => {
              navigation.closeDrawer();
            }}>
            <Icon name="close" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <DrawerItem lable="Home" navigateTo={['Home', 'DashBoard']} />
        <DrawerItem lable="Members" navigateTo={['Members', 'AllMembers']} />
        <DrawerItem
          lable="Add Members"
          navigateTo={['Members', 'AddMembers']}
        />
        <DrawerItem lable="Payments" navigateTo={['Home', 'Payments']} />
        <DrawerItem lable="Logout" navigateTo="" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  drawerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  drawertitle: {
    backgroundColor: 'white',
    width: Sizes.width * 0.8,
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.3,
  },
});
export default DrawerScreen;
