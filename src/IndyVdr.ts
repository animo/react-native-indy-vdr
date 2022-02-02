import type { IndyVdrNativeBindings } from './IIndyVdr'
import type {
  Aml,
  CredentialDefinitionId,
  CredentialDefinitionV1,
  CustomRequest,
  Did,
  NymRoles,
  PoolCreateParams,
  PoolStatus,
  Raw,
  RegistryDefinition,
  RevocationRegistryDelta,
  RevocationRegistryId,
  RichSchemaType,
  SchemaId,
  SchemaV1,
  SendRequest,
  SubmitRequest,
  TransactionAuthorAgreementAcceptance,
  Transactions,
  Verifiers,
} from './types'
import { serializeArguments, SerializedOptions } from './utils/convertArguments'

declare var _indy_vdr: IndyVdrNativeBindings
const NativeIndyVdr = _indy_vdr as IndyVdrNativeBindings

// TODO: proper documentation
class IndyVdr {
  // TODO: how do we generate a handle
  //       how many handles do we need?
  //       how de we know that the handle is valid?
  private requestHandle: number = 0
  private poolHandle: number = 0

  get currentRequestHandle() {
    return this.requestHandle
  }

  get currentPoolHandle() {
    return this.poolHandle
  }

  get latestError() {
    return NativeIndyVdr.get_current_error()
  }

  private promisify = (method: (cb: (...args: any[]) => void) => void): Promise<void> => {
    return new Promise((resolve, reject) => {
      const _cb = (err: number) => {
        if (err !== 0) reject(this.latestError)
        resolve()
      }

      method(_cb)
    })
  }

  private promisifyWithResponse = <T>(method: (cb: (...args: any[]) => void) => void, isStream = false): Promise<T> => {
    return new Promise((resolve, reject) => {
      const _cb = (err: number, response: string) => {
        console.log(response)
        if (err !== 0) reject(this.latestError)

        try {
          // this is required to add array brackets, and commas, to an invalid json object that
          //should be a list
          const mappedResponse = isStream ? '[' + response.replace(/\n/g, ',') + ']' : response
          resolve(JSON.parse(mappedResponse))
        } catch (error) {
          // we cannot throw errors here as this will be called from  withint Rust and Rust cannot handle
          // foreign exceptions
          // TODO: is this the best way?
          console.error(error)
        }
      }

      method(_cb)
    })
  }

  public version() {
    return NativeIndyVdr.version()
  }

  public setConfig(options: { config: Record<string, unknown> }) {
    const { config } = serializeArguments(options) as SerializedOptions<typeof options>

    NativeIndyVdr.set_config({ config })
  }

  // TODO: this causes rust to panic, if we call it for the second time.
  //       How do we deal with with these Rust panics?
  public setDefaultLogger() {
    NativeIndyVdr.set_default_logger()
  }

  public setProtocolVersion(options: { version: number }) {
    const { version } = serializeArguments(options) as SerializedOptions<typeof options>

    NativeIndyVdr.set_protocol_version({ version })
  }

  public setSocksProxy(options: { socksProxy: string }) {
    const { socksProxy } = serializeArguments(options) as SerializedOptions<typeof options>

    NativeIndyVdr.set_socks_proxy({ socks_proxy: socksProxy })
  }

  public buildAcceptanceMechanismsRequest(options: {
    submitterDid: Did
    aml: Aml
    version: string
    amlContext?: string
  }) {
    const { version, aml, submitterDid, amlContext } = serializeArguments(options) as SerializedOptions<typeof options>

    this.requestHandle = NativeIndyVdr.build_acceptance_mechanisms_request({
      submitter_did: submitterDid,
      aml,
      version,
      aml_context: amlContext,
      handle_p: this.requestHandle,
    })
  }

