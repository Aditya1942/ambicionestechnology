import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Image} from 'react-native-elements';

const T_and_C = () => {
  return (
    <View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{
            marginTop: 15,
            height: 70,
            width: 70,
          }}
          source={require('../assets/Logos/red-croped.png')}
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
          }}>
          Terms and Conditions
        </Text>
      </View>
      <View style={{padding: 20}}>
        <Text style={styles.ConditionText}>
          <Text style={styles.ConditionTextNumber}>1) </Text>
          You can not move out in the first round.
        </Text>
        <Text style={styles.ConditionText}>
          <Text style={styles.ConditionTextNumber}>2) </Text>
          They has to be 8 people at all time for you to recieve your salary.
        </Text>
        <Text style={styles.ConditionText}>
          <Text style={styles.ConditionTextNumber}>3) </Text>
          You gonna have check in if you will continue next or you gonna exit
          yourself from Bietu.
        </Text>
        <Text style={styles.ConditionText}>
          <Text style={styles.ConditionTextNumber}>4) </Text>
          You will get a notification to where and who you will send money to.
        </Text>
        <Text style={styles.ConditionText}>
          <Text style={styles.ConditionTextNumber}>5) </Text>
          You will leave in 5000 kroner whether you live or to continue.
        </Text>
        <Text style={styles.ConditionText}>
          <Text style={styles.ConditionTextNumber}>6) </Text>
          1% goes to charity for Ubuntu Afrika
        </Text>
        <Text style={styles.ConditionText}>
          <Text style={styles.ConditionTextNumber}>7) </Text>
          Make SURE all the 8 people in your circle pay in time( within a month)
          for you to collect your money
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  ConditionText: {
    fontSize: 16,
    marginVertical: 10,
  },
  ConditionTextNumber: {
    fontWeight: 'bold',
  },
});
export default T_and_C;
