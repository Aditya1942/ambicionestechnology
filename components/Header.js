import * as React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button, Header} from 'react-native-elements';
import {Appbar} from 'react-native-paper';
import {Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const CustomHeader = ({lable}) => {
  const [isHome, setisHome] = React.useState(true);
  const Logout = () => {
    console.log(' Logout');
  };

  const myIcon = <Icon name="reorder-four-outline" size={30} color="white" />;
  const navigation = useNavigation();
  const HeaderLeftComponent = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {isHome ? (
          <Button
            icon={<Icon name="person-circle-outline" size={30} color="white" />}
            containerStyle={{borderRadius: 50, marginRight: 20}}
            buttonStyle={{
              backgroundColor: 'transparent',
              alignSelf: 'center',
            }}
          />
        ) : (
          <Button
            icon={<Icon name="arrow-back-outline" size={30} color="white" />}
            containerStyle={{borderRadius: 50, marginRight: 20}}
            onPress={() => {
              navigation.goBack();
            }}
            buttonStyle={{
              backgroundColor: 'transparent',
              alignSelf: 'center',
            }}
          />
        )}
        <Text style={{color: 'white', fontSize: 20}}>{lable}</Text>
      </View>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log(navigation);
      if (lable !== 'Dashboard' && navigation.canGoBack()) {
        setisHome(false);
      }
    }, [lable, navigation]),
  );

  return (
    <Header
      statusBarProps={{barStyle: 'light-content'}}
      barStyle="light-content" // or directly
      linearGradientProps={{
        colors: ['#0101a7', '#0339f8', '#033af8'],
        start: {x: 0, y: 0.5},
        end: {x: 1, y: 0.5},
      }}
      ViewComponent={LinearGradient} // Don't forget this!
      rightComponent={
        <Button
          icon={myIcon}
          onPress={() => {
            navigation.toggleDrawer();
          }}
          buttonStyle={{backgroundColor: 'transparent', alignSelf: 'center'}}
        />
      }
      leftComponent={<HeaderLeftComponent />}
      leftContainerStyle={{flex: 2}}
      containerStyle={{
        backgroundColor: '#3D6DCC',
        justifyContent: 'space-around',
      }}
    />
  );
};

export default CustomHeader;
