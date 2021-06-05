import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Sizes} from '../components/const';
import CustomHeader from '../components/Header';
import {getUserData, setUserInfo} from '../Storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {createStackNavigator} from '@react-navigation/stack';
import Payments from './Payments';
import Modal from 'react-native-modal';
import axios from '../axios';
import {useFocusEffect} from '@react-navigation/core';
const Stack = createStackNavigator();

const TotalBalanceCard = ({UserData, navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const TotalBalanceCarIcons = ({title, bgColor, icon, action}) => {
    const onPressHandler = () => {
      if (action === 'addMember') {
        navigation.navigate('Members', {screen: 'AddMembers'});
      } else if (action === 'payments') {
        navigation.navigate('Payments');
      } else if (action === 'withdraw') {
        toggleModal();
      }
    };
    return (
      <TouchableOpacity
        onPress={onPressHandler}
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: bgColor,
            height: 58,
            width: 58,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name={icon} size={30} color="white" />
        </View>

        <Text style={{paddingTop: 15}}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        width: Sizes.width * 0.9,
        padding: 30,
        borderRadius: 20,
        elevation: 10,
      }}>
      {/* first row  */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderColor: '#dcdce9',
          paddingBottom: 30,
        }}>
        <View>
          <Text style={{fontSize: 30, fontWeight: '700'}}>
            {`${UserData.firstName || ''} ${UserData.firstName || ''}`}
          </Text>
          <Text style={{fontSize: 18, fontWeight: '500'}}>
            {UserData.email}
            parmaraditya1942@gmail.com
          </Text>
        </View>
        {/* <View>
          <View
            style={{
              height: 64,
              width: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(98,54,255,.1)',
              color: '#6236ff',
              borderRadius: 10,
            }}/>
        </View> */}
      </View>
      {/* second row  */}
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <TotalBalanceCarIcons
          action="withdraw"
          title="Withdraw"
          icon="dollar-sign"
          bgColor="#ff396f"
        />
        <TotalBalanceCarIcons
          action="addMember"
          title="Add Member"
          icon="plus-circle"
          bgColor="#6236ff"
        />
        <TotalBalanceCarIcons
          action="payments"
          title="Payments"
          icon="file-invoice-dollar"
          bgColor="#1dcc70"
        />
      </View>
      <View style={{flex: 1}}>
        <Modal
          isVisible={isModalVisible}
          animationIn="slideInUp"
          animationOut="slideOutUp"
          onBackdropPress={() => setModalVisible(false)}>
          <View
            style={{
              height: Sizes.ITEM_HEIGHT * 0.6,
              width: Sizes.ITEM_WIDTH * 2,
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text style={{marginBottom: 20}}>Comming soon</Text>
            <Button title="close" onPress={toggleModal} />
          </View>
        </Modal>
      </View>
    </View>
  );
};

const Cards = () => {
  const Card = ({title, value, valueColor = 'black'}) => {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          width: Sizes.width * 0.43,
          borderRadius: 20,
          marginBottom: 20,
          paddingVertical: 20,
          paddingHorizontal: 30,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 3},
          shadowOpacity: 0.5,
          shadowRadius: 5,
        }}>
        <View>
          <Text
            style={{
              fontSize: 15,
              color: '#958d9e',
              fontWeight: '500',
              marginBottom: 5,
            }}>
            {title}
          </Text>
          <Text style={{fontSize: 24, fontWeight: '700', color: valueColor}}>
            {value}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        width: Sizes.width * 0.9,
        marginTop: 30,
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
      <Card title="Income" value="$ 552.95" valueColor="#1dcc70" />
      <Card title="Expenses" value="$ 86.45" valueColor="#ff396f" />
      <Card title="Total Bills" value="$ 53.25" />
      <Card title="Savings" value="$ 120.99" />
    </View>
  );
};

