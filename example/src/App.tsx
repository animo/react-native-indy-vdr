import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { IndyVdr } from 'react-native-indy-vdr';

const transactions =
  '{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node1","blskey":"4N8aUNHSgjQVgkpm8nhNEfDf6txHznoYREg9kirmJrkivgL4oSEimFF6nsQ6M41QvhM2Z33nves5vfSn9n1UwNFJBYtWVnHYMATn76vLuL3zU88KyeAYcHfsih3He6UHcXDxcaecHVz6jhCYz1P2UZn2bDVruL5wXpehgBfBaLKm3Ba","blskey_pop":"RahHYiCvoNCtPTrVtP7nMC5eTYrsUA8WjXbdhNc8debh1agE9bGiJxWBXYNFbnJXoXhWFMvyqhqhRoq737YQemH5ik9oL7R4NTTCz2LEZhkgLJzB3QRQqJyBNyv7acbdHrAT8nQ9UkLbaVL9NBpnWXBTw4LEMePaSHEw66RzPNdAX1","client_ip":"138.197.138.255","client_port":9702,"node_ip":"138.197.138.255","node_port":9701,"services":["VALIDATOR"]},"dest":"Gw6pDLhcBcoQesN72qfotTgFa7cbuqZpkX3Xo6pLhPhv"},"metadata":{"from":"Th7MpTaRZVRYnPiabds81Y"},"type":"0"},"txnMetadata":{"seqNo":1,"txnId":"fea82e10e894419fe2bea7d96296a6d46f50f93f9eeda954ec461b2ed2950b62"},"ver":"1"}{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node2","blskey":"37rAPpXVoxzKhz7d9gkUe52XuXryuLXoM6P6LbWDB7LSbG62Lsb33sfG7zqS8TK1MXwuCHj1FKNzVpsnafmqLG1vXN88rt38mNFs9TENzm4QHdBzsvCuoBnPH7rpYYDo9DZNJePaDvRvqJKByCabubJz3XXKbEeshzpz4Ma5QYpJqjk","blskey_pop":"Qr658mWZ2YC8JXGXwMDQTzuZCWF7NK9EwxphGmcBvCh6ybUuLxbG65nsX4JvD4SPNtkJ2w9ug1yLTj6fgmuDg41TgECXjLCij3RMsV8CwewBVgVN67wsA45DFWvqvLtu4rjNnE9JbdFTc1Z4WCPA3Xan44K1HoHAq9EVeaRYs8zoF5","client_ip":"138.197.138.255","client_port":9704,"node_ip":"138.197.138.255","node_port":9703,"services":["VALIDATOR"]},"dest":"8ECVSk179mjsjKRLWiQtssMLgp6EPhWXtaYyStWPSGAb"},"metadata":{"from":"EbP4aYNeTHL6q385GuVpRV"},"type":"0"},"txnMetadata":{"seqNo":2,"txnId":"1ac8aece2a18ced660fef8694b61aac3af08ba875ce3026a160acbc3a3af35fc"},"ver":"1"}{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node3","blskey":"3WFpdbg7C5cnLYZwFZevJqhubkFALBfCBBok15GdrKMUhUjGsk3jV6QKj6MZgEubF7oqCafxNdkm7eswgA4sdKTRc82tLGzZBd6vNqU8dupzup6uYUf32KTHTPQbuUM8Yk4QFXjEf2Usu2TJcNkdgpyeUSX42u5LqdDDpNSWUK5deC5","blskey_pop":"QwDeb2CkNSx6r8QC8vGQK3GRv7Yndn84TGNijX8YXHPiagXajyfTjoR87rXUu4G4QLk2cF8NNyqWiYMus1623dELWwx57rLCFqGh7N4ZRbGDRP4fnVcaKg1BcUxQ866Ven4gw8y4N56S5HzxXNBZtLYmhGHvDtk6PFkFwCvxYrNYjh","client_ip":"138.197.138.255","client_port":9706,"node_ip":"138.197.138.255","node_port":9705,"services":["VALIDATOR"]},"dest":"DKVxG2fXXTU8yT5N7hGEbXB3dfdAnYv1JczDUHpmDxya"},"metadata":{"from":"4cU41vWW82ArfxJxHkzXPG"},"type":"0"},"txnMetadata":{"seqNo":3,"txnId":"7e9f355dffa78ed24668f0e0e369fd8c224076571c51e2ea8be5f26479edebe4"},"ver":"1"}{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node4","blskey":"2zN3bHM1m4rLz54MJHYSwvqzPchYp8jkHswveCLAEJVcX6Mm1wHQD1SkPYMzUDTZvWvhuE6VNAkK3KxVeEmsanSmvjVkReDeBEMxeDaayjcZjFGPydyey1qxBHmTvAnBKoPydvuTAqx5f7YNNRAdeLmUi99gERUU7TD8KfAa6MpQ9bw","blskey_pop":"RPLagxaR5xdimFzwmzYnz4ZhWtYQEj8iR5ZU53T2gitPCyCHQneUn2Huc4oeLd2B2HzkGnjAff4hWTJT6C7qHYB1Mv2wU5iHHGFWkhnTX9WsEAbunJCV2qcaXScKj4tTfvdDKfLiVuU2av6hbsMztirRze7LvYBkRHV3tGwyCptsrP","client_ip":"138.197.138.255","client_port":9708,"node_ip":"138.197.138.255","node_port":9707,"services":["VALIDATOR"]},"dest":"4PS3EDQ3dW1tci1Bp6543CfuuebjFrg36kLAUcskGfaA"},"metadata":{"from":"TWwCRQRZ2ZHMJFn9TzLp7W"},"type":"0"},"txnMetadata":{"seqNo":4,"txnId":"aa5e817d7cc626170eca175822029339a444eb0ee8f0bd20d3b0b76e566fb008"},"ver":"1"} ';

