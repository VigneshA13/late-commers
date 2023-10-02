import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Images from '../constants/Images';

const Header = () => {
  return (
    <View style={headerStyles.head}>
      <View style={headerStyles.head1}>
        <View style={headerStyles.H_logo}>
          <Image source={Images.collegeLogo} style={headerStyles.img}></Image>
        </View>
        <View style={headerStyles.H_text}>
          <Text style={headerStyles.ctext1}>St.Joseph's College</Text>
          <Text style={headerStyles.ctext1}>Tiruchirappalli</Text>
        </View>
      </View>
      <View style={headerStyles.head2}>
        <Text style={headerStyles.ctext}>Latecomers-App</Text>
      </View>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  head: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#172d6b',
    height: responsiveHeight(9),
    margin: responsiveWidth(0),
  },
  head1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    color: 'white',
    right: responsiveWidth(2),
  },
  H_logo: {
    left: responsiveWidth(2),
  },
  img: {
    width: responsiveHeight(5),
    height: responsiveHeight(8),
    position: 'relative',
  },
  H_text: {
    left: responsiveWidth(3),
    top: responsiveHeight(0.3),
  },
  head2: {
    flex: 1,
  },
  ctext: {
    color: 'white',
    letterSpacing: 2,
    fontWeight: '400',
    fontSize: responsiveFontSize(1.7),
    textAlign: 'right',
    right: responsiveWidth(0.3),
    top: responsiveHeight(1),
  },

  ctext1: {
    color: 'white',
    letterSpacing: 2,
    fontSize: responsiveFontSize(1.7),
    fontWeight: '500',
  },
});

export default Header;
