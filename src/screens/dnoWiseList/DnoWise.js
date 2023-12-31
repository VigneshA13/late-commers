import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  Keyboard,
} from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../../components/Header';
import StaffName from '../../components/StaffName';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import timeFormate from '../../components/timeFormate';
import dateFormate from '../../components/dateFormate';

const DnoWise = ({navigation}) => {
  const [dno, setDno] = useState('');
  const [datas, setDatas] = useState([]);
  const [msg, setmsg] = useState('');

  const submit = async () => {
    try {
      if (dno.length < 8) {
        Alert.alert('Invalid, Data', 'Invalid DNO Formate.', [
          {
            text: 'Cancel',

            style: 'cancel',
          },
        ]);
      } else {
        const response = await axios.get(
          'https://erp.sjctni.edu/api/latecomer_atten_getabsentees.jsp',
          {
            params: {
              dno: dno,
            },
          },
        );
        const [data] = response.data;
        console.log('dno data', response.data[0].data.length);

        setDatas(data.data);
        if (response.data[0].data.length === 0) {
          setmsg('No Records Found');
          console.log('No record');
        }
      }
    } catch (err) {
      3;
      console.log(err);
    }
    Keyboard.dismiss();
  };
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
  function GoProfile() {
    if (dno !== '') {
      navigation.navigate('StudentsProfile', dno);
    } else {
      Alert.alert('Invalid Request', 'Please Enter DNO.', [
        {
          text: 'Cancel',

          style: 'cancel',
        },
      ]);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <StaffName staffName={storedName} />

      <ScrollView style={styles.container}>
        <View style={styles.body}>
          <View style={styles.bbody}>
            <View style={styles.rowDno}>
              <TextInput
                style={styles.dnoInput}
                onChangeText={setDno}
                value={dno}
                placeholder="ENTER DNO"
                placeholderTextColor="gray"
              />
              <TouchableOpacity style={styles.btn1} onPress={submit}>
                <Text style={styles.txt1}>Get Details</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.bbtext}>TOTAL NO OF DAYS - {datas.length}</Text>
            <View style={styles.table}>
              <View style={styles.reportrowhead}>
                <Text style={styles.cell1}>DATE</Text>
                <Text style={styles.cell1}>TIME</Text>
              </View>
              <ScrollView style={styles.scroll} nestedScrollEnabled={true}>
                {datas && datas.length > 0 ? (
                  datas.map(item => {
                    let [datePart, timePart] = item.dateandtime.split(' ');
                    return (
                      <View key={item.id} style={styles.rowreport}>
                        <Text style={styles.cell}>{dateFormate(datePart)}</Text>
                        <Text style={styles.cell}>{timeFormate(timePart)}</Text>
                      </View>
                    );
                  })
                ) : (
                  <Text style={styles.nomsg}>No records found</Text>
                )}
              </ScrollView>
              <View style={styles.row1}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    setDno('');
                    setDatas([]);
                    navigation.navigate('Profile', {
                      serializedObject: JSON.stringify(myObject),
                    });
                  }}>
                  <Text style={styles.txt1}>BACK</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={GoProfile}>
                  <Text style={styles.txt1}>VIEW PROFILE</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#c7c3c3',
  },

  // check 1
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
  rowDno: {
    marginTop: responsiveHeight(1),
    flexDirection: 'row',
  },
  dnoInput: {
    borderWidth: responsiveWidth(0.5),
    height: responsiveHeight(7),
    width: responsiveWidth(50),
    margin: responsiveHeight(2),
    borderColor: '#172d6b',
    borderRadius: responsiveWidth(2),
    textAlign: 'center',
    fontSize: responsiveFontSize(2.2),
    color: 'gray',
  },
  btn1: {
    backgroundColor: '#172d6b',
    width: responsiveHeight(16),
    height: responsiveHeight(7),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(2),
    marginTop: responsiveHeight(2),
    marginRight: responsiveWidth(2),
  },
  txt1: {
    fontWeight: '500',
    color: '#fff',
    fontSize: responsiveFontSize(2),
  },
  bbtext: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'bold',
    fontFamily: 'Arial',
    textAlign: 'center',
    marginTop: responsiveHeight(1.5),
    color: 'red',
  },
  table: {
    margin: responsiveHeight(2),
    flexDirection: 'column',
    borderColor: '#000',
  },
  reportrowhead: {
    flexDirection: 'row',
    paddingTop: 0,
    paddingBottom: responsiveHeight(1),
    borderBottomWidth: 1,
  },
  cell1: {
    flex: 1,
    padding: responsiveWidth(1),
    textAlign: 'center',
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    color: '#172d6b',
  },
  scroll: {
    height: responsiveHeight(33),
  },
  rowreport: {
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
  nomsg: {
    color: 'red',
    fontSize: responsiveFontSize(2.3),
    margin: responsiveWidth(5),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  row1: {
    flexDirection: 'row',
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(1),
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default DnoWise;
