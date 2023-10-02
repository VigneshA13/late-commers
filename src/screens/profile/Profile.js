import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../../components/Header';
import Images from '../../constants/Images';

const Profile = ({navigation}) => {
  const route = useRoute();
  const {serializedObject} = route.params;
  // const {name} = route.params;
  // console.log(name);
  const myObject = JSON.parse(serializedObject);
  console.log(myObject.staffImage);
  const [storedName, setStoredName] = useState('');
  const [category, setCategory] = useState('');
  useEffect(() => {
    const retrieveData = async () => {
      try {
        const retrievedName = await AsyncStorage.getItem('staffname');
        if (retrievedName !== null) {
          setStoredName(retrievedName);
          console.log(retrievedName);
        }

        const position = await AsyncStorage.getItem('category');

        if (position !== null) {
          setCategory(position);
          console.log(position);
        }
      } catch (error) {
        console.log('Error retrieving data: ' + error);
      }
    };
    retrieveData();
  }, []);

  const onLogout = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(allKeys);
      console.log('All items have been removed from AsyncStorage.');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error removing items from AsyncStorage:', error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#DBE9FA'}}>
      <Header />
      <View style={styles.row1}>
        <View style={styles.box1}>
          <Image
            source={{uri: myObject.staffImage}} // Replace with your image path
            style={styles.image2}
          />
          <Text style={styles.nameBold}>{myObject.staffname}</Text>
        </View>
      </View>
      <View style={styles.row2}>
        <View style={styles.buttonContainer}>
          <ScrollView vertical={true}>
            {category === 'VP' ||
            category === 'DP' ||
            category === 'PRINCIPLE' ? (
              <>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('MakeLate')}>
                  <Text style={styles.buttonText}>ENTER LATE COMERS</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate('TodayLate')}>
                  <Text style={styles.buttonText}>TODAY LATE COMERS</Text>
                </TouchableOpacity>
              </>
            ) : null}

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('DnoWise')}>
              <Text style={styles.buttonText}>DNO WISE REPORT</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('DateRange')}>
              <Text style={styles.buttonText}>DATE WISE REPORT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onLogout}>
              <Text style={styles.buttonText}>LOGOUT</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  row1: {
    height: responsiveHeight(20),
    flexDirection: 'row',
    margin: responsiveWidth(3),
  },
  box1: {
    flex: 1,
    backgroundColor: '#172d6b',
    borderRadius: responsiveWidth(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image2: {
    width: responsiveWidth(23),
    height: responsiveWidth(23),
    borderRadius: responsiveWidth(14),
    marginTop: responsiveHeight(0.5),
    marginBottom: responsiveHeight(0.5),
  },
  nameBold: {
    marginTop: responsiveHeight(0.5),
    marginBottom: responsiveHeight(0.5),
    color: 'white',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  // staff photo name div over
  row2: {
    backgroundColor: '#DBE9FA',
    height: responsiveHeight(70),
    flexDirection: 'row',
    margin: responsiveHeight(0),
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    top: responsiveHeight(5),
    bottom: responsiveHeight(5),
  },
  button: {
    backgroundColor: '#172d6b',
    padding: responsiveWidth(2),
    borderRadius: responsiveHeight(1),
    margin: responsiveHeight(2),
    width: responsiveWidth(75),
    height: responsiveHeight(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white', // Button text color
    fontSize: responsiveFontSize(2),
    letterSpacing: 1,
    fontWeight: '500',
  },
});
export default Profile;
