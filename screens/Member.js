import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {
  Animated,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  VirtualizedList,
} from 'react-native';
import {Sizes} from '../components/const';
import CustomHeader from '../components/Header';
import AddMember from './AddMember';
import axios from '../axios';
import {getUserData} from '../Storage';
import {useFocusEffect} from '@react-navigation/core';
import {ActivityIndicator} from 'react-native';

const Stack = createStackNavigator();
const Card = ({index, title, circle, mobile, status}) => {
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
      <Text style={TextStyle}>Circle: {circle}</Text>
      <Text style={TextStyle}>Mobile: {mobile}</Text>
      <Text style={TextStyle}>Status: {status}</Text>
    </View>
  );
};
const AllMembers = ({navigation}) => {
  const [MemberData, setMemberData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const getData = () => {
    getUserData().then(userdata => {
      console.log(offset);
      if (!loading && !isListEnd) {
        console.log('getData', userdata);
        setLoading(true);
        // Service to get the data from the server to render
        axios({
          url: `/users/GetMembers/${userdata.id}?pageNumber=${offset}&pageSize=5&predicate=liked`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + userdata.token,
          },
        })
          .then(data => {
            let responseJson = data.data;
            // Successful response from the API Call
            console.log(responseJson);
            if (responseJson.length > 0) {
              setOffset(offset + 1);
              // After the response increasing the offset
              setMemberData([...MemberData, ...responseJson]);
              setLoading(false);
            } else {
              setIsListEnd(true);
              setLoading(false);
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    });
  };
  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={style.footer}>
        {loading ? (
          <ActivityIndicator color="black" style={{margin: 15}} />
        ) : null}
      </View>
    );
  };
  return (
    <View style={{padding: 20, marginBottom: 150}}>
      <FlatList
        data={MemberData}
        flashScrollIndicators={false}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={({item, index}) => {
          // console.log(item);
          return (
            <Card
              key={index}
              index={index + 1}
              title={item.firstName + ' ' + item.lastName}
              circle={item.circleName}
              mobile={item.mobile}
              status={'pending'}
            />
          );
        }}
        ListFooterComponent={renderFooter}
        onEndReached={getData}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};
const AllAdmin = ({navigation}) => {
  const [AdminData, setAdminData] = useState([]);
  const [userData, setUserData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getUserData().then(userdata => {
        setUserData(userdata);
        axios({
          url: '/users/GetMembers/' + userdata.id,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: 'Bearer ' + userdata.token,
          },
        }).then(data => {
          setAdminData(data.data);
          console.log(data, navigation);
        });
      });
    }, [navigation]),
  );

  return (
    <ScrollView style={{padding: 20}}>
      {AdminData.map((admin, i) => (
        <Card
          key={i}
          index={i + 1}
          title={admin.firstName + ' ' + admin.lastName}
          circle={admin.circleName}
          mobile={admin.mobile}
          status={'pending'}
        />
      ))}

      <View style={{height: 200}} />
    </ScrollView>
  );
};
const Main = ({navigation}) => {
  const [translateValue] = React.useState(new Animated.Value(0));
  const [CurrentTab, setCurrentTab] = React.useState(0);
  const tabWidth = Sizes.width / 2;

  const animateSlider = React.useCallback(
    index => {
      Animated.spring(translateValue, {
        toValue: index * tabWidth,
        velocity: 10,
        useNativeDriver: true,
      }).start();
    },
    [tabWidth, translateValue],
  );
  const Tab = ({children, index}) => {
    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => {
          setCurrentTab(index);
          console.log('LOL');
        }}
        style={style.tabView}>
        {children}
      </TouchableHighlight>
    );
  };

  React.useEffect(() => {
    animateSlider(CurrentTab);
  }, [CurrentTab, animateSlider]);

  return (
    <View>
      <CustomHeader label="Members" />
      {/* <View style={style.tabsView}>
        <Animated.View
          style={[
            style.slider,
            {
              transform: [{translateX: translateValue}],
              width: tabWidth - 20,
            },
          ]}
        />
        <Tab index={0}>
          <Text>Members</Text>
        </Tab>
        <Tab index={1}>
          <Text>Admin</Text>
        </Tab>
      </View> */}
      {/* {CurrentTab === 0 ? ( */}
      <AllMembers navigation={navigation} />
      {/* ) : (
        <AllAdmin navigation={navigation} />
      )} */}
    </View>
  );
};

const Member = () => {
  return (
    <Stack.Navigator
      initialRouteName={'AllMembers'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AllMembers" component={Main} />
      <Stack.Screen name="AddMembers" component={AddMember} />
    </Stack.Navigator>
  );
};
const style = StyleSheet.create({
  tabsView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  tabView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  slider: {
    height: 3,
    position: 'absolute',
    bottom: 0,
    left: 10,
    backgroundColor: '#496AD1',
    borderRadius: 10,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default Member;
//   <LinearGradient
//       colors={['#DDDDDD', '#fff', '#f0f0f0']}
//       star={{x: 0, y: 0.5}}
//       end={{x: 1, y: 0.5}}
//       style={{
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: 60,
//       }}>
