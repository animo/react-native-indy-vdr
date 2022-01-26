import type {
  Callback,
  CallbackWithResponse,
  IndyVdrNativeBindings,
} from './IIndyVdr';
import {
  serializeArguments,
  SerializedOptions,
} from './utils/convertArguments';

declare var _indy_vdr: IndyVdrNativeBindings;
const NativeIndyVdr = _indy_vdr as IndyVdrNativeBindings;

// TODO: proper documentation
class IndyVdr {
  // TODO: how do we generate a handle
  //       how many handles do we need?
  private handle: number = 0;
  private poolHandle: number = 0;

  get getHandle() {
    return this.handle;
  }

  get getPoolHandle() {
    return this.poolHandle;
  }

  public version() {
    return NativeIndyVdr.version();
  }

  public setConfig(options: { config: Record<string, unknown> }) {
    const { config } = serializeArguments(options) as SerializedOptions<
      typeof options
    >;

    NativeIndyVdr.set_config({ config });
  }

  // TODO: this causes rust to panic. How do we deal with this
  public setDefaultLogger() {
    NativeIndyVdr.set_default_logger();
  }

  // TODO: indyvdr allows any u64 number to be a protocol version. Is this correct?
  public setProtocolVersion(options: { version: number }) {
    const { version } = serializeArguments(options) as SerializedOptions<
      typeof options
    >;

    NativeIndyVdr.set_protocol_version({ version });
  }

  public setSocksProxy(options: { socksProxy: string }) {
    const { socksProxy } = serializeArguments(options) as SerializedOptions<
      typeof options
    >;

    NativeIndyVdr.set_socks_proxy({ socks_proxy: socksProxy });
  }

  // TODO: typing of aml
  public buildAcceptanceMechanismsRequest(options: {
    submitterDid: string;
    aml: Record<string, unknown>;
    version: string;
    amlContext?: string;
  }) {
    const { version, aml, submitterDid, amlContext } = serializeArguments(
      options
    ) as SerializedOptions<typeof options>;

    this.handle = NativeIndyVdr.build_acceptance_mechanisms_request({
      submitter_did: submitterDid,
      aml,
      version,
      aml_context: amlContext,
      handle_p: this.handle,
    });
  }

  // TODO: version and timestamp collide
  public buildGetAcceptanceMechanismsRequest(options: {
    timestamp?: Date;
    submitterDid?: string;
    version?: string;
  }) {
    const { version, timestamp, submitterDid } = serializeArguments(
      options
    ) as SerializedOptions<typeof options>;

    this.handle = NativeIndyVdr.build_get_acceptance_mechanisms_request({
      submitter_did: submitterDid,
      timestamp: timestamp?.valueOf(),
      version: version,
      handle_p: this.handle,
    });
  }

  public buildAttribRequest(options: {
    submitterDid: string;
    targetDid: string;
    hash?: string;
    raw?: Record<string, unknown>;
    enc?: string;
  }) {
    const { submitterDid, targetDid, hash, raw, enc } = serializeArguments(
      options
    ) as SerializedOptions<typeof options>;

    this.handle = NativeIndyVdr.build_attrib_request({
      submitter_did: submitterDid,
      enc,
      raw,
      hash,
      handle_p: this.handle,
      target_did: targetDid,
    });
  }

  public buildGetAttribRequest(options: {
    submitterDid?: string;
    targetDid: string;
    hash?: string;
    raw?: Record<string, unknown>;
    enc?: string;
  }) {
    const { submitterDid, targetDid, hash, raw, enc } = serializeArguments(
      options
    ) as SerializedOptions<typeof options>;

    this.handle = NativeIndyVdr.build_get_attrib_request({
      submitter_did: submitterDid,
      enc,
      raw,
      hash,
      handle_p: this.handle,
      target_did: targetDid,
    });
  }

  public buildCredDefRequest(options: {
    submitterDid: string;
    credDef: Record<string, unknown>;
  }) {
    const { credDef, submitterDid } = serializeArguments(
      options
    ) as SerializedOptions<typeof options>;

    this.handle = NativeIndyVdr.build_cred_def_request({
      submitter_did: submitterDid,
      cred_def: credDef,
      handle_p: this.handle,
    });
  }

