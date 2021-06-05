import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';
import {Sizes} from './const';
import Icon from 'react-native-vector-icons/FontAwesome5';

const totalWidth = Sizes.width;
const BottomTab = ({state, descriptors, navigation}) => {
  console.log(state);
  // bottom tab icons
  const BottomIcon = ({lable, index, route, totalTabs}) => {
    let icon = '';
    switch (lable) {
      case 'Home':
        icon = 'home';
        break;
      case 'Members':
        icon = 'users';
        break;
      case 'Circles':
        icon = 'spinner';
        break;
      case 'Profile':
        icon = 'user-circle';
        break;
      case 'Menu':
        icon = 'bars';
        break;
      default:
        icon = 'default';
        break;
    }

    const isFocused = state.index === index;
    const onPress = () => {
      console.log('tab navigation', navigation, route);
      // open menu
      if (lable === 'Menu') {
        navigation.toggleDrawer();
      } else {
        // navigate to scrreens
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
        });
        if (!isFocused && !event.defaultPrevented) {
          if (route.name === 'Member') {
            navigation.navigate(route.name, {screen: 'AllMembers'});
          } else {
            navigation.navigate(route.name);
          }
        }
      }
    };
    return (
      <Button
        onPress={onPress}
        buttonStyle={{
          ...styles.tabIconbuttonStyle,
          width: totalWidth / totalTabs,
        }}
        title={lable}
        titleStyle={{color: 'white', fontSize: 13}}
        iconContainerStyle={{flexDirection: 'column'}}
        icon={<Icon name={icon} size={23} color="white" />}
      />
    );
  };
  const [translateValue] = useState(new Animated.Value(0));

  const tabWidth = totalWidth / state.routes.length;
  const animateSlider = useCallback(
    index => {
      Animated.spring(translateValue, {
        toValue: index * tabWidth,
        velocity: 10,
        useNativeDriver: true,
      }).start();
    },
    [tabWidth, translateValue],
  );
  useEffect(() => {
    animateSlider(state.index);
  }, [animateSlider, state.index]);
  return (
    <View style={styles.tabContainer}>
      <Animated.View
        style={[
          styles.slider,
          {
            transform: [{translateX: translateValue}],
            width: tabWidth,
          },
        ]}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {state.routes.map((route, index) => (
          <BottomIcon
            key={index}
            index={index}
            route={route}
            totalTabs={state.routes.length}
            lable={route.name}
          />
        ))}
      </View>
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  tabIconbuttonStyle: {
    backgroundColor: '#4162cc',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  tabContainer: {
    height: Sizes.height * 0.08,
    width: totalWidth,
    backgroundColor: '#4162cc',
    position: 'absolute',
    bottom: 0,
    shadowOffset: {
      width: 0,
      height: -1,
    },
  },
  slider: {
    height: 1,
    zIndex: 1,
    position: 'absolute',
    bottom: 2,
    left: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
