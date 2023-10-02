import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Home,
  Profile,
  MakeLate,
  Settings,
  TodayLate,
  DnoWise,
  StudentsProfile,
  DateRange,
  DateRangeList,
} from '../screens';
import navigationString from '../constants/navigationString';

const Stack = createNativeStackNavigator();
export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={navigationString.HOME}
          component={Home}
          options={{
            title: 'Home',
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={navigationString.PROFILE}
          component={Profile}
          options={{
            title: 'Profile',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={navigationString.MAKE_LATE}
          component={MakeLate}
          options={{
            title: 'MakeLate',
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={navigationString.STUDENT_PROFILE}
          component={StudentsProfile}
          options={{
            title: 'StudentsProfile',
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={navigationString.SETTINGS}
          component={Settings}
          options={{
            title: 'Settings',
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={navigationString.TODAY_LATE}
          component={TodayLate}
          options={{
            title: 'TodayLate',
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={navigationString.DNO_WISE}
          component={DnoWise}
          options={{
            title: 'DnoWise',
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={navigationString.DATE_RANGE}
          component={DateRange}
          options={{
            title: 'DateRange',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={navigationString.DATE_RANGE_LIST}
          component={DateRangeList}
          options={{
            title: 'DateRangeList',
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
