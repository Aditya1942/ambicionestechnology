import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Sizes} from '../components/const';

const DrawerScreen = ({navigation}) => {
  return (
    <View>
      <View style={styles.drawerContainer}>
        <View style={styles.drawerItem}>
          <View style={{flex: 0.8, padding: 15, borderRightWidth: 0.3}}>
            <Text style={{fontSize: 16, fontWeight: '700'}}>Menu</Text>
          </View>
          <TouchableOpacity
            style={{alignItems: 'center', flex: 0.2}}
            onPress={() => {
              navigation.closeDrawer();
            }}>
            <Icon name="close" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  drawerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  drawerItem: {
    backgroundColor: 'white',
    width: Sizes.width * 0.8,
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.3,
  },
});
export default DrawerScreen;
