import type {
  AcceptanceMechanismsRequestOptions,
  AttribRequestOptions,
  CredentialDefinitionRequestOptions,
  CustomRequestOptions,
  DisableAllTransactionAuthorAgreementsRequestOptions,
  GetAcceptanceMechanismsRequestOptions,
  GetAttribRequestOptions,
  GetCredentialDefinitionRequestOptions,
  GetNymRequestOptions,
  GetRevocationRegistryDefinitionRequestOptions,
  GetRevocationRegistryDeltaRequestOptions,
  GetRevocationRegistryRequestOptions,
  GetRichSchemaObjectByIdRequestOptions,
  GetRichSchemaObjectByMetadataRequestOptions,
  GetSchemaRequestOptions,
  GetTransactionAuthorAgreementRequestOptions,
  GetTransactionRequestOptions,
  GetValidatorInfoRequestOptions,
  IndyVdr,
  IndyVdrNativeBindings,
  NymRequestOptions,
  PoolCreateOptions,
  PoolStatus,
  PoolSubmitActionOptions,
  PoolSubmitRequestOptions,
  PrepareTxnAuthorAgreementAcceptanceOptions,
  RequestSetEndorserOptions,
  RequestSetMultiSignatureOptions,
  RequestSetSignatureOptions,
  RequestSetTxnAuthorAgreementAcceptanceOptions,
  RevocationRegistryDefinitionRequestOptions,
  RevocationRegistryEntryRequestOptions,
  RichSchemaRequestOptions,
  SchemaRequestOptions,
  SubmitAction,
  SubmitRequest,
  TransactionAuthorAgreementRequestOptions,
  Transactions,
  Verifiers,
} from 'indy-vdr'
import { serializeArguments, SerializedOptions } from '../utils'

// TODO: proper documentation
export class IndyVdrReactNative implements IndyVdr {
  private nativeIndyVdr: IndyVdrNativeBindings

  constructor(options: { nativeIndyVdr: IndyVdrNativeBindings }) {
    const { nativeIndyVdr } = options
    this.nativeIndyVdr = nativeIndyVdr
  }

  get latestError() {
    return this.nativeIndyVdr.get_current_error()
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
        if (err !== 0) reject(this.latestError)

        try {
          // this is required to add array brackets, and commas, to an invalid json object that
          //should be a list
          const mappedResponse = isStream ? '[' + response.replace(/\n/g, ',') + ']' : response
          resolve(JSON.parse(mappedResponse))
        } catch (error) {
          resolve(JSON.parse(response))
        }
      }

