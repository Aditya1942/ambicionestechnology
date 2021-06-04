import {useFocusEffect} from '@react-navigation/core';
import axios from '../axios';
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import CustomHeader from '../components/Header';
import {getUserData} from '../Storage';

const Payments = () => {
  const Card = ({index, title, body}) => {
    const TextStyle = {
      marginLeft: 10,
      color: '#6c6573',
      fontWeight: '500',
      fontSize: 16,
    };
    return (
      <View
        style={{
          padding: 15,
          paddingBottom: 20,
          marginBottom: 20,
          backgroundColor: '#fff',
          borderRadius: 10,
        }}>
        <Text style={{fontSize: 20, fontWeight: '700', marginBottom: 10}}>
          {index}) {title}
        </Text>
        <Text style={TextStyle}> {body}</Text>
      </View>
    );
  };
  const [userData, setUserData] = useState([]);
  const [PaymentData, setPaymentData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getUserData().then(userdata => {
        console.log(userdata);
        setUserData(userdata);
        axios({
          url: '/users/GetPayments/' + userdata.id,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + userdata.token,
          },
        }).then(data => {
          console.log(data);
          setPaymentData(data.data);
        });
      });
    }, []),
  );

  return (
    <SafeAreaView>
      <CustomHeader label="Payments" />
      <Text>payment</Text>
      <ScrollView style={{padding: 20}}>
        {PaymentData.map((payment, i) => (
          <Card index={i + 1} title={'title'} body="body" />
        ))}

        <View style={{height: 200}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payments;
