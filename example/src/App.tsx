import * as React from 'react'
import { Button, Text, ScrollView } from 'react-native'
import { GetNymRequest, PoolCreate } from 'react-native-indy-vdr'

const mockDid = 'LibindyDid111111111111'
//const mockSchemaId = 'NcYxiDXkpYi6ov5FcYDi1e:2:gvt:1.0'
//const mockCredentialDefinitionId = 'NcYxiDXkpYi6ov5FcYDi1e:3:CL:1:tag'
//const mockRevocationRegistryId = 'NcYxiDXkpYi6ov5FcYDi1e:4:NcYxiDXkpYi6ov5FcYDi1e:3:CL:1:tag:CL_ACCUM:tag'
//
const transactions =
  '{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node1","blskey":"4N8aUNHSgjQVgkpm8nhNEfDf6txHznoYREg9kirmJrkivgL4oSEimFF6nsQ6M41QvhM2Z33nves5vfSn9n1UwNFJBYtWVnHYMATn76vLuL3zU88KyeAYcHfsih3He6UHcXDxcaecHVz6jhCYz1P2UZn2bDVruL5wXpehgBfBaLKm3Ba","blskey_pop":"RahHYiCvoNCtPTrVtP7nMC5eTYrsUA8WjXbdhNc8debh1agE9bGiJxWBXYNFbnJXoXhWFMvyqhqhRoq737YQemH5ik9oL7R4NTTCz2LEZhkgLJzB3QRQqJyBNyv7acbdHrAT8nQ9UkLbaVL9NBpnWXBTw4LEMePaSHEw66RzPNdAX1","client_ip":"138.197.138.255","client_port":9702,"node_ip":"138.197.138.255","node_port":9701,"services":["VALIDATOR"]},"dest":"Gw6pDLhcBcoQesN72qfotTgFa7cbuqZpkX3Xo6pLhPhv"},"metadata":{"from":"Th7MpTaRZVRYnPiabds81Y"},"type":"0"},"txnMetadata":{"seqNo":1,"txnId":"fea82e10e894419fe2bea7d96296a6d46f50f93f9eeda954ec461b2ed2950b62"},"ver":"1"}{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node2","blskey":"37rAPpXVoxzKhz7d9gkUe52XuXryuLXoM6P6LbWDB7LSbG62Lsb33sfG7zqS8TK1MXwuCHj1FKNzVpsnafmqLG1vXN88rt38mNFs9TENzm4QHdBzsvCuoBnPH7rpYYDo9DZNJePaDvRvqJKByCabubJz3XXKbEeshzpz4Ma5QYpJqjk","blskey_pop":"Qr658mWZ2YC8JXGXwMDQTzuZCWF7NK9EwxphGmcBvCh6ybUuLxbG65nsX4JvD4SPNtkJ2w9ug1yLTj6fgmuDg41TgECXjLCij3RMsV8CwewBVgVN67wsA45DFWvqvLtu4rjNnE9JbdFTc1Z4WCPA3Xan44K1HoHAq9EVeaRYs8zoF5","client_ip":"138.197.138.255","client_port":9704,"node_ip":"138.197.138.255","node_port":9703,"services":["VALIDATOR"]},"dest":"8ECVSk179mjsjKRLWiQtssMLgp6EPhWXtaYyStWPSGAb"},"metadata":{"from":"EbP4aYNeTHL6q385GuVpRV"},"type":"0"},"txnMetadata":{"seqNo":2,"txnId":"1ac8aece2a18ced660fef8694b61aac3af08ba875ce3026a160acbc3a3af35fc"},"ver":"1"}{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node3","blskey":"3WFpdbg7C5cnLYZwFZevJqhubkFALBfCBBok15GdrKMUhUjGsk3jV6QKj6MZgEubF7oqCafxNdkm7eswgA4sdKTRc82tLGzZBd6vNqU8dupzup6uYUf32KTHTPQbuUM8Yk4QFXjEf2Usu2TJcNkdgpyeUSX42u5LqdDDpNSWUK5deC5","blskey_pop":"QwDeb2CkNSx6r8QC8vGQK3GRv7Yndn84TGNijX8YXHPiagXajyfTjoR87rXUu4G4QLk2cF8NNyqWiYMus1623dELWwx57rLCFqGh7N4ZRbGDRP4fnVcaKg1BcUxQ866Ven4gw8y4N56S5HzxXNBZtLYmhGHvDtk6PFkFwCvxYrNYjh","client_ip":"138.197.138.255","client_port":9706,"node_ip":"138.197.138.255","node_port":9705,"services":["VALIDATOR"]},"dest":"DKVxG2fXXTU8yT5N7hGEbXB3dfdAnYv1JczDUHpmDxya"},"metadata":{"from":"4cU41vWW82ArfxJxHkzXPG"},"type":"0"},"txnMetadata":{"seqNo":3,"txnId":"7e9f355dffa78ed24668f0e0e369fd8c224076571c51e2ea8be5f26479edebe4"},"ver":"1"}{"reqSignature":{},"txn":{"data":{"data":{"alias":"Node4","blskey":"2zN3bHM1m4rLz54MJHYSwvqzPchYp8jkHswveCLAEJVcX6Mm1wHQD1SkPYMzUDTZvWvhuE6VNAkK3KxVeEmsanSmvjVkReDeBEMxeDaayjcZjFGPydyey1qxBHmTvAnBKoPydvuTAqx5f7YNNRAdeLmUi99gERUU7TD8KfAa6MpQ9bw","blskey_pop":"RPLagxaR5xdimFzwmzYnz4ZhWtYQEj8iR5ZU53T2gitPCyCHQneUn2Huc4oeLd2B2HzkGnjAff4hWTJT6C7qHYB1Mv2wU5iHHGFWkhnTX9WsEAbunJCV2qcaXScKj4tTfvdDKfLiVuU2av6hbsMztirRze7LvYBkRHV3tGwyCptsrP","client_ip":"138.197.138.255","client_port":9708,"node_ip":"138.197.138.255","node_port":9707,"services":["VALIDATOR"]},"dest":"4PS3EDQ3dW1tci1Bp6543CfuuebjFrg36kLAUcskGfaA"},"metadata":{"from":"TWwCRQRZ2ZHMJFn9TzLp7W"},"type":"0"},"txnMetadata":{"seqNo":4,"txnId":"aa5e817d7cc626170eca175822029339a444eb0ee8f0bd20d3b0b76e566fb008"},"ver":"1"} '

