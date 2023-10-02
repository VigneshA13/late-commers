import React from 'react';
import {View} from 'react-native';
import Routes from './src/Navigation/Routes';

function App(): JSX.Element {
  return (
    <>
      <View style={{flex: 1}}>{Routes()}</View>
    </>
  );
}

export default App;