const indyVdr = new IndyVdr();

type Func = {
  [key: string]: any;
};

export default function App() {
  const [handle, setHandle] = React.useState(indyVdr.getHandle);
  const [poolHandle, setPoolHandle] = React.useState(indyVdr.getPoolHandle);

  const functions: Func[] = [
    { version: () => indyVdr.version() },
    { set_protocol_version: () => indyVdr.setProtocolVersion({ version: 2 }) },
    { set_config: () => indyVdr.setConfig({ config: { test: 'test' } }) },
    { set_default_logger: () => indyVdr.setDefaultLogger() },
    { set_socks_proxy: () => indyVdr.setSocksProxy({ socksProxy: 'abc' }) },
    {
      build_acceptance_mechanisms_request: () =>
        indyVdr.buildAcceptanceMechanismsRequest({
          submitterDid: 'GShBXJZJ2oZvKoTQqceiMC',
          aml: { key: 'ja' },
          version: '1.0.0',
          amlContext: 'a',
        }),
    },
    {
      // TODO: fill the schema type
      build_schema_request: () =>
        indyVdr.buildSchemaRequest({
          submitterDid: 'GShBXJZJ2oZvKoTQqceiMC',
          schema: {
            id: 'GShBXJZJ2oZvKoTQqceiMC:2:FestivalLeeftijd:1.0.0',
            name: 'FestivalLeeftijd',
            ver: '1.0',
            version: '1.0.0',
            attrNames: ['a'],
          },
        }),
    },
    {
      build_get_acceptance_mechanisms_request: () =>
        indyVdr.buildGetAcceptanceMechanismsRequest({
          submitterDid: 'GShBXJZJ2oZvKoTQqceiMC',
          //version: '1.0.0',
          timestamp: new Date(),
        }),
    },
    {
      build_attrib_request: () =>
        indyVdr.buildAttribRequest({
          submitterDid: 'GShBXJZJ2oZvKoTQqceiMC',
          targetDid: 'GShBXJZJ2oZvKoTQqceiMC',
          enc: 'a',
          raw: { b: 'c' },
          hash: 'd',
        }),
    },
    {
      pool_create: () =>
        indyVdr.poolCreate({
          params: {
            transactions,
          },
        }),
    },
    {
      pool_refresh: () =>
        indyVdr.poolRefresh({
          cb: (errorCode) => console.log('errorCode: ', errorCode),
        }),
    },
    {
      pool_get_status: () =>
        indyVdr.poolGetStatus({
          cb: (errorCode, result) =>
            console.log(`code: ${errorCode} \n result: ${result}`),
        }),
    },
    {
      pool_get_transactions: () =>
        indyVdr.poolGetTransactions({
          cb: (errorCode, result) =>
            console.log(`code: ${errorCode} \n result: ${result}`),
        }),
    },
    {
      pool_get_verifiers: () =>
        indyVdr.poolGetVerfiers({
          cb: (errorCode, result) =>
            console.log(`code: ${errorCode} \n result: ${result}`),
        }),
    },
    {
      pool_submit_action: () =>
        indyVdr.poolSubmitAction({
          cb: (errorCode, result) =>
            console.log(`code: ${errorCode} \n result: ${result}`),
        }),
    },
    {
      request_free: () => indyVdr.requestFree(),
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Indy Vdr React Native Example</Text>
      <Text>handle: {handle}</Text>
      <Text>poolHandle: {poolHandle}</Text>
      <Text>functions mapped: {functions.length}</Text>
      {functions.map((value) => {
        const [functionName, func] = Object.entries(value)[0];
        return (
          <View key={functionName}>
            <Button
              onPress={() => {
                func();
                functionName.startsWith('pool_')
                  ? setPoolHandle(indyVdr.getPoolHandle)
                  : setHandle(indyVdr.getHandle);
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