  public buildGetAcceptanceMechanismsRequest(options: { timestamp?: Date; submitterDid?: Did; version?: string }) {
    if (!options.version && !options.timestamp) throw new Error('Either version or timestamp must be supplied')

    const { version, timestamp, submitterDid } = serializeArguments(options) as SerializedOptions<typeof options>

    this.requestHandle = NativeIndyVdr.build_get_acceptance_mechanisms_request({
      submitter_did: submitterDid,
      timestamp: timestamp?.valueOf(),
      version: version,
      handle_p: this.requestHandle,
    })
  }

  public buildAttribRequest(options: { submitterDid: Did; targetDid: string; hash?: string; raw?: Raw; enc?: string }) {
    const { submitterDid, targetDid, hash, raw, enc } = serializeArguments(options) as SerializedOptions<typeof options>

    this.requestHandle = NativeIndyVdr.build_attrib_request({
      submitter_did: submitterDid,
      enc,
      raw,
      hash,
      handle_p: this.requestHandle,
      target_did: targetDid,
    })
  }

  public buildGetAttribRequest(options: {
    submitterDid?: Did
    targetDid: string
    hash?: string
    raw?: Raw
    enc?: string
  }) {
    const { submitterDid, targetDid, hash, raw, enc } = serializeArguments(options) as SerializedOptions<typeof options>

    this.requestHandle = NativeIndyVdr.build_get_attrib_request({
      submitter_did: submitterDid,
      enc,
      raw,
      hash,
      handle_p: this.requestHandle,
      target_did: targetDid,
    })
  }

  public buildCredDefRequest(options: { submitterDid: Did; credentialDefinition: CredentialDefinitionV1 }) {
    const { credentialDefinition, submitterDid } = serializeArguments(options) as SerializedOptions<typeof options>

    this.requestHandle = NativeIndyVdr.build_cred_def_request({
      submitter_did: submitterDid,
      cred_def: credentialDefinition,
      handle_p: this.requestHandle,
    })
  }

  public buildGetCredDefRequest(options: { submitterDid?: Did; credentialDefinitionId: CredentialDefinitionId }) {
    const { submitterDid, credentialDefinitionId } = serializeArguments(options) as SerializedOptions<typeof options>

    this.requestHandle = NativeIndyVdr.build_get_cred_def_request({
      submitter_did: submitterDid,
      cred_def_id: credentialDefinitionId,
      handle_p: this.requestHandle,
    })
  }

  public buildGetRevocRegDefRequest(options: { submitterDid?: Did; revocationRegistryId: RevocationRegistryId }) {
    const { revocationRegistryId, submitterDid } = serializeArguments(options) as SerializedOptions<typeof options>

    this.requestHandle = NativeIndyVdr.build_get_revoc_reg_def_request({
      submitter_did: submitterDid,
      revoc_reg_id: revocationRegistryId,
      handle_p: this.requestHandle,
    })
  }

  public buildGetRevocRegRequest(options: {
    submitterDid?: Did
    revocationRegistryId: RevocationRegistryId
    timestamp: Date
  }) {
    const { submitterDid, timestamp, revocationRegistryId } = serializeArguments(options) as SerializedOptions<
      typeof options
    >

    this.requestHandle = NativeIndyVdr.build_get_revoc_reg_request({
      submitter_did: submitterDid,
      revoc_reg_id: revocationRegistryId,
      timestamp: timestamp.valueOf(),
      handle_p: this.requestHandle,
    })
  }

  public buildGetRevocRegDeltaRequest(options: {
    submitterDid?: Did
    revocationRegistryId: RevocationRegistryId
    fromTs?: number
    toTs: number
  }) {
    const { submitterDid, revocationRegistryId, fromTs, toTs } = serializeArguments(options) as SerializedOptions<
      typeof options
    >

    this.requestHandle = NativeIndyVdr.build_get_revoc_reg_delta_request({
      submitter_did: submitterDid,
      revoc_reg_id: revocationRegistryId,
      from_ts: fromTs,
      to_ts: toTs,
      handle_p: this.requestHandle,
    })
  }

