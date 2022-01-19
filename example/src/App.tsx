import * as React from 'react';
import { Button } from 'react-native';

import { StyleSheet, View, Text } from 'react-native';
import { IndyVdr } from 'react-native-indy-vdr';

const indyVdr = new IndyVdr();

type Func = {
  [key: string]: any;
};

export default function App() {
  const [handle, setHandle] = React.useState(indyVdr.getHandle);
  const functions: Func[] = [
    { version: () => indyVdr.version() },
    { set_protocol_version: () => indyVdr.setProtocolVersion(2) },
    { set_config: () => indyVdr.setConfig("{'a': 'b'}") },
    { set_default_logger: () => indyVdr.setDefaultLogger() },
    { set_socks_proxy: () => indyVdr.setSocksProxy('abc') },
    {
      build_acceptance_mechanisms_request: () =>
        indyVdr.buildAcceptanceMechanismsRequest(
          'GShBXJZJ2oZvKoTQqceiMC',
          { key: 'ja' },
          '1.0.0'
          //'a'
        ),
    },
    {
      build_get_acceptance_mechanisms_request: () =>
        indyVdr.buildGetAcceptanceMechanismsRequest(
          new Date(),
          'GShBXJZJ2oZvKoTQqceiMC'
        ),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Indy Vdr React Native Example</Text>
      <Text>handle: {handle}</Text>
      {functions.map((value) => {
        const [functionName, returnValue] = Object.entries(value)[0];
        return (
          <View key={functionName}>
            <Button
              onPress={() => {
                returnValue();
                setHandle(indyVdr.getHandle);
              }}
              title={functionName}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },
});
