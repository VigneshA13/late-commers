import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import Header from '../../components/Header';
import StaffName from '../../components/StaffName';

const Settings = () => {
  const getColorStyle = count => {
    const countValue = parseInt(count);
    if (countValue >= 5) {
      return styles.redText;
    } else if (countValue >= 3) {
      return styles.orangeText;
    } else {
      return styles.blackText;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <StaffName />

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
                {/* {data.map((dno, index) => (
               <View key={index} style={styles.row}>
                  <Text style={styles.cell}>{dno.regno.toUpperCase()}</Text>
                  <Text style={[styles.cell, getColorStyle(dno.count)]}>
                    {dno.count}
                  </Text>
                </View>
              ))} */}
                <View style={styles.row}>
                  <Text style={styles.cell}>{'22PCA143'}</Text>
                  <Text style={[styles.cell, getColorStyle(1)]}>
                    {'2 days'}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cell}>{'22PCA143'}</Text>
                  <Text style={[styles.cell, getColorStyle(0)]}>
                    {'2 days'}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cell}>{'22PCA143'}</Text>
                  <Text style={[styles.cell, getColorStyle(17)]}>{2}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cell}>{'22PCA143'}</Text>
                  <Text style={[styles.cell, getColorStyle(3)]}>{2}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.cell}>{'22PCA143'}</Text>
                  <Text style={[styles.cell, getColorStyle(7)]}>{2}</Text>
                </View>
              </View>
              <View style={styles.row1}>
                <TouchableOpacity style={styles.btn} onPress={'goMake'}>
                  <Text style={styles.txt1}>GO BACK</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={'onAdd'}>
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
});

export default Settings;
