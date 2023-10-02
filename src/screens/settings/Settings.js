import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useRoute} from '@react-navigation/native';

import Header from '../../components/Header';
import StaffName from '../../components/StaffName';

const Settings = ({navigation}) => {
  const route = useRoute();
  const {dno1} = route.params;
  const dno2 = dno1;
  console.log('log', dno1);
  const [dno, setDno] = useState(['']);
  const [permitdno, setpermitDno] = useState([]);
  const [leftDno, setleftDno] = useState([]);

  const [data, setData] = useState([]);

  const [storedName, setStoredName] = useState('');
  const [staffImage, setstaffImage] = useState('');
  const [staffid, setstaffid] = useState('');

  const [already, setAlready] = useState([]);

  useEffect(() => {
    retrieveData();
    fetchData();
    onPermit();
    leftData();
    Already();
    handleRefresh();
  }, []);
  const Already = async () => {
    for (let i = 0; i < dno1.length; i++) {
      const response = await axios.get(
        'https://erp.sjctni.edu/api/latecomer_atten_getabsentees.jsp',
        {
          params: {
            dno: dno1[i],
          },
        },
      );
      // console.log('dno 30 data', response.data[0].data);
      const datas = response.data[0].data;
      const currentTime = new Date();

      if (datas && datas.length > 0) {
        datas.forEach(item => {
          const itemDate = new Date(item.dateandtime);

          // Calculate the time difference in milliseconds
          const timeDifference = currentTime - itemDate;

          // Check if the time difference is less than or equal to 30 minutes (30 * 60 * 1000 milliseconds)
          if (timeDifference <= 30 * 60 * 1000) {
            const newItems = [...already]; // Create a new array with the current items
            newItems.push(dno1[i]); // Add the new item to the end of the new array
            setAlready(newItems);
          }
        });
      } else {
        console.log('No records found');
      }
    }
  };
  const leftData = async () => {
    try {
      for (let i = 0; i < dno1.length; i++) {
        const response = await axios.get(
          'https://erp.sjctni.edu/api/latecomer_atten_getabsentees.jsp',
          {params: {dno: dno1[i]}},
        );

        // console.log(response.data[1].data1.status);
        if (response.data[1].data1.status !== 'N') {
          const newItems = [...leftDno]; // Create a new array with the current items
          newItems.push(dno1[i]); // Add the new item to the end of the new array
          setleftDno(newItems);
          // console.log('LEFT', dno1[i]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const retrieveData = async () => {
    try {
      const retrievedName = await AsyncStorage.getItem('staffname');
      const retrievedImage = await AsyncStorage.getItem('staffImage');
      const retrivedid = await AsyncStorage.getItem('staffId');
      if (
        retrievedName !== null &&
        retrievedImage !== null &&
        retrivedid !== null
      ) {
        setStoredName(retrievedName);
        setstaffImage(retrievedImage);
        setstaffid(retrivedid);
      }
    } catch (error) {
      console.log('Error retrieving data: ' + error);
    }
    //get dno from async storage
    AsyncStorage.getItem('dno')
      .then(jsonArray => {
        if (jsonArray) {
          // Parse the JSON string back to an array
          const retrievedArray = JSON.parse(jsonArray);
          setDno(retrievedArray);
          console.log('Retrieved array:', retrievedArray);
          console.log('Retrieved dno array:', dno);
        } else {
          console.log('Array not found in AsyncStorage.');
        }
      })
      .catch(error => {
        console.error('Error retrieving array:', error);
      });
  };
  let commadno = dno1.join(',');
  async function fetchData() {
    for (let i = 0; i < dno1.length; i++) {
      const response = await axios.get(
        'https://erp.sjctni.edu/api/latecomer_atten_absentees_count.jsp',
        {params: {staffid: '12fcs10', dno: commadno}},
      );

      setData(response.data);
      console.log('cnt', response.data);
    }
  }
  console.log('let', data);
  console.log(typeof data);

  function goBack() {
    const myObject = {
      staffImage: staffImage,
      staffname: storedName,
    };
    navigation.navigate('Profile', {
      serializedObject: JSON.stringify(myObject),
    });
  }
  function goMake() {
    navigation.navigate('MakeLate');
  }

  const onAdd = async () => {
    console.log('already', already);
    const valuesNotInFirstArray = dno1.filter(
      value => !permitdno.includes(value),
    );
    const valuesNotInLeft = valuesNotInFirstArray.filter(
      value => !leftDno.includes(value),
    );
    const valuesAlreadyAdded = valuesNotInLeft.filter(
      value => !already.includes(value),
    );
    console.log('filter arra', valuesAlreadyAdded);
    let commadno = valuesAlreadyAdded.join(',');
    const params = {
      staffid: staffid,
      dno: commadno,
    };

    try {
      const response = await axios.get(
        'https://erp.sjctni.edu/api/latecomer_atten_absentees.jsp',
        {params},
      );
      console.log(response.data);
      if (response.data.data === 'success') {
        console.log('Valid');
        Alert.alert('SUCCESS !', 'Late Comers Added Successfully');
        goBack();
      } else {
        Alert.alert('Failed !', 'Unable to add Late Comers.');
        goBack();
        console.log('not success');
      }
      console.log('');
    } catch (err) {
      console.log(err);
    }
  };
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Format the time as HH:MM:SS
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(
      minutes,
    ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return formattedTime;
  };

  const onPermit = async () => {
    try {
      for (let i = 0; i < dno1.length; i++) {
        const response = await axios.get(
          'https://erp.sjctni.edu/api/latecomer_atten_getabsentees.jsp',
          {params: {dno: dno1[i]}},
        );
        // console.log(response.data[1].data2.regno);
        // console.log(getCurrentTime());

        if (response.data[1].data2.regno !== 'no data') {
          const currentTime = new Date();
          // currentTime.setHours(9); // Set the hours to 9 (for 09:00:00)
          // currentTime.setMinutes(11); // Set the minutes to 11 (for 09:11:00)
          // currentTime.setSeconds(15); // Set the seconds to 15 (for 09:11:15)

          const timeString = response.data[1].data2.upto;
          const defaultDate = new Date();
          const [hours, minutes, seconds] = timeString.split(':').map(Number);

          // Set the time components on the defaultDate
          defaultDate.setHours(hours);
          defaultDate.setMinutes(minutes);
          defaultDate.setSeconds(seconds);

          if (currentTime <= defaultDate) {
            // console.log('Permission to go');
            const newItem = dno1[i]; // Replace 'newItem' with the value you want to add

            // Check if the new item is not already in the array
            if (!permitdno.includes(newItem)) {
              const newItems = [...permitdno]; // Create a new array with the current items
              newItems.push(newItem); // Add the new item to the end of the new array
              setpermitDno(newItems); // Update the state with the new array
            } // Add the new item to the end of the new array
          }
        }
      }
      // console.log('permit dno', permitdno);
    } catch (err) {
      console.log(err);
    }
  };
  const filteredDno = permitdno.filter(dno => dno);

  filteredDno.sort();
  dno1.sort();
  console.log('permit dno', filteredDno);
  console.log('dno', dno1);

  const getColorStyle = count => {
    console.log('count', count);
    const countValue = parseInt(count);
    if (countValue >= 5) {
      return styles.redText;
    } else if (countValue >= 3) {
      return styles.orangeText;
    } else {
      return styles.blackText;
    }
  };
  const handleRefresh = () => {
    navigation.navigate('Settings', {dno1: dno1});
  };

  const latePass = regNo => {
    return filteredDno.indexOf(regNo);
  };

  const left = regNo => {
    return leftDno.indexOf(regNo);
  };

  const Count = regNo => {
    const exist = data.find(item => item.regno === regNo);
    if (exist) {
      return exist.count;
    }
    return 0;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <StaffName staffName={storedName} />

      <ScrollView style={styles.container}>
        <View style={styles.body}>
          <View style={styles.bbody}>
            <Text style={styles.bbtext}>LATE COMERS DETAILS</Text>
            <View style={styles.table}>
              <View style={styles.rowhead}>
                <Text style={styles.cell1}>D. NO</Text>
                <Text style={styles.cell1}>NO OF DAYS LATE</Text>
              </View>

              <View style={styles.dnobody}>
                {data.map((dno, index) => (
                  <View key={index} style={styles.row}>
                    <Text style={styles.cell}>{dno.regno.toUpperCase()}</Text>
                    <Text
                      style={[
                        styles.cell,
                        latePass(dno.regno) === -1
                          ? left(dno.regno) === -1
                            ? getColorStyle(dno.count)
                            : styles.redText
                          : styles.greenText,
                      ]}>
                      {latePass(dno.regno) === -1
                        ? left(dno.regno) === -1
                          ? dno.count + ' days'
                          : 'LEFT DNO'
                        : 'LATE PASS'}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={styles.row1}>
                <TouchableOpacity style={styles.btn} onPress={goMake}>
                  <Text style={styles.txt1}>GO BACK</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={onAdd}>
                  <Text style={styles.txt1}>CONFIRM</Text>
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
  rowhead: {
    flexDirection: 'row',
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
  dnobody: {
    height: responsiveHeight(40),
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
    marginTop: responsiveHeight(3),
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
  // for day count colors
  redText: {
    color: 'red', // Set text color to red
  },
  orangeText: {
    color: 'orange', // Set text color to orange
  },
  blackText: {
    color: '#172d6b', // Set text color to black
  },
  greenText: {
    color: 'green', // Set text color to black
  },
});

export default Settings;
