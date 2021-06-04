import * as React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button, Header} from 'react-native-elements';
import {Text, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Sizes} from './const';

const CustomHeader = ({
  label,
  headerHeight = Sizes.ITEM_HEIGHT * 0.43,
  toggleModal = null,
}) => {
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
          // <Button
          //   icon={<Icon name="person-circle-outline" size={30} color="white" />}
          //   containerStyle={{borderRadius: 50, marginRight: 20}}
          //   buttonStyle={{
          //     backgroundColor: 'transparent',
          //     alignSelf: 'center',
          //   }}
          //   onPress={() => {
          //     navigation.navigate('Profile');
          //   }}
          // />
          <Button
            icon={myIcon}
            onPress={() => {
              navigation.toggleDrawer();
            }}
            buttonStyle={{backgroundColor: 'transparent', alignSelf: 'center'}}
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
        <Text style={{color: 'white', fontSize: 20}}>
          {label !== 'Dashboard' && label}
        </Text>
      </View>
    );
  };
  const HeaderRightComponent = () => {
    if (label === 'Circle') {
      return (
        <Button
          icon={<Icon name="add-circle-outline" size={30} color="white" />}
          onPress={toggleModal}
          buttonStyle={{backgroundColor: 'transparent', alignSelf: 'center'}}
        />
      );
    } else if (label === 'Dashboard') {
      return (
        <Button
          icon={<Icon name="person-circle-outline" size={30} color="white" />}
          containerStyle={{borderRadius: 50}}
          buttonStyle={{
            backgroundColor: 'transparent',
            alignSelf: 'flex-end',
          }}
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />
      );
    } else {
      return <View />;
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      console.log(navigation);
      if (label !== 'Dashboard' && navigation.canGoBack()) {
        setisHome(false);
      }
    }, [label, navigation]),
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
      rightComponent={<HeaderRightComponent />}
      centerComponent={
        label === 'Dashboard' && (
          <Image
            style={{zIndex: 10, height: 50, width: 38}}
            // style={{zIndex: 10, height: 55, width: 55}}
            source={require('../assets/Logos/White.png')}
          />
        )
      }
      leftComponent={<HeaderLeftComponent />}
      leftContainerStyle={label !== 'Dashboard' && {flex: 4}}
      containerStyle={{
        height: headerHeight,
        backgroundColor: '#3D6DCC',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
      }}
    />
  );
};

export default CustomHeader;
