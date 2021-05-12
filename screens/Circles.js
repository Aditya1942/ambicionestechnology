import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Avatar, Card, Input, ListItem} from 'react-native-elements';
import {Button, DataTable, TextInput} from 'react-native-paper';
import {Sizes} from '../components/const';
import CustomHeader from '../components/Header';

const Circles = () => {
  const [CircleName, setCircleName] = useState('');
  const [Circles, setCircles] = useState([]);
  useEffect(() => {
    setCircles([
      {id: 1, name: 'Circle 1 '},
      {id: 2, name: 'Circle 2 '},
      {id: 3, name: 'Circle 3 '},
      {id: 4, name: 'Circle 4 '},
      {id: 1, name: 'Circle 1 '},
      {id: 2, name: 'Circle 2 '},
      {id: 3, name: 'Circle 3 '},
      {id: 4, name: 'Circle 4 '},
      {id: 1, name: 'Circle 1 '},
      {id: 2, name: 'Circle 2 '},
      {id: 3, name: 'Circle 3 '},
      {id: 4, name: 'Circle 4 '},
    ]);
  }, []);
  return (
    <SafeAreaView>
      <CustomHeader label="Circle" />
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#f0f0f0',
          height: Sizes.height,
        }}>
        <View style={{marginTop: 50, width: 300}}>
          <Text
            style={{
              color: '#e83e8c',
              fontSize: 16,
              marginLeft: 10,
            }}>
            5000 Kr. Fixed
          </Text>
          <TextInput
            Type={'outlined'}
            style={{backgroundColor: '#fff'}}
            label="Circle Name"
            value={CircleName}
            onChangeText={text => setCircleName(text)}
          />
          <Button
            onPress={() => console.log('Pressed')}
            mode="contained"
            style={{
              marginHorizontal: 70,
              marginTop: 10,
            }}>
            Add New Circle
          </Button>
        </View>
        <ScrollView style={{width: Sizes.width, marginTop: 5}}>
          {Circles.map((c, i) => (
            <ListItem key={i} bottomDivider>
              <Avatar
                rounded
                title={i + 1}
                overlayContainerStyle={{backgroundColor: '#4162cc'}}
              />

              <ListItem.Content>
                <ListItem.Title>{c.name}</ListItem.Title>
                {/* <ListItem.Subtitle>{c.subtitle}</ListItem.Subtitle> */}
              </ListItem.Content>
            </ListItem>
          ))}

          {/* <Card
          containerStyle={{
            borderWidth: 0,
            elevation: 0,
            backgroundColor: '#f0f0f0',
          }}
          wrapperStyle={{
            backgroundColor: '#fff',
            width: Sizes.width * 0.9,
            elevation: 0,
          }}>
          {Circles.map((c, i) => (
            <View
              style={{
                padding: 15,
                borderWidth: 1,
                borderColor: '#e1e8ee',
                borderTopWidth: i === 0 ? 1 : 0,
              }}>
              <Text>{c.name}</Text>
            </View>
          ))}
        </Card> */}
        </ScrollView>
        <View style={{height: 150}} />
      </View>
    </SafeAreaView>
  );
};

export default Circles;
