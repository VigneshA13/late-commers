import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Header from '../../components/Header';
import Images from '../../constants/Images';

import formateDate from '../../components/formateDate';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useRoute} from '@react-navigation/native';

const StudentsProfile = ({navigation}) => {
  const route = useRoute();
  console.log(route.params);
  const dno = route.params;

  const [storedName, setStoredName] = useState('');
  const [staffImage, setstaffImage] = useState('');
  const [details, setDetails] = useState([]);
  const [permit, setPermit] = useState([]);

  useEffect(() => {
    console.log('checking');
    retrieveData();
    studentDetails();
  }, []);

  const studentDetails = async () => {
    try {
      const response = await axios.get(
        'https://erp.sjctni.edu/api/latecomer_atten_getabsentees.jsp',
        {
          params: {
            dno: dno,
          },
        },
      );
      const {data1} = response.data[1];
      const {data2} = response.data[1];

      setDetails(data1);
      setPermit(data2);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(details.sname);
  console.log(permit);
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

  function goBack() {
    const myObject = {
      staffImage: staffImage,
      staffname: storedName,
    };
    navigation.navigate('Profile', {
      serializedObject: JSON.stringify(myObject),
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={styles.container}>
        <View style={styles.body}>
          <View style={styles.bbody}>
            <Text style={styles.bbtext}>STUDENT PROFILE</Text>
            <View style={styles.tableProfile}>
              <View style={styles.rowProfile}>
                {details.photo ? (
                  <Image source={{uri: details.photo}} style={styles.image3} />
                ) : (
                  <Image source={Images.defaultProfile} style={styles.image3} />
                )}
              </View>
              <ScrollView style={styles.scroll} nestedScrollEnabled={true}>
                <View style={styles.rowProfile1}>
                  <Text style={styles.cellProfile}>D.NO</Text>
                  <Text style={styles.cellProfile}>{dno.toUpperCase()}</Text>
                </View>
                <View style={styles.rowProfile}>
                  <Text style={styles.cellProfile}>NAME</Text>
                  <Text style={styles.cellProfile}>{details.sname}</Text>
                </View>
                <View style={styles.rowProfile}>
                  <Text style={styles.cellProfile}>Parent Contact No</Text>
                  <Text style={styles.cellProfile}>{details.mobile1}</Text>
                </View>
                <View style={styles.rowProfile}>
                  <Text style={styles.cellProfile}>Student Contact No</Text>
                  <Text style={styles.cellProfile}>{details.mobile2}</Text>
                </View>
                <View style={styles.rowProfile}>
                  <Text style={styles.cellProfile}>Address</Text>
                  <Text style={styles.cellProfile}>{details.address}</Text>
                </View>

                {permit.regno !== 'no data' && (
                  <>
                    <View style={styles.rowProfile}>
                      <Text style={styles.cellProfile}>Permission Period</Text>
                      <Text style={styles.cellProfile}>
                        {formateDate(permit.fromdate)} to{' '}
                        {formateDate(permit.todate)}
                      </Text>
                    </View>
                    <View style={styles.rowProfile}>
                      <Text style={styles.cellProfile}>Time Upto</Text>
                      <Text style={styles.cellProfile}>{permit.upto}</Text>
                    </View>
                    <View style={styles.rowProfile}>
                      <Text style={styles.cellProfile}>Issued On</Text>
                      <Text style={styles.cellProfile}>
                        {formateDate(permit.issue)}
                      </Text>
                    </View>
                  </>
                )}
              </ScrollView>

              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.btnProfile}
                  onPress={() => navigation.navigate('DnoWise')}>
                  <Text style={styles.txt1}>BACK</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnProfile} onPress={goBack}>
                  <Text style={styles.txt1}>HOME</Text>
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
  },
  // check 1
  body: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  bbody: {
    margin: responsiveWidth(2),
    borderRadius: responsiveWidth(5),
    borderWidth: 2,
    borderColor: '#172d6b',
    backgroundColor: 'white',
    height: responsiveHeight(83),
  },
  bbtext: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'bold',
    fontFamily: 'Arial',
    textAlign: 'center',
    marginTop: responsiveHeight(1.5),
    color: '#172d6b',
  },
  tableProfile: {
    marginTop: responsiveHeight(1),
    marginLeft: responsiveWidth(1),
    marginRight: responsiveWidth(1),
    flexDirection: 'column',
    borderColor: '#000',
  },
  rowProfile: {
    flexDirection: 'row',
    paddingTop: responsiveHeight(0),
    paddingBottom: responsiveHeight(0),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image3: {
    width: responsiveHeight(15),
    height: responsiveHeight(15),
    margin: responsiveWidth(0),
    borderRadius: responsiveHeight(10),
  },
  scroll: {
    height: responsiveHeight(50),
  },
  rowProfile1: {
    flexDirection: 'row',
    paddingTop: responsiveHeight(0),
    paddingBottom: responsiveHeight(0),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(1),
  },
  cellProfile: {
    flex: 1,
    padding: responsiveWidth(3),
    textAlign: 'left',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: '#172d6b',
  },
  row: {
    flexDirection: 'row',
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnProfile: {
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

export default StudentsProfile;
