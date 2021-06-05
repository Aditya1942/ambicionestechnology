import {useFocusEffect} from '@react-navigation/core';
import axios from '../axios';
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import CustomHeader from '../components/Header';
import {getUserData} from '../Storage';

const Payments = () => {
  const Card = ({index, installment, body, date}) => {
    var d = new Date(date);
    var months = [
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
          flexDirection: 'row',
        }}>
        <View style={{flex: 0.95}}>
          <Text style={{fontSize: 20, fontWeight: '700', marginBottom: 10}}>
            {index})
            {` ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`}
          </Text>
          <Text style={TextStyle}> {body}</Text>
        </View>
        <Text style={{alignSelf: 'center', color: 'red', fontSize: 20}}>
          {installment} Kr
        </Text>
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
      <ScrollView style={{padding: 20}}>
        {PaymentData.map((payment, i) => (
          <Card
            key={payment.id}
            index={i + 1}
            date={payment.created}
            installment={payment.installment}
            body={`AdminCommission ${payment.adminCommissionAmount} Kr,${payment.commissionPercentage}%`}
          />
        ))}
        <View style={{height: 200}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payments;