const App = () => {
  const [status, setStatus] = React.useState('')
  const x = async () => {
    const getNymRequest = new GetNymRequest({ dest: mockDid, submitterDid: mockDid })
    const pool = new PoolCreate({
      parameters: {
        transactions,
        node_weights: {
          s: 1,
        },
      },
    })

    const requestHandle = getNymRequest.currentHandle
    const res = await pool.submitRequest({ requestHandle })
    setStatus(JSON.stringify(res))
  }

  return (
    <ScrollView>
      <Text />
      <Text />
      <Text />
      <Text />
      <Button onPress={x} title="GetAttribRequest" />
      <Text>{status}</Text>
    </ScrollView>
  )
}

export default App

//const indyVdr = new IndyVdr()

//type Func = {
//[key: string]: any
//}

//export default function App() {
//const [requestHandle, setRequestHandle] = React.useState(indyVdr.currentRequestHandle)
//const [poolHandle, setPoolHandle] = React.useState(indyVdr.currentPoolHandle)
//const [body, setBody] = React.useState('')
//const [signatureInput, setSignatureInput] = React.useState('')
//const [prep, setPrep] = React.useState('')

//const functions: Func[] = [
//{ version: () => indyVdr.version() },
//{ set_config: () => indyVdr.setConfig({ config: { test: 'test' } }) },
//{ set_default_logger: () => indyVdr.setDefaultLogger() },
//{ set_protocol_version: () => indyVdr.setProtocolVersion({ version: 2 }) },
//{ set_socks_proxy: () => indyVdr.setSocksProxy({ socksProxy: 'abc' }) },
//{
//build_acceptance_mechanisms_request: () =>
//indyVdr.buildAcceptanceMechanismsRequest({
//submitterDid: mockDid,
//aml: { key: 'ja' },
//version: '1.0.0',
//amlContext: 'a',
//}),
//},
//{
//build_get_acceptance_mechanisms_request: () =>
//indyVdr.buildGetAcceptanceMechanismsRequest({
//submitterDid: mockDid,
//version: '1.0.0',
////timestamp: new Date(),
//}),
//},
//{
//build_attrib_request: () =>
//indyVdr.buildAttribRequest({
//submitterDid: mockDid,
//targetDid: mockDid,
//enc: 'a',
//raw: { b: 'c' },
//hash: 'd',
//}),
//},
//{
//build_get_attrib_request: () =>
//indyVdr.buildGetAttribRequest({
//submitterDid: mockDid,
//targetDid: mockDid,
//enc: 'a',
//raw: { b: 'c' },
//hash: 'd',
//}),
//},
//{
//build_cred_def_request: () =>
//indyVdr.buildCredDefRequest({
//submitterDid: mockDid,
//credentialDefinition: {
//id: mockCredentialDefinitionId,
//tag: 'a',
//value: { primary: { key: 'a' }, revocation: { key: 'a' } },
//schemaId: mockSchemaId,
//type: 'CL',
//ver: '1.0',
//},
//}),
//},
//{
//build_custom_request: () =>
//indyVdr.buildCustomRequest({
//customRequest: {
//operation: { timestamp: new Date(), type: 'a', from: 1, to: 1 },
//identifier: mockDid,
//protocolVersion: 1,
//reqId: 1,
//},
//}),
//},
//{
//build_disable_all_txn_author_agreements_request: () =>
//indyVdr.buildDisableAllTxnAuthorAgreementsRequest({
//submitterDid: mockDid,
//}),
//},
//{
//build_get_cred_def_request: () =>
//indyVdr.buildGetCredDefRequest({
//credentialDefinitionId: mockCredentialDefinitionId,
//submitterDid: mockDid,
//}),
//},
//{
//build_get_nym_request: () =>
//indyVdr.buildGetNymRequest({
//submitterDid: mockDid,
//dest: mockDid,
//}),
//},
//{
//build_get_revoc_reg_request: () =>
//indyVdr.buildGetRevocRegRequest({
//submitterDid: mockDid,
//timestamp: new Date(),
//revocationRegistryId: mockRevocationRegistryId,
//}),
//},
//{
//build_get_revoc_reg_definition_request: () =>
//indyVdr.buildGetRevocRegDefRequest({
//submitterDid: mockDid,
//revocationRegistryId: mockRevocationRegistryId,
//}),
//},
//{
//build_get_schema_request: () =>
//indyVdr.buildGetSchemaRequest({
//submitterDid: mockDid,
//schemaId: mockSchemaId,
//}),
//},
//{
//build_get_txn_request: () =>
//indyVdr.buildGetTxnRequest({
//submitterDid: mockDid,
//seqNo: 1,
//ledgerType: 1,
//}),
//},
//{
//build_get_validator_info_request: () =>
//indyVdr.buildGetValidatorInfoRequest({
//submitterDid: mockDid,
//}),
//},
//{
//build_nym_request: () =>
//indyVdr.buildNymRequest({
//submitterDid: mockDid,
//dest: mockDid,
//role: 'STEWARD',
//alias: 'a',
//verkey: 'a',
//}),
//},
//{
//build_get_revoc_reg_def_request: () =>
//indyVdr.buildRevocRegDefRequest({
//submitterDid: mockDid,
//revocationRegistryId: mockRevocationRegistryId,
//}),
//},
//{
//build_get_revoc_reg_entry_request: () =>
//indyVdr.buildRevocRegEntryRequest({
//submitterDid: mockDid,
//revocationRegistryDefinitionId: mockRevocationRegistryId,
//revocationRegistryEntry: { ver: '1.0', value: 'a' },
//revocationRegistryDefinitionType: 'CL_ACCUM',
//}),
//},
//{
//build_schema_request: () =>
//indyVdr.buildSchemaRequest({
//submitterDid: mockDid,
//schema: {
//id: mockSchemaId,
//name: 'mockschema',
//ver: '1.0',
//seqNo: 1,
//version: '1.0.0',
//attrNames: ['a'],
//},
//}),
//},
//{
//build_txn_author_agreement_request: () =>
//indyVdr.buildTxnAuthorAgreementRequest({
//submitterDid: mockDid,
//version: 'a',
//text: 'a',
//retirementTs: 1,
//ratificationTs: 1,
//}),
//},
//{
//build_rich_schema_request: () =>
//indyVdr.buildRichSchemaRequest({
//submitterDid: mockDid,
//ver: 'a',
//id: 'b',
//name: 'c',
//type: 'enc',
//content: 'e',
//version: 'f',
//}),
//},
//{
//build_get_rich_schema_object_by_id_request: () =>
//indyVdr.buildGetRichSchemaObjectByIdRequest({
//submitterDid: mockDid,
//id: 'a',
//}),
//},
//{
//build_get_rich_schema_object_by_metadata_request: () =>
//indyVdr.buildGetRichSchemaObjectByMetadataRequest({
//submitterDid: mockDid,
//name: 'a',
//type: 'a',
//version: 'a',
//}),
//},
//{
//pool_create: () =>
//indyVdr.poolCreate({
//parameters: {
//transactions,
//node_weights: {
//s: 1,
//},
//},
//}),
//},
//{
//pool_refresh: async () => await indyVdr.poolRefresh(),
//},
//{
//pool_get_status: () =>
//indyVdr
//.poolGetStatus()
//.then((a) => console.log('response: ', a))
//.catch((e) => console.error('error: ', e)),
//},
//{
//pool_get_transactions: () =>
//indyVdr
//.poolGetTransactions()
//.then((a) => console.log('response: ', a))
//.catch((e) => console.error('error: ', e)),
//},
//{
//pool_get_verifiers: () =>
//indyVdr
//.poolGetVerfiers()
//.then((a) => console.log('response: ', a))
//.catch((e) => console.error('error: ', e)),
//},
//{
//pool_submit_action: () =>
//indyVdr
//.poolSubmitAction({
//nodes: ['Node1'],
////timeout: 1,
//})
//.then((a) => console.log('response: ', a))
//.catch((e) => console.error('error: ', e)),
//},
//{
//pool_submit_request: () =>
//indyVdr
//.poolSubmitRequest()
//.then((a) => console.log('response: ', a))
//.catch((e) => console.error(e)),
//},
//{
//request_free: () => indyVdr.requestFree(),
//},
//{
//request_get_body: () => setBody(indyVdr.requestGetBody()),
//},
//{
//request_get_signature_input: () => setSignatureInput(indyVdr.requestGetSignatureInput()),
//},
//{
//request_set_endorser: () =>
//indyVdr.requestSetEndorser({
//endorser: mockDid,
//}),
//},
//{
//request_set_multi_signature: () =>
//indyVdr.requestSetMultiSignature({
//signature: 1,
//identifier: mockDid,
//signatureLen: 1,
//}),
//},
//{
//request_set_signature: () =>
//indyVdr.requestSetSignature({
//signature: 1,
//signatureLen: 1,
//}),
//},
//{
//request_set_txn_author_agreement_acceptance: () =>
//indyVdr.requestSetTxnAuthorAgreementAcceptance({
//acceptance: {
//mechanism: 'a',
//taaDigest: 'a',
//time: 1,
//},
//}),
//},
//{
//prepare_txn_author_agreement_acceptance: () =>
//setPrep(
//indyVdr.prepareTxnAuthorAgreementAcceptance({
//time: 1,
//accMechType: 'aa',
//text: 'aa',
//version: 'aa',
//taaDigest: 'aaaa',
//})
//),
//},
//]

//return (
//<View style={styles.container}>
//<Text style={styles.title}>Indy Vdr ({indyVdr.version()}) React Native Example</Text>
//<Text>handle: {requestHandle}</Text>
//<Text>poolHandle: {poolHandle}</Text>
//<Text>functions mapped: {functions.length}</Text>
//<Text>body: {body}</Text>
//<Text>signatureInput: {signatureInput}</Text>
//<Text>prep: {prep}</Text>
//<ScrollView>
//{functions.map((value) => {
//const [functionName, func] = Object.entries(value)[0]
//return (
//<View key={functionName}>
//<Button
//onPress={() => {
//func()
//functionName.startsWith('pool_')
//? setPoolHandle(indyVdr.currentPoolHandle)
//: setRequestHandle(indyVdr.currentRequestHandle)
//}}
//title={functionName.split('_').join(' ')}
///>
//</View>
//)
//})}
//</ScrollView>
//</View>
//)
//}

//const styles = StyleSheet.create({
//container: {
//flex: 1,
//justifyContent: 'center',
//alignItems: 'center',
//marginVertical: 50,
//},
//title: {
//fontWeight: 'bold',
//fontSize: 20,
//marginBottom: 20,
//},
//})
