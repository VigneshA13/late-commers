import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Header from '../../components/Header';
import StaffName from '../../components/StaffName';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodayLate = ({navigation}) => {
  const [storedName, setStoredName] = useState('');
  const [count, setCount] = useState('');
  const [data, setData] = useState([]);
  const [staffImage, setstaffImage] = useState('');

  useEffect(() => {
    retrieveData();
    fetchData();
  }, []);
  const retrieveData = async () => {
    try {
      const retrievedName = await AsyncStorage.getItem('staffname');
      const retrievedImage = await AsyncStorage.getItem('staffImage');
      if (retrievedName !== null && retrievedImage !== null) {
        setStoredName(retrievedName);
        setstaffImage(retrievedImage);
      }
    } catch (error) {
      console.log('Error retrieving data: ' + error);
    }
  };
  const itemsPerRow = 3;
  const rows = [];
  const numRows = Math.ceil(data.length / itemsPerRow);
  for (let i = 0; i < numRows; i++) {
    const rowItems = data.slice(i * itemsPerRow, (i + 1) * itemsPerRow);

    const rowView = (
      <View key={i} style={styles.row}>
        {rowItems.map((item, j) => (
          <View key={j}>
            <Text style={styles.dnoDate}>{item.toUpperCase()}</Text>
          </View>
        ))}
      </View>
    );

    rows.push(rowView);
  }

  function goBack() {
    const myObject = {
      staffImage: staffImage,
      staffname: storedName,
    };
    navigation.navigate('Profile', {
      serializedObject: JSON.stringify(myObject),
    });
  }

  async function fetchData() {
    const response = await axios.get(
      'https://erp.sjctni.edu/api/latecomer_atten_getabsentees_today.jsp',
    );
    const originalArray = response.data.data.split(',');

    const newArray = originalArray.filter(item => item !== '');
    setData(newArray);
    setCount(newArray.length);

    console.log('check', response.data.data.split(','));
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <StaffName staffName={storedName} />

      <ScrollView style={styles.container}>
        <View style={styles.body}>
          <View style={styles.bbody}>
            <Text style={styles.bbtext}>
              TODAY LATE COMERS -{''}
              <Text style={styles.countStyle}>{count}</Text>
            </Text>
            <View style={styles.table}>
              <View style={styles.scrollView}>
                <ScrollView nestedScrollEnabled={true} style={{flex: 1}}>
                  {rows}
                </ScrollView>
              </View>
              <View style={styles.row}>
                <TouchableOpacity style={styles.btn} onPress={goBack}>
                  <Text style={styles.txt1}>BACK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    height: responsiveHeight(40),
  },
  container: {
    flex: 1,
    backgroundColor: '#c7c3c3',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  bbody: {
    margin: responsiveWidth(3),
    borderRadius: responsiveWidth(5),
    borderWidth: 2,
    borderColor: '#172d6b',
    backgroundColor: 'white',
    height: responsiveHeight(70),
  },
  bbtext: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'bold',
    fontFamily: 'Arial',
    textAlign: 'center',
    marginTop: responsiveHeight(3),
    color: '#172d6b',
  },
  table: {
    margin: responsiveHeight(2),
    flexDirection: 'column',
    borderColor: '#000',
  },
  reportrowhead: {
    flexDirection: 'row',
    paddingBottom: responsiveHeight(1),
    borderBottomWidth: 1,
  },
  cell1: {
    flex: 1,
    padding: responsiveHeight(2),
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: '#172d6b',
  },
  scrollView: {
    height: responsiveHeight(50),
    alignItems: 'center',
  },
  rowreport: {
    flexDirection: 'row',
    paddingTop: responsiveHeight(1),
    paddingBottom: responsiveHeight(0),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    paddingTop: responsiveHeight(1),
    paddingBottom: responsiveHeight(0),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    flex: 1,
    padding: responsiveWidth(2),
    textAlign: 'center',
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'bold',
    color: '#172d6b',
  },
  btn: {
    backgroundColor: '#172d6b',
    padding: responsiveWidth(1),
    margin: responsiveWidth(1),

    width: responsiveWidth(60),
    height: responsiveHeight(7),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(2),
  },
  txt1: {
    fontWeight: '500',
    color: '#fff',
    fontSize: responsiveFontSize(2),
  },
  nomsg: {
    color: 'red',
    fontSize: responsiveFontSize(2.3),
    margin: responsiveWidth(5),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countStyle: {
    fontSize: responsiveFontSize(2.3),
    color: '#172d6b',
  },
  dnoDate: {
    padding: responsiveWidth(2),
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    borderWidth: responsiveWidth(0.5),
    width: responsiveWidth(27),
    borderRadius: 8,
    margin: responsiveWidth(0.5),
    textAlign: 'center',
    flex: 1,
    color: '#172d6b',
  },
});

export default TodayLate;