  public buildRevocRegDefRequest(options: { submitterDid?: Did; revocationRegistryId: RevocationRegistryId }) {
    const { submitterDid, revocationRegistryId } = serializeArguments(options) as SerializedOptions<typeof options>

    this.requestHandle = NativeIndyVdr.build_get_revoc_reg_def_request({
      submitter_did: submitterDid,
      revoc_reg_id: revocationRegistryId,
      handle_p: this.requestHandle,
    })
  }

  public buildCustomRequest(options: { customRequest: CustomRequest }) {
    const { customRequest } = serializeArguments(options) as SerializedOptions<typeof options>

    this.requestHandle = NativeIndyVdr.build_custom_request({
      request_json: customRequest,
      handle_p: this.requestHandle,
    })
  }

  public buildDisableAllTxnAuthorAgreementsRequest(options: { submitterDid: Did }) {
    const { submitterDid } = serializeArguments(options) as SerializedOptions<typeof options>

    this.requestHandle = NativeIndyVdr.build_disable_all_txn_author_agreements_request({
      submitter_did: submitterDid,
      handle_p: this.requestHandle,
    })
  }

  // TODO: how do we return the `get`
  public buildGetNymRequest(options: { submitterDid?: Did; dest: Did }) {
    const { submitterDid, dest } = serializeArguments(options) as SerializedOptions<typeof options>

    this.requestHandle = NativeIndyVdr.build_get_nym_request({
      submitter_did: submitterDid,
      dest,
      handle_p: this.requestHandle,
    })
  }

  public buildGetSchemaRequest(options: { submitterDid?: Did; schemaId: SchemaId }) {
    const { submitterDid, schemaId } = serializeArguments(options) as SerializedOptions<typeof options>

    this.requestHandle = NativeIndyVdr.build_get_schema_request({
      submitter_did: submitterDid,
      schema_id: schemaId,
      handle_p: this.requestHandle,
    })
  }

  public buildGetTxnAuthorAgreementRequest(options: { submitterDid?: Did; data?: string }) {
    const { submitterDid, data } = serializeArguments(options) as SerializedOptions<typeof options>

    this.requestHandle = NativeIndyVdr.build_get_txn_author_agreement_request({
      submitter_did: submitterDid,
      data,
      handle_p: this.requestHandle,
    })
  }

  public buildGetTxnRequest(options: { submitterDid?: Did; ledgerType: number; seqNo: number }) {
    const { submitterDid, seqNo, ledgerType } = serializeArguments(options) as SerializedOptions<typeof options>

    this.requestHandle = NativeIndyVdr.build_get_txn_request({
      submitter_did: submitterDid,
      ledger_type: ledgerType,
      seq_no: seqNo,
      handle_p: this.requestHandle,
    })
  }

  public buildGetValidatorInfoRequest(options: { submitterDid: Did }) {
    const { submitterDid } = serializeArguments(options) as SerializedOptions<typeof options>

    this.requestHandle = NativeIndyVdr.build_get_validator_info_request({
      submitter_did: submitterDid,
      handle_p: this.requestHandle,
    })
  }

  public buildNymRequest(options: {
    submitterDid: Did
    dest: string
    verkey?: string
    alias?: string
    role?: NymRoles
  }) {
    const { submitterDid, dest, role, alias, verkey } = serializeArguments(options) as SerializedOptions<typeof options>

    this.requestHandle = NativeIndyVdr.build_nym_request({
      submitter_did: submitterDid,
      dest,
      role,
      alias,
      verkey,
      handle_p: this.requestHandle,
    })
  }