  public buildGetCredDefRequest(options: {
    submitterDid?: string;
    credDefId: string;
  }) {
    const { submitterDid, credDefId } = serializeArguments(
      options
    ) as SerializedOptions<typeof options>;

    this.handle = NativeIndyVdr.build_get_cred_def_request({
      submitter_did: submitterDid,
      cred_def_id: credDefId,
      handle_p: this.handle,
    });
  }
  public buildGetRevocRegDefRequest(options: {
    submitterDid?: string;
    revocRegId: string;
  }) {
    const { revocRegId, submitterDid } = serializeArguments(
      options
    ) as SerializedOptions<typeof options>;

    this.handle = NativeIndyVdr.build_get_revoc_reg_def_request({
      submitter_did: submitterDid,
      revoc_reg_id: revocRegId,
      handle_p: this.handle,
    });
  }

  public buildGetRevocRegRequest(options: {
    submitterDid?: string;
    revocRegId: string;
    timestamp: Date;
  }) {
    const { submitterDid, timestamp, revocRegId } = serializeArguments(
      options
    ) as SerializedOptions<typeof options>;

    this.handle = NativeIndyVdr.build_get_revoc_reg_request({
      submitter_did: submitterDid,
      revoc_reg_id: revocRegId,
      timestamp: timestamp.valueOf(),
      handle_p: this.handle,
    });
  }

  public buildGetRevocRegDeltaRequest(options: {
    submitterDid?: string;
    revocRegId: string;
    fromTs?: number;
    toTs: number;
  }) {
    const { submitterDid, revocRegId, fromTs, toTs } = serializeArguments(
      options
    ) as SerializedOptions<typeof options>;

    this.handle = NativeIndyVdr.build_get_revoc_reg_delta_request({
      submitter_did: submitterDid,
      revoc_reg_id: revocRegId,
      from_ts: fromTs,
      to_ts: toTs,
      handle_p: this.handle,
    });
  }

  public buildRevocRegDefRequest(options: {
    submitterDid?: string;
    revocRegId: string;
  }) {
    const { submitterDid, revocRegId } = serializeArguments(
      options
    ) as SerializedOptions<typeof options>;

    this.handle = NativeIndyVdr.build_get_revoc_reg_def_request({
      submitter_did: submitterDid,
      revoc_reg_id: revocRegId,
      handle_p: this.handle,
    });
  }

  public buildCustomRequest(options: { requestJson: Record<string, unknown> }) {
    const { requestJson } = serializeArguments(options) as SerializedOptions<
      typeof options
    >;

    this.handle = NativeIndyVdr.build_custom_request({
      request_json: requestJson,
      handle_p: this.handle,
    });
  }

  public buildDisableAllTxnAuthorAgreementsRequest(options: {
    submitterDid: string;
  }) {
    const { submitterDid } = serializeArguments(options) as SerializedOptions<
      typeof options
    >;

    this.handle = NativeIndyVdr.build_disable_all_txn_author_agreements_request(
      {
        submitter_did: submitterDid,
        handle_p: this.handle,
      }
    );
  }

  public buildGetNymRequest(options: { submitterDid?: string; dest: string }) {
    const { submitterDid, dest } = serializeArguments(
      options
    ) as SerializedOptions<typeof options>;

    this.handle = NativeIndyVdr.build_get_nym_request({
      submitter_did: submitterDid,
      dest,
      handle_p: this.handle,
    });
  }

  public buildGetSchemaRequest(options: {
    submitterDid?: string;
    schemaId: string;
  }) {
    const { submitterDid, schemaId } = serializeArguments(
      options
    ) as SerializedOptions<typeof options>;

    this.handle = NativeIndyVdr.build_get_schema_request({
      submitter_did: submitterDid,
      schema_id: schemaId,
      handle_p: this.handle,
    });
  }

  public buildGetTxnAuthorAgreementRequest(options: {
    submitterDid?: string;
    data?: string;
  }) {
    const { submitterDid, data } = serializeArguments(
      options
    ) as SerializedOptions<typeof options>;

    this.handle = NativeIndyVdr.build_get_txn_author_agreement_request({
      submitter_did: submitterDid,
      data,
      handle_p: this.handle,
    });
  }

  public buildGetTxnRequest(options: {
    submitterDid?: string;
    ledgerType: number;
    seqNo: number;
  }) {
    const { submitterDid, seqNo, ledgerType } = serializeArguments(
      options
    ) as SerializedOptions<typeof options>;

    this.handle = NativeIndyVdr.build_get_txn_request({
      submitter_did: submitterDid,
      ledger_type: ledgerType,
      seq_no: seqNo,
      handle_p: this.handle,
    });
  }