const Transactions = ({body, installment, date, index}) => {
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
  return (
    <View
      style={{
        width: Sizes.width * 0.9,
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 20,
        elevation: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 0.1, justifyContent: 'center'}}>
          <Text style={{fontSize: 18}}>{index})</Text>
        </View>
        <View style={{flex: 0.8, justifyContent: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: '600', color: '#27173e'}}>
            {` ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`}{' '}
          </Text>
          <Text style={{color: '#958d9e', fontSize: 16}}>{body}</Text>
        </View>
        <View style={{flex: 0.2, justifyContent: 'center'}}>
          <Text
            style={{
              color: installment < 0 ? '#ff396f' : '#27173e',
              fontWeight: '700',
              fontSize: 15,
            }}>
            {installment > 0 ? '' : '-'}Kr {installment}
          </Text>
        </View>
      </View>
    </View>
  );
};

const Circles = ({navigation}) => {
  const [circleData, setcircleData] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      getUserData().then(userdata => {
        navigation;
        axios({
          url: '/users/GetCircles/' + userdata.id,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + userdata.token,
          },
        }).then(data => {
          setcircleData(data.data);
          console.log(data);
        });
      });
    }, [navigation]),
  );
  const Circle = ({name}) => {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          width: 120,
          borderRadius: 20,
          marginBottom: 10,
          marginHorizontal: 10,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 3},
          shadowOpacity: 0.5,
          shadowRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>{name}</Text>
      </View>
    );
  };
  return (
    <View style={{height: 100, marginTop: 20}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {circleData.map(circle => (
          <Circle key={circle.id} name={circle.name} />
        ))}
      </ScrollView>
    </View>
  );
};

const Dashboard = ({navigation}) => {
  const [UserData, setUserData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [PaymentData, setPaymentData] = useState([]);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const getUserInfo = () => {
    getUserData()
      .then(data => {
        console.log('userInfo From Home page', data);

        if (data) {
          axios({
            url: '/users/admin',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              authorization: 'Bearer ' + data.token,
            },
          })
            .then(res => {
              const userData = res.data;
              console.log('userInfo From Home page', userData);

              setUserInfo(userData);
              setUserData(userData);
              return data;
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
    return 0;
  };
  const getPaymentData = () => {
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
        setPaymentData(data.data.splice(-5).reverse());
      });
    });
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      getPaymentData();
      navigation;
    }, [navigation]),
  );
  return (
    <SafeAreaView>
      <CustomHeader label="Dashboard" />
      <View style={{backgroundColor: '#f0f0f0', position: 'relative'}}>
        <ScrollView style={{zIndex: 5}}>
          <View
            style={{
              backgroundColor: '#6236ff',
              height: Sizes.ITEM_HEIGHT,
              top: 0,
              width: Sizes.width,
              position: 'absolute',
            }}
          />
          <View
            style={{
              paddingVertical: 15,
              paddingHorizontal: Sizes.width * 0.05,
            }}>
            <TotalBalanceCard UserData={UserData} navigation={navigation} />

            {/* <Cards /> */}
            <Circles />
            {/* Transactions */}
            <Button title="Add new member" onPress={toggleModal} />
            <View
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Transactions
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Payments');
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    color: 'rgba(98,54,255,.5)',
                  }}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            {PaymentData.map((payment, i) => (
              <Transactions
                key={payment.id}
                index={i + 1}
                date={payment.created}
                installment={payment.installment}
                body={`AdminCommission ${payment.adminCommissionAmount} Kr,${payment.commissionPercentage}%`}
              />
            ))}
          </View>
          <View
            style={{
              height: 100,
              marginBottom: 150,
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            {/* <Text> Copyright © Payment 2021. All Rights Reserved. </Text> */}
          </View>
        </ScrollView>
      </View>
      <View style={{flex: 1}}>
        <Modal
          isVisible={isModalVisible}
          animationIn="bounceIn"
          onBackdropPress={() => setModalVisible(false)}>
          <View
            style={{
              height: Sizes.ITEM_HEIGHT,
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 10,
            }}>
            <Text>Hello</Text>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};
const Home = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName={'DashBoard'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="DashBoard" component={Dashboard} />
      <Stack.Screen name="Payments" component={Payments} />
    </Stack.Navigator>
  );
};

export default Home;