  public buildRevocRegEntryRequest(options: {
    submitterDid: Did
    revocationRegistryDefinitionId: string
    revocationRegistryDefinitionType: RegistryDefinition
    revocationRegistryEntry: RevocationRegistryDelta
  }) {
    const { submitterDid, revocationRegistryEntry, revocationRegistryDefinitionType, revocationRegistryDefinitionId } =
      serializeArguments(options) as SerializedOptions<typeof options>

    this.requestHandle = NativeIndyVdr.build_revoc_reg_entry_request({
      submitter_did: submitterDid,
      revoc_reg_entry: revocationRegistryEntry,
      revoc_reg_def_id: revocationRegistryDefinitionId,
      revoc_reg_def_type: revocationRegistryDefinitionType,
      handle_p: this.requestHandle,
    })
  }

  public buildSchemaRequest(options: { submitterDid: Did; schema: SchemaV1 }) {
    const { submitterDid, schema } = serializeArguments(options) as SerializedOptions<typeof options>

    this.requestHandle = NativeIndyVdr.build_schema_request({
      submitter_did: submitterDid,
      schema,
      handle_p: this.requestHandle,
    })
  }

  public buildTxnAuthorAgreementRequest(options: {
    submitterDid: Did
    text?: string
    version: string
    ratificationTs?: number
    retirementTs?: number
  }) {
    const { submitterDid, version, text, retirementTs, ratificationTs } = serializeArguments(
      options
    ) as SerializedOptions<typeof options>

    this.requestHandle = NativeIndyVdr.build_txn_author_agreement_request({
      submitter_did: submitterDid,
      text,
      version,
      ratification_ts: ratificationTs,
      retirement_ts: retirementTs,
      handle_p: this.requestHandle,
    })
  }

  public buildRichSchemaRequest(options: {
    submitterDid: Did
    id: string
    content: string
    name: string
    version: string
    type: RichSchemaType
    ver: string
  }) {
    const { submitterDid, ver, type, version, name, content, id } = serializeArguments(options) as SerializedOptions<
      typeof options
    >

    this.requestHandle = NativeIndyVdr.build_rich_schema_request({
      submitter_did: submitterDid,
      ver,
      rs_id: id,
      rs_name: name,
      rs_type: type,
      rs_content: content,
      rs_version: version,
      handle_p: this.requestHandle,
    })
  }

  public buildGetRichSchemaObjectByIdRequest(options: { submitterDid: Did; id: string }) {
    const { submitterDid, id } = serializeArguments(options) as SerializedOptions<typeof options>

    this.requestHandle = NativeIndyVdr.build_get_rich_schema_object_by_id_request({
      submitter_did: submitterDid,
      rs_id: id,
      handle_p: this.requestHandle,
    })
  }

  public buildGetRichSchemaObjectByMetadataRequest(options: {
    submitterDid: Did
    type: string
    name: string
    version: string
  }) {
    const { submitterDid, version, name, type } = serializeArguments(options) as SerializedOptions<typeof options>

    this.requestHandle = NativeIndyVdr.build_get_rich_schema_object_by_metadata_request({
      submitter_did: submitterDid,
      rs_name: name,
      rs_type: type,
      rs_version: version,
      handle_p: this.requestHandle,
    })
  }

  // TODO: either transactions or transactions_path must be provided
  //
  public poolCreate(options: { parameters: PoolCreateParams }) {
    if (options.parameters.transactions || options.parameters.transactions_path)
      throw new Error('Either transactions or transactions_path must be supplied')

    const { parameters } = serializeArguments(options) as SerializedOptions<typeof options>

    this.poolHandle = NativeIndyVdr.pool_create({
      params: parameters,
      handle_p: this.poolHandle,
    })
  }

  public async poolRefresh() {
    return this.promisify(
      (cb) =>
        (this.poolHandle = NativeIndyVdr.pool_refresh({
          pool_handle: this.poolHandle,
          cb,
        }))
    )
  }

  public async poolGetStatus() {
    return this.promisifyWithResponse<PoolStatus>(
      (cb) =>
        (this.poolHandle = NativeIndyVdr.pool_get_status({
          pool_handle: this.poolHandle,
          cb,
        }))
    )
  }