  public buildGetValidatorInfoRequest(options: {
    submitterDid: string;
    seqNo: number;
  }) {
    const { submitterDid } = serializeArguments(options) as SerializedOptions<
      typeof options
    >;

    this.handle = NativeIndyVdr.build_get_validator_info_request({
      submitter_did: submitterDid,
      handle_p: this.handle,
    });
  }

  public buildNymRequest(options: {
    submitterDid: string;
    dest: string;
    verkey?: string;
    alias?: string;
    role?: string;
  }) {
    const { submitterDid, dest, role, alias, verkey } = serializeArguments(
      options
    ) as SerializedOptions<typeof options>;

    this.handle = NativeIndyVdr.build_nym_request({
      submitter_did: submitterDid,
      dest,
      role,
      alias,
      verkey,
      handle_p: this.handle,
    });
  }

  public buildRevocRegEntryRequest(options: {
    submitterDid: string;
    revocRegDefId: string;
    revocRegDefType: string;
    revocRegEntry: string;
  }) {
    const { submitterDid, revocRegEntry, revocRegDefType, revocRegDefId } =
      serializeArguments(options) as SerializedOptions<typeof options>;

    this.handle = NativeIndyVdr.build_revoc_reg_entry_request({
      submitter_did: submitterDid,
      revoc_reg_entry: revocRegEntry,
      revoc_reg_def_id: revocRegDefId,
      revoc_reg_def_type: revocRegDefType,
      handle_p: this.handle,
    });
  }

  public buildSchemaRequest(options: {
    submitterDid: string;
    schema: Record<string, unknown>;
  }) {
    const { submitterDid, schema } = serializeArguments(
      options
    ) as SerializedOptions<typeof options>;

    console.log(typeof schema);

    this.handle = NativeIndyVdr.build_schema_request({
      submitter_did: submitterDid,
      schema,
      handle_p: this.handle,
    });
  }

  public buildTxnAuthorAgreementRequest(options: {
    submitterDid: string;
    text?: string;
    version: string;
    ratificationTs?: number;
    retirementTs?: number;
  }) {
    const { submitterDid, version, text, retirementTs, ratificationTs } =
      serializeArguments(options) as SerializedOptions<typeof options>;

    this.handle = NativeIndyVdr.build_txn_author_agreement_request({
      submitter_did: submitterDid,
      text,
      version,
      ratification_ts: ratificationTs,
      retirement_ts: retirementTs,
      handle_p: this.handle,
    });
  }

  public buildRichSchemaRequest(options: {
    submitterDid: string;
    rsId: string;
    rsContent: string;
    rsName: string;
    rsVersion: string;
    rsType: string;
    ver: string;
  }) {
    const { submitterDid, ver, rsType, rsVersion, rsName, rsContent, rsId } =
      serializeArguments(options) as SerializedOptions<typeof options>;

    this.handle = NativeIndyVdr.build_rich_schema_request({
      submitter_did: submitterDid,
      ver,
      rs_id: rsId,
      rs_name: rsName,
      rs_type: rsType,
      rs_content: rsContent,
      rs_version: rsVersion,
      handle_p: this.handle,
    });
  }

  public buildGetRichSchemaObjectByIdRequest(options: {
    submitterDid: string;
    rsId: string;
  }) {
    const { submitterDid, rsId } = serializeArguments(
      options
    ) as SerializedOptions<typeof options>;

    this.handle = NativeIndyVdr.build_get_rich_schema_object_by_id_request({
      submitter_did: submitterDid,
      rs_id: rsId,
      handle_p: this.handle,
    });
  }

  public buildGetRichSchemaObjectByMetadataRequest(options: {
    submitterDid: string;
    rsType: string;
    rsName: string;
    rsVersion: string;
  }) {
    const { submitterDid, rsVersion, rsName, rsType } = serializeArguments(
      options
    ) as SerializedOptions<typeof options>;

    this.handle =
      NativeIndyVdr.build_get_rich_schema_object_by_metadata_request({
        submitter_did: submitterDid,
        rs_name: rsName,
        rs_type: rsType,
        rs_version: rsVersion,
        handle_p: this.handle,
      });
  }

  // TODO: params from the serializedArguments does not seem to be serialized.
  //       how is this going wrong?
  public poolCreate(options: { params: Record<string, unknown> }) {
    const { params } = serializeArguments(options) as SerializedOptions<
      typeof options
    >;

    this.poolHandle = NativeIndyVdr.pool_create({
      params,
      handle_p: this.poolHandle,
    });
  }

