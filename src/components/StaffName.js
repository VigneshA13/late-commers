import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const StaffName = props => {
  return (
    <View style={staffNameStyles.bodyhead}>
      <Text style={staffNameStyles.bhtext}>{props.staffName}</Text>
    </View>
  );
};

const staffNameStyles = StyleSheet.create({
  bodyhead: {
    margin: responsiveWidth(2.5),
    marginLeft: responsiveWidth(3),
    marginRight: responsiveWidth(3),
    backgroundColor: '#172d6b',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(3),
    height: responsiveHeight(8),
  },
  bhtext: {
    color: 'white',
    letterSpacing: 1,
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
});

export default StaffName;