  public async poolGetTransactions() {
    return this.promisifyWithResponse<Transactions>(
      (cb) =>
        (this.poolHandle = NativeIndyVdr.pool_get_transactions({
          pool_handle: this.poolHandle,
          cb,
        })),
      true
    )
  }

  public async poolGetVerfiers() {
    return this.promisifyWithResponse<Verifiers>(
      (cb) =>
        (this.poolHandle = NativeIndyVdr.pool_get_verifiers({
          pool_handle: this.poolHandle,
          cb,
        }))
    )
  }

  public async poolSubmitAction(options: { nodes?: string[]; timeout?: number }) {
    const { nodes, timeout } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.promisifyWithResponse<SendRequest>(
      (cb) =>
        (this.poolHandle = NativeIndyVdr.pool_submit_action({
          pool_handle: this.poolHandle,
          request_handle: this.requestHandle,
          nodes,
          timeout,
          cb,
        }))
    )
  }

  public async poolSubmitRequest() {
    return this.promisifyWithResponse<SubmitRequest>(
      (cb) =>
        (this.poolHandle = NativeIndyVdr.pool_submit_request({
          pool_handle: this.poolHandle,
          request_handle: this.requestHandle,
          cb,
        }))
    )
  }

  public poolClose() {
    this.poolHandle = NativeIndyVdr.pool_close({
      pool_handle: this.poolHandle,
    })
  }

  public prepareTxnAuthorAgreementAcceptance(options: {
    text?: string
    version?: string
    taaDigest?: string
    accMechType: string
    time: number
  }) {
    const { time, accMechType, text, version, taaDigest } = serializeArguments(options) as SerializedOptions<
      typeof options
    >

    return NativeIndyVdr.prepare_txn_author_agreement_acceptance({
      time,
      text,
      version,
      acc_mech_type: accMechType,
      taa_digest: taaDigest,
    })
  }

  public requestFree() {
    this.requestHandle = NativeIndyVdr.request_free({
      request_handle: this.requestHandle,
    })
  }

  // TODO: get body changes based on what is in the body at that time (nym, schema, rich schema, etc.)
  public requestGetBody() {
    return NativeIndyVdr.request_get_body({
      request_handle: this.requestHandle,
    })
  }

  public requestGetSignatureInput() {
    return NativeIndyVdr.request_get_signature_input({
      request_handle: this.requestHandle,
    })
  }

  public requestSetEndorser(options: { endorser: string }) {
    const { endorser } = serializeArguments(options) as SerializedOptions<typeof options>

    this.requestHandle = NativeIndyVdr.request_set_endorser({
      request_handle: this.requestHandle,
      endorser,
    })
  }

  public requestSetMultiSignature(options: { identifier: string; signature: number; signatureLen: number }) {
    const { signature, signatureLen, identifier } = serializeArguments(options) as SerializedOptions<typeof options>

    this.requestHandle = NativeIndyVdr.request_set_multi_signature({
      request_handle: this.requestHandle,
      identifier,
      signature,
      signature_len: signatureLen,
    })
  }

  public requestSetSignature(options: { signature: number; signatureLen: number }) {
    const { signature, signatureLen } = serializeArguments(options) as SerializedOptions<typeof options>

    this.requestHandle = NativeIndyVdr.request_set_signature({
      request_handle: this.requestHandle,
      signature,
      signature_len: signatureLen,
    })
  }

  public requestSetTxnAuthorAgreementAcceptance(options: { acceptance: TransactionAuthorAgreementAcceptance }) {
    const { acceptance } = serializeArguments(options) as SerializedOptions<typeof options>

    this.requestHandle = NativeIndyVdr.request_set_txn_author_agreement_acceptance({
      request_handle: this.requestHandle,
      acceptance,
    })
  }
}

export { IndyVdr, NativeIndyVdr }
