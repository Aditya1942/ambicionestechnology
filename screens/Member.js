import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import CustomHeader from '../components/Header';

const Member = () => {
  return (
    <SafeAreaView>
      <CustomHeader lable="Circle" />
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text>Member Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default Member;
