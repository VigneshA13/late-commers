import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Header from '../../components/Header';
import StaffName from '../../components/StaffName';

const MarkLate = () => {
  const idPattern = /^[0-9]{2}[A-Za-z]{3}[0-9]{3}$/;
  const initialMsgState = {
    dno1: '',
    dno2: '',
    dno3: '',
    dno4: '',
    dno5: '',
    dno6: '',
  };
  const initialDnoState = {
    dno1: '',
    dno2: '',
    dno3: '',
    dno4: '',
    dno5: '',
  };

  const [msg, setMsg] = useState(initialMsgState);
  const [dno, setDno] = useState(initialDnoState);

  const onInputChange = (fieldName, newValue) => {
    setDno(exist => ({...exist, [fieldName]: newValue}));

    if (!idPattern.test(newValue)) {
      setMsg(exist => ({...exist, [fieldName]: 'INVALID DNO'}));
      count = 1;
    } else {
      setMsg(exist => ({...exist, [fieldName]: ''}));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <StaffName />

      <ScrollView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style={styles.bbtext}>ENTER DNO OF LATE COMERS</Text>
            <View style={styles.table}>
              <View style={styles.rowButton}>
                <TextInput
                  style={styles.dnoInput0}
                  onChangeText={text => onInputChange('dno1', text)}
                  value={dno.dno1}
                  placeholder="ENTER DNO"
                  placeholderTextColor="gray"
                />
                {msg.dno1 !== '' && (
                  <Text style={styles.errmsg}>{msg.dno1}</Text>
                )}
              </View>
              <View style={styles.rowButton}>
                <TextInput
                  style={styles.dnoInput0}
                  onChangeText={text => onInputChange('dno2', text)}
                  value={dno.dno2}
                  placeholder="ENTER DNO"
                  placeholderTextColor="gray"
                />
                {msg.dno2 !== '' && (
                  <Text style={styles.errmsg}>{msg.dno2}</Text>
                )}
              </View>
              <View style={styles.rowButton}>
                <TextInput
                  style={styles.dnoInput0}
                  onChangeText={text => onInputChange('dno3', text)}
                  value={dno.dno3}
                  placeholder="ENTER DNO"
                  placeholderTextColor="gray"
                />
                {msg.dno3 !== '' && (
                  <Text style={styles.errmsg}>{msg.dno3}</Text>
                )}
              </View>
              <View style={styles.rowButton}>
                <TextInput
                  style={styles.dnoInput0}
                  onChangeText={text => onInputChange('dno4', text)}
                  value={dno.dno4}
                  placeholder="ENTER DNO"
                  placeholderTextColor="gray"
                />
                {msg.dno4 !== '' && (
                  <Text style={styles.errmsg}>{msg.dno4}</Text>
                )}
              </View>
              <View style={styles.rowButton}>
                <TextInput
                  style={styles.dnoInput0}
                  onChangeText={text => onInputChange('dno5', text)}
                  value={dno.dno5}
                  placeholder="ENTER DNO"
                  placeholderTextColor="gray"
                />
                {msg.dno5 !== '' && (
                  <Text style={styles.errmsg}>{msg.dno5}</Text>
                )}
              </View>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.btn} onPress={'goBack'}>
                <Text style={styles.txt1}>BACK</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btn} onPress={'onAdd'}>
                <Text style={styles.txt1}>MARK LATE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    justifyContent: 'space-around',
    margin: responsiveWidth(3),
    borderRadius: responsiveWidth(5),
    borderWidth: 2,
    borderColor: '#172d6b',
    backgroundColor: 'white',
  },

  container: {
    flex: 1,
    backgroundColor: '#c7c3c3',
  },
  bbody: {
    flex: 1,
    top: responsiveHeight(-1),
    margin: responsiveWidth(3),
    borderRadius: responsiveWidth(5),
    borderWidth: 2,
    borderColor: '#172d6b',
    backgroundColor: 'white',
  },
  bbtext: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'bold',
    fontFamily: 'Arial',
    textAlign: 'center',
    marginTop: responsiveHeight(3),
    color: '#172d6b',
  },
  errmsg: {
    color: 'red',
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
  },
  table: {
    marginTop: responsiveHeight(2),
    flexDirection: 'column',
    borderColor: '#000',
  },
  rowButton: {
    flexDirection: 'column',
    paddingTop: responsiveHeight(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dnoInput0: {
    borderWidth: 2,
    height: responsiveHeight(7.5),
    width: responsiveWidth(65),
    borderColor: '#172d6b',
    borderRadius: responsiveWidth(3),
    textAlign: 'center',
    fontSize: responsiveFontSize(2.2),
    color: 'grey',
    fontWeight: 'bold',
  },
  row: {
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
  txt1: {
    fontWeight: '500',
    color: '#fff',
    fontSize: responsiveFontSize(2),
  },
});

export default MarkLate;
