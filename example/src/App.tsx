import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import IndyVdr from 'react-native-indy-vdr';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Indy VDR Example</Text>
      <Text>set config: {IndyVdr.set_config('this will error')}</Text>
      <Text>version: {IndyVdr.version()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },
});
