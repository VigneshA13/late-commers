import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// for image and style

import Images from '../../constants/Images';

const Home = ({navigation}) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(['']);

  const params = {
    staffid: username,
    sjcpass: password,
  };

  const onSubmit = async () => {
    try {
      const response = await axios.get(
        'https://erp.sjctni.edu/api/latecomer_atten_stafflogin.jsp',
        {params},
      );
      const {imgurl, sname, staffid} = response.data;
      setData(response.data);
      console.log(sname);
      if (staffid == '-') {
        console.log('Not Valid');
        Alert.alert('Login Failed', 'Faculty ID and Password Not Match', [
          {
            text: 'Cancel',

            style: 'cancel',
          },
        ]);
      } else {
        const checks = await axios.get(
          'https://erp.sjctni.edu/api/latecomer_atten_loginvalidation.jsp',
          {params},
        );
        const {category, status} = checks.data;
        if (status === 'Y') {
          AsyncStorage.setItem('category', category);
          AsyncStorage.setItem('staffname', sname);
          AsyncStorage.setItem('staffImage', imgurl);
          AsyncStorage.setItem('staffId', staffid);
          const myObject = {
            staffImage: imgurl,
            staffname: sname,
          };

          console.log('success');
          navigation.navigate('Profile', {
            serializedObject: JSON.stringify(myObject),
          });

          console.log(sname);
        } else {
          console.log('Permission Denied');
          Alert.alert(
            'Permission Denied',
            "You don't have permission to Login. ",
            [
              {
                text: 'Cancel',

                style: 'cancel',
              },
            ],
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.main}>
            <Image source={Images.collegeLogo} style={styles.image} />
            <View>
              <Image source={Images.title} style={styles.image1} />
              <Text style={styles.txt}>Late Comers App</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.form}>
            <Text style={styles.txt2}>Login Page</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="FACULTY ID"
                placeholderTextColor="gray"
                onChangeText={setUserName}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="PASSWORD"
                placeholderTextColor="gray"
                secureTextEntry={true}
                onChangeText={setPassword}
              />
            </View>
            <TouchableOpacity style={styles.btn} onPress={onSubmit}>
              <Text style={styles.txt1}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  top: {
    flex: 1,
    backgroundColor: '#172d6b',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: 'center',
  },
  main: {
    alignItems: 'center',
  },
  image: {
    marginTop: 10,
    height: 160,
    resizeMode: 'contain',
  },
  image1: {
    width: 250,
    height: 130,
  },
  txt: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'math',
    textAlign: 'center',
  },
  bottom: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  form: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 30,
    top: -80,
    width: 300,
    marginTop: 50,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  txt2: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#172d6b',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 30,
  },
  input: {
    flex: 1,
    height: 50,
    color: 'black',
    fontSize: 20,
  },
  btn: {
    backgroundColor: '#172d6b',
    padding: 10,
    margin: 20,
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  txt1: {
    color: '#fff',
    fontSize: 20,
  },
});
export default Home;
