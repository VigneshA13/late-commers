import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import DatePicker from 'react-native-date-picker';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../../components/Header';
import StaffName from '../../components/StaffName';

const DateRange = ({navigation}) => {
  const [dno, setDno] = useState('');
  const [startDate, setStartDate] = useState(new Date('2022-12-15'));
  const [endDate, setEndDate] = useState(new Date());

  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);

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
  const myObject = {
    staffImage: staffImage,
    staffname: storedName,
  };

  const onSubmit = async () => {
    try {
      if (dno.length >= 0 && dno.length < 8) {
        Alert.alert('Invalid, Data', 'Invalid DNO Formate.', [
          {
            text: 'Cancel',

            style: 'cancel',
          },
        ]);
      } else {
        console.log({
          dno: dno,
          sdate: startDate.toISOString().split('T')[0],
          edate: endDate.toISOString().split('T')[0],
        });
        const response = await axios.get(
          'https://erp.sjctni.edu/api/latecomer_atten_getabsentees_datewise.jsp',
          {
            params: {
              dno: dno,
              sdate: startDate.toISOString().split('T')[0],
              edate: endDate.toISOString().split('T')[0],
            },
          },
        );
        const {data} = response.data;
        console.log(data);
        navigation.navigate('DateRangeList', {data});
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleTextInputFocus = () => {
    Keyboard.dismiss();
    setOpen(true);
  };
  const handleTextInputFocus2 = () => {
    Keyboard.dismiss();
    setClose(true);
  };

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Note: Month is zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <StaffName staffName={storedName} />
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.bbody}>
            <Text style={styles.bbtext}>SELECT DATE RANGE</Text>
            <View style={styles.table}>
              <View style={styles.row}>
                <Text style={styles.fromtxt}>D No. : </Text>
                <TextInput
                  style={styles.dnoInput0}
                  onChangeText={setDno}
                  value={dno}
                  placeholder="ENTER DNO"
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.fromtxt}>From : </Text>

                <TextInput
                  style={styles.dnoInput0}
                  onChangeText={setStartDate.toString}
                  value={formatDate(startDate)}
                  placeholder="Start Date"
                  placeholderTextColor="gray"
                  onFocus={handleTextInputFocus}
                  editable={true}
                  selectTextOnFocus={true}
                  showSoftInputOnFocus={false} // Prevent the keyboard from opening
                />

                <DatePicker
                  modal
                  open={open}
                  date={startDate}
                  mode="date"
                  minimumDate={new Date('2022-12-15')}
                  onConfirm={date => {
                    setOpen(false);
                    setStartDate(date);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </View>

              <View style={styles.row}>
                <Text style={styles.fromtxt2}>To : </Text>
                <TextInput
                  style={styles.dnoInput1}
                  onChangeText={setStartDate.toString}
                  value={formatDate(endDate)}
                  placeholder="Start Date"
                  onFocus={handleTextInputFocus2}
                  editable={true}
                  selectTextOnFocus={true}
                  showSoftInputOnFocus={false} // Prevent the keyboard from opening
                />

                <DatePicker
                  modal
                  open={close}
                  date={endDate}
                  mode="date"
                  maximumDate={endDate}
                  onConfirm={date => {
                    setClose(false);
                    setEndDate(date);
                  }}
                  onCancel={() => {
                    setClose(false);
                  }}
                />
              </View>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() =>
                  navigation.navigate('Profile', {
                    serializedObject: JSON.stringify(myObject),
                  })
                }>
                <Text style={styles.txt1}> BACK</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={onSubmit}>
                <Text style={styles.txt1}>GET LIST</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    marginTop: responsiveHeight(2),
    color: '#172d6b',
  },
  table: {
    margin: responsiveHeight(2),
    flexDirection: 'column',
    borderColor: '#000',
  },
  row: {
    flexDirection: 'row',
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  fromtxt: {
    fontSize: responsiveFontSize(2),
    color: '#172d6b',
    fontFamily: 'math',
    fontWeight: 'bold',
    marginRight: responsiveWidth(2),
  },
  fromtxt2: {
    fontSize: responsiveFontSize(2),
    color: '#172d6b',
    fontFamily: 'math',
    fontWeight: 'bold',
    marginRight: responsiveWidth(1),
    marginLeft: responsiveWidth(1),
  },
  dnoInput0: {
    borderWidth: responsiveWidth(0.5),
    height: responsiveHeight(7),
    width: responsiveWidth(50),
    borderColor: '#172d6b',
    borderRadius: responsiveWidth(2),
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
    marginLeft: responsiveWidth(7),
    color: 'gray',
  },
  dnoInput1: {
    borderWidth: responsiveWidth(0.5),
    height: responsiveHeight(7),
    width: responsiveWidth(50),
    borderColor: '#172d6b',
    borderRadius: responsiveWidth(2),
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
    marginLeft: responsiveWidth(11),
    color: 'gray',
  },
  btn: {
    backgroundColor: '#172d6b',
    padding: responsiveWidth(1),
    margin: responsiveWidth(1),
    width: responsiveWidth(40),
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
});

export default DateRange;
