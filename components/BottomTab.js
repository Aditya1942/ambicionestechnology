import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import {Sizes} from './const';
import Icon from 'react-native-vector-icons/FontAwesome5';

const totalWidth = Sizes.width;
const BottomTab = ({state, descriptors, navigation}) => {
  // bottom tab icons
  const BottomIcon = ({lable, index, route, totalTabs}) => {
    let icon = '';
    switch (lable) {
      case 'Home':
        icon = 'home';
        break;
      case 'Member':
        icon = 'users';
        break;
      case 'Circles':
        icon = 'dollar-sign';
        break;
      case 'Profile':
        icon = 'user-circle';
        break;
      default:
        icon = 'default';
        break;
    }

    const isFocused = state.index === index;
    const onPress = () => {
      console.log('tab navigation');
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };
    return (
      <Button
        onPress={onPress}
        buttonStyle={{
          ...(isFocused
            ? styles.tabIconbuttonStyleActive
            : styles.tabIconbuttonStyle),
          width: totalWidth / totalTabs,
        }}
        title={lable}
        titleStyle={{color: 'white', fontSize: 13}}
        iconContainerStyle={{flexDirection: 'column'}}
        icon={<Icon name={icon} size={23} color="white" />}
      />
    );
  };
  console.log(state, descriptors);
  return (
    <View style={styles.tabContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
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
    flex: 1,
  },
  tabIconbuttonStyleActive: {
    justifyContent: 'center',
    backgroundColor: '#4162cc',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  tabContainer: {
    height: Sizes.height * 0.08,
    width: totalWidth,
    shadowOpacity: 0.1,
    shadowRadius: 4.0,
    backgroundColor: '#4162cc',
    elevation: 10,
    position: 'absolute',
    bottom: 0,
    // borderTopRightRadius: 50,
    // borderTopLeftRadius: 50,
    shadowOffset: {
      width: 0,
      height: -1,
    },
  },
});

// const onPress = index => {
//   console.log('tab navigation');
//   let route = state.routes[index];
//   const event = navigation.emit({
//     type: 'tabPress',
//     target: route.key,
//   });

//   if (!event.defaultPrevented) {
//     navigation.navigate(route.name);
//   }
// };
// return (
//   <Tab
//     onChange={index => {
//       console.log('object', state.routes[index]);
//       onPress(index);
//     }}>
//     {state.routes.map((route, i) => {
//       return (
//         <Tab.Item
//           title={route.name}
//           key={i}
//           active={state.index === i}
//           titleStyle={{
//             color: 'white',
//             fontSize: 12,
//           }}
//           buttonStyle={{
//             borderBottomColor: '#fff',
//           }}
//           containerStyle={{
//             borderColor: 'white',
//             backgroundColor: '#4162cc',
//             // backgroundColor: '#ca71eb',
//           }}
//           icon={{
//             name: 'home',
//             size: 30,
//             color: 'white',
//           }}
//         />
//       );
//     })}
//   </Tab>
// );
