import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import CustomHeader from '../components/Header';

const Circles = () => {
  return (
    <SafeAreaView>
      <CustomHeader lable="Circle" />
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text>Circle Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default Circles;