  public poolRefresh(options: { cb: Callback }) {
    const { cb } = serializeArguments(options) as SerializedOptions<
      typeof options
    >;

    this.poolHandle = NativeIndyVdr.pool_refresh({
      pool_handle: this.poolHandle,
      cb,
    });
  }

  public poolGetStatus(options: { cb: CallbackWithResponse }) {
    const { cb } = serializeArguments(options) as SerializedOptions<
      typeof options
    >;

    this.poolHandle = NativeIndyVdr.pool_get_status({
      pool_handle: this.poolHandle,
      cb,
    });
  }

  public poolGetTransactions(options: { cb: CallbackWithResponse }) {
    const { cb } = serializeArguments(options) as SerializedOptions<
      typeof options
    >;

    this.poolHandle = NativeIndyVdr.pool_get_transactions({
      pool_handle: this.poolHandle,
      cb,
    });
  }

  public poolGetVerfiers(options: { cb: CallbackWithResponse }) {
    const { cb } = serializeArguments(options) as SerializedOptions<
      typeof options
    >;

    this.poolHandle = NativeIndyVdr.pool_get_verifiers({
      pool_handle: this.poolHandle,
      cb,
    });
  }

  public poolSubmitAction(options: {
    nodes?: string;
    timeout?: number;
    cb: CallbackWithResponse;
  }) {
    const { cb, nodes, timeout } = serializeArguments(
      options
    ) as SerializedOptions<typeof options>;

    this.poolHandle = NativeIndyVdr.pool_submit_action({
      pool_handle: this.poolHandle,
      request_handle: this.handle,
      nodes,
      timeout,
      cb,
    });
  }

  public poolSubmitRequest(options: { cb: CallbackWithResponse }) {
    const { cb } = serializeArguments(options) as SerializedOptions<
      typeof options
    >;

    this.poolHandle = NativeIndyVdr.pool_submit_request({
      pool_handle: this.poolHandle,
      request_handle: this.handle,
      cb,
    });
  }

  public poolClose() {
    this.poolHandle = NativeIndyVdr.pool_close({
      pool_handle: this.poolHandle,
    });
  }

  // TODO: is output_p like handle_p
  public prepareTxnAuthorAgreementAcceptance(options: {
    text?: string;
    version?: string;
    taaDigest?: string;
    accMechType: string;
    time: number;
    outputP: string;
  }) {
    const { outputP, time, accMechType, text, version, taaDigest } =
      serializeArguments(options) as SerializedOptions<typeof options>;

    this.handle = NativeIndyVdr.prepare_txn_author_agreement_acceptance({
      time,
      text,
      version,
      output_p: outputP,
      acc_mech_type: accMechType,
      taa_digest: taaDigest,
    });
  }

  // TODO: check requesthandle
  public requestFree() {
    this.handle = NativeIndyVdr.request_free({
      request_handle: this.handle,
    });
  }

  // TODO: check body
  public requestGetBody() {
    return NativeIndyVdr.request_get_body({
      request_handle: this.handle,
    });
  }

  public requestGetSignatureInput() {
    return NativeIndyVdr.request_get_signature_input({
      request_handle: this.handle,
    });
  }

  public requestSetEndorser(options: { endorser: string }) {
    const { endorser } = serializeArguments(options) as SerializedOptions<
      typeof options
    >;

    this.handle = NativeIndyVdr.request_set_endorser({
      request_handle: this.handle,
      endorser,
    });
  }

  public requestSetMultiSignature(options: {
    identifier: string;
    signature: number;
    signatureLen: number;
  }) {
    const { signature, signatureLen, identifier } = serializeArguments(
      options
    ) as SerializedOptions<typeof options>;

    this.handle = NativeIndyVdr.request_set_multi_signature({
      request_handle: this.handle,
      identifier,
      signature,
      signature_len: signatureLen,
    });
  }

  // TODO: why is the sig a number here
  public requestSetSignature(options: {
    signature: number;
    signatureLen: number;
  }) {
    const { signature, signatureLen } = serializeArguments(
      options
    ) as SerializedOptions<typeof options>;

    this.handle = NativeIndyVdr.request_set_signature({
      request_handle: this.handle,
      signature,
      signature_len: signatureLen,
    });
  }

  public requestSetTxnAuthorAgreementAcceptance(options: {
    acceptance: string;
  }) {
    const { acceptance } = serializeArguments(options) as SerializedOptions<
      typeof options
    >;

    this.handle = NativeIndyVdr.request_set_txn_author_agreement_acceptance({
      request_handle: this.handle,
      acceptance,
    });
  }
}

export { IndyVdr, NativeIndyVdr };