      method(_cb)
    })
  }

  public version() {
    return this.nativeIndyVdr.version()
  }

  public setConfig(options: { config: Record<string, unknown> }) {
    const { config } = serializeArguments(options) as SerializedOptions<typeof options>

    this.nativeIndyVdr.set_config({ config })
  }

  // TODO: this causes rust to panic, if we call it for the second time.
  //       How do we deal with with these Rust panics?
  public setDefaultLogger() {
    this.nativeIndyVdr.set_default_logger()
  }

  public setProtocolVersion(options: { version: number }) {
    const { version } = serializeArguments(options) as SerializedOptions<typeof options>

    this.nativeIndyVdr.set_protocol_version({ version })
  }

  public setSocksProxy(options: { socksProxy: string }) {
    const { socksProxy } = serializeArguments(options) as SerializedOptions<typeof options>

    this.nativeIndyVdr.set_socks_proxy({ socks_proxy: socksProxy })
  }

  public buildAcceptanceMechanismsRequest(options: AcceptanceMechanismsRequestOptions) {
    const { version, aml, submitterDid, amlContext } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.build_acceptance_mechanisms_request({
      submitter_did: submitterDid,
      aml,
      version,
      aml_context: amlContext,
    })
  }

  public buildGetAcceptanceMechanismsRequest(options: GetAcceptanceMechanismsRequestOptions) {
    if (!options.version && !options.timestamp) throw new Error('Either version or timestamp must be supplied')

    const { version, timestamp, submitterDid } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.build_get_acceptance_mechanisms_request({
      submitter_did: submitterDid,
      timestamp: timestamp?.valueOf(),
      version: version,
    })
  }

  public buildAttribRequest(options: AttribRequestOptions) {
    const { submitterDid, targetDid, hash, raw, enc } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.build_attrib_request({
      submitter_did: submitterDid,
      enc,
      raw,
      hash,

      target_did: targetDid,
    })
  }

  public buildGetAttribRequest(options: GetAttribRequestOptions) {
    const { submitterDid, targetDid, hash, raw, enc } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.build_get_attrib_request({
      submitter_did: submitterDid,
      enc,
      raw,
      hash,

      target_did: targetDid,
    })
  }

  public buildCredDefRequest(options: CredentialDefinitionRequestOptions) {
    const { credentialDefinition, submitterDid } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.build_cred_def_request({
      submitter_did: submitterDid,
      cred_def: credentialDefinition,
    })
  }

  public buildGetCredDefRequest(options: GetCredentialDefinitionRequestOptions) {
    const { submitterDid, credentialDefinitionId } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.build_get_cred_def_request({
      submitter_did: submitterDid,
      cred_def_id: credentialDefinitionId,
    })
  }

  public buildGetRevocRegDefRequest(options: GetRevocationRegistryDefinitionRequestOptions) {
    const { revocationRegistryId, submitterDid } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.build_get_revoc_reg_def_request({
      submitter_did: submitterDid,
      revoc_reg_id: revocationRegistryId,
    })
  }

  public buildGetRevocRegRequest(options: GetRevocationRegistryRequestOptions) {
    const { submitterDid, timestamp, revocationRegistryId } = serializeArguments(options) as SerializedOptions<
      typeof options
    >

    return this.nativeIndyVdr.build_get_revoc_reg_request({
      submitter_did: submitterDid,
      revoc_reg_id: revocationRegistryId,
      timestamp: timestamp.valueOf(),
    })
  }

  public buildGetRevocRegDeltaRequest(options: GetRevocationRegistryDeltaRequestOptions) {
    const { submitterDid, revocationRegistryId, fromTs, toTs } = serializeArguments(options) as SerializedOptions<
      typeof options
    >

    return this.nativeIndyVdr.build_get_revoc_reg_delta_request({
      submitter_did: submitterDid,
      revoc_reg_id: revocationRegistryId,
      from_ts: fromTs,
      to_ts: toTs,
    })
  }

  public buildRevocRegDefRequest(options: RevocationRegistryDefinitionRequestOptions) {
    const { submitterDid, revocationRegistryId } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.build_get_revoc_reg_def_request({
      submitter_did: submitterDid,
      revoc_reg_id: revocationRegistryId,
    })
  }

  public buildCustomRequest(options: CustomRequestOptions) {
    const { customRequest } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.build_custom_request({
      request_json: customRequest,
    })
  }

  public buildDisableAllTxnAuthorAgreementsRequest(options: DisableAllTransactionAuthorAgreementsRequestOptions) {
    const { submitterDid } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.build_disable_all_txn_author_agreements_request({
      submitter_did: submitterDid,
    })
  }

  public buildGetNymRequest(options: GetNymRequestOptions) {
    const { submitterDid, dest } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.build_get_nym_request({
      submitter_did: submitterDid,
      dest,
    })
  }

  public buildGetSchemaRequest(options: GetSchemaRequestOptions) {
    const { submitterDid, schemaId } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.build_get_schema_request({
      submitter_did: submitterDid,
      schema_id: schemaId,
    })
  }

  public buildGetTxnAuthorAgreementRequest(options: GetTransactionAuthorAgreementRequestOptions) {
    const { submitterDid, data } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.build_get_txn_author_agreement_request({
      submitter_did: submitterDid,
      data,
    })
  }

  public buildGetTxnRequest(options: GetTransactionRequestOptions) {
    const { submitterDid, seqNo, ledgerType } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.build_get_txn_request({
      submitter_did: submitterDid,
      ledger_type: ledgerType,
      seq_no: seqNo,
    })
  }

  public buildGetValidatorInfoRequest(options: GetValidatorInfoRequestOptions) {
    const { submitterDid } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.build_get_validator_info_request({
      submitter_did: submitterDid,
    })
  }

  public buildNymRequest(options: NymRequestOptions) {
    const { submitterDid, dest, role, alias, verkey } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.build_nym_request({
      submitter_did: submitterDid,
      dest,
      role,
      alias,
      verkey,
    })
  }

  public buildRevocRegEntryRequest(options: RevocationRegistryEntryRequestOptions) {
    const { submitterDid, revocationRegistryEntry, revocationRegistryDefinitionType, revocationRegistryDefinitionId } =
      serializeArguments(options) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.build_revoc_reg_entry_request({
      submitter_did: submitterDid,
      revoc_reg_entry: revocationRegistryEntry,
      revoc_reg_def_id: revocationRegistryDefinitionId,
      revoc_reg_def_type: revocationRegistryDefinitionType,
    })
  }

  public buildSchemaRequest(options: SchemaRequestOptions) {
    const { submitterDid, schema } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.build_schema_request({
      submitter_did: submitterDid,
      schema,
    })
  }

  public buildTxnAuthorAgreementRequest(options: TransactionAuthorAgreementRequestOptions) {
    const { submitterDid, version, text, retirementTs, ratificationTs } = serializeArguments(
      options
    ) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.build_txn_author_agreement_request({
      submitter_did: submitterDid,
      text,
      version,
      ratification_ts: ratificationTs,
      retirement_ts: retirementTs,
    })
  }

  public buildRichSchemaRequest(options: RichSchemaRequestOptions) {
    const { submitterDid, ver, type, version, name, content, id } = serializeArguments(options) as SerializedOptions<
      typeof options
    >

    return this.nativeIndyVdr.build_rich_schema_request({
      submitter_did: submitterDid,
      ver,
      rs_id: id,
      rs_name: name,
      rs_type: type,
      rs_content: content,
      rs_version: version,
    })
  }

  public buildGetRichSchemaObjectByIdRequest(options: GetRichSchemaObjectByIdRequestOptions) {
    const { submitterDid, id } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.build_get_rich_schema_object_by_id_request({
      submitter_did: submitterDid,
      rs_id: id,
    })
  }

  public buildGetRichSchemaObjectByMetadataRequest(options: GetRichSchemaObjectByMetadataRequestOptions) {
    const { submitterDid, version, name, type } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.build_get_rich_schema_object_by_metadata_request({
      submitter_did: submitterDid,
      rs_name: name,
      rs_type: type,
      rs_version: version,
    })
  }

  public poolCreate(options: PoolCreateOptions) {
    if (!options.parameters.transactions && !options.parameters.transactions_path)
      throw new Error('Either transactions or transactions_path must be supplied')

    const { parameters } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.pool_create({
      params: parameters,
    })
  }

  public async poolRefresh(handle: number) {
    return this.promisify((cb) =>
      this.nativeIndyVdr.pool_refresh({
        pool_handle: handle,
        cb,
      })
    )
  }

  public async poolGetStatus(handle: number) {
    return this.promisifyWithResponse<PoolStatus>((cb) =>
      this.nativeIndyVdr.pool_get_status({
        pool_handle: handle,
        cb,
      })
    )
  }

  public async poolGetTransactions(handle: number) {
    return this.promisifyWithResponse<Transactions>(
      (cb) =>
        this.nativeIndyVdr.pool_get_transactions({
          pool_handle: handle,
          cb,
        }),
      true
    )
  }

  public async poolGetVerfiers(handle: number) {
    return this.promisifyWithResponse<Verifiers>((cb) =>
      this.nativeIndyVdr.pool_get_verifiers({
        pool_handle: handle,
        cb,
      })
    )
  }

  public async poolSubmitAction(handle: number, options: PoolSubmitActionOptions) {
    const { requestHandle, nodes, timeout } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.promisifyWithResponse<SubmitAction>((cb) =>
      this.nativeIndyVdr.pool_submit_action({
        pool_handle: handle,
        request_handle: requestHandle,
        nodes,
        timeout,
        cb,
      })
    )
  }

  public async poolSubmitRequest(handle: number, options: PoolSubmitRequestOptions) {
    const { requestHandle } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.promisifyWithResponse<SubmitRequest>((cb) =>
      this.nativeIndyVdr.pool_submit_request({
        pool_handle: handle,
        request_handle: requestHandle,
        cb,
      })
    )
  }

  public poolClose(handle: number) {
    return this.nativeIndyVdr.pool_close({
      pool_handle: handle,
    })
  }

  public prepareTxnAuthorAgreementAcceptance(options: PrepareTxnAuthorAgreementAcceptanceOptions) {
    const { time, accMechType, text, version, taaDigest } = serializeArguments(options) as SerializedOptions<
      typeof options
    >

    return this.nativeIndyVdr.prepare_txn_author_agreement_acceptance({
      time,
      text,
      version,
      acc_mech_type: accMechType,
      taa_digest: taaDigest,
    })
  }

  public requestFree(handle: number) {
    return this.nativeIndyVdr.request_free({
      request_handle: handle,
    })
  }

  public requestGetBody<T extends Record<string, unknown>>(handle: number): T {
    return JSON.parse(
      this.nativeIndyVdr.request_get_body({
        request_handle: handle,
      })
    )
  }

  public requestGetSignatureInput(handle: number) {
    return this.nativeIndyVdr.request_get_signature_input({
      request_handle: handle,
    })
  }

  public requestSetEndorser(handle: number, options: RequestSetEndorserOptions) {
    const { endorser } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.request_set_endorser({
      request_handle: handle,
      endorser,
    })
  }

  public requestSetMultiSignature(handle: number, options: RequestSetMultiSignatureOptions) {
    const { signature, signatureLen, identifier } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.request_set_multi_signature({
      request_handle: handle,
      identifier,
      signature,
      signature_len: signatureLen,
    })
  }

  public requestSetSignature(handle: number, options: RequestSetSignatureOptions) {
    const { signature, signatureLen } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.request_set_signature({
      request_handle: handle,
      signature,
      signature_len: signatureLen,
    })
  }

  public requestSetTxnAuthorAgreementAcceptance(
    handle: number,
    options: RequestSetTxnAuthorAgreementAcceptanceOptions
  ) {
    const { acceptance } = serializeArguments(options) as SerializedOptions<typeof options>

    return this.nativeIndyVdr.request_set_txn_author_agreement_acceptance({
      request_handle: handle,
      acceptance,
    })
  }
}
