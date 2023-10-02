import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';
import StaffName from '../../components/StaffName';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useRoute} from '@react-navigation/native';

const DateRangeList = ({navigation}) => {
  const route = useRoute();
  const {data} = route.params;

  console.log(data);
  const [storedName, setStoredName] = useState('');
  const [staffImage, setstaffImage] = useState('');
  useEffect(() => {
    retrieveData();
  }, []);
  const retrieveData = async () => {
    try {
      const retrievedName = await AsyncStorage.getItem('staffname');
      const retrievedImage = await AsyncStorage.getItem('staffImage');
      if (retrievedName !== null && retrievedImage !== null) {
        setStoredName(retrievedName);
        setstaffImage(retrievedImage);
        console.log(retrievedImage);
      }
    } catch (error) {
      console.log('Error retrieving data: ' + error);
    }
  };
  function formatDate(date) {
    const parts = date.split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const month = parts[1];
      const day = parts[2];
      return `${day}-${month}-${year}`;
    }
  }
  function convertToAMPM(timeString) {
    const timeParts = timeString.split(':');
    if (timeParts.length === 3) {
      let hours = parseInt(timeParts[0], 10);
      const minutes = timeParts[1];
      const seconds = timeParts[2].split('.')[0]; // Remove milliseconds
      let ampm = 'AM';

      if (hours >= 12) {
        if (hours > 12) {
          hours -= 12;
        }
        ampm = 'PM';
      }

      // Handle midnight (12:00 AM)
      if (hours === 0) {
        hours = 12;
      }

      return `${hours}:${minutes} ${ampm}`;
    } else {
      // Handle invalid input
      return 'Invalid Time';
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <StaffName staffName={storedName} />

      <ScrollView style={styles.container}>
        <View style={styles.body}>
          <View style={styles.bbody}>
            <Text style={styles.bbtext}>
              TOTAL DAYS - {''}
              <Text style={styles.countStyle}>{data.length}</Text>
            </Text>
            <View style={styles.table}>
              <View style={styles.reportrowhead}>
                <Text style={styles.cell1}>DNO</Text>
                <Text style={styles.cell1}>TIME</Text>
              </View>
              <ScrollView style={styles.scroll} nestedScrollEnabled={true}>
                {data && data.length > 0 ? (
                  data.map(item => {
                    let [datePart, timePart] = item.dateandtime.split(' ');
                    return (
                      <View key={item.id} style={styles.rowreport}>
                        <Text style={styles.cell}>{formatDate(datePart)}</Text>
                        <Text style={styles.cell}>
                          {convertToAMPM(timePart)}
                        </Text>
                      </View>
                    );
                  })
                ) : (
                  <Text style={styles.nomsg}>No records found</Text>
                )}
              </ScrollView>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => navigation.navigate('DateRange')}>
                  <Text style={styles.txt1}>GO BACK</Text>
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
  rowreport: {
    flexDirection: 'row',
    paddingTop: responsiveHeight(5),
    paddingBottom: responsiveHeight(0),
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(1),
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
    color: 'red',
  },
});

export default DateRangeList;
