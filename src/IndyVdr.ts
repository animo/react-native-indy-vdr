import type {
  Callback,
  CallbackWithResponse,
  IndyVdrNativeBindings,
} from './IIndyVdr';
import {
  serializeArguments,
  SerializedArguments,
} from './utils/convertArguments';

declare var _indy_vdr: IndyVdrNativeBindings;
const NativeIndyVdr = _indy_vdr as IndyVdrNativeBindings;

// TODO: proper documentation
class IndyVdr {
  // TODO: how do we generate a handle
  private handle: number = 0;

  get getHandle() {
    return this.handle;
  }

  public version() {
    return NativeIndyVdr.version();
  }

  public setConfig(options: { config: Record<string, unknown> }) {
    const { config } = serializeArguments(options) as SerializedArguments<
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
    const { version } = serializeArguments(options) as SerializedArguments<
      typeof options
    >;

    NativeIndyVdr.set_protocol_version({ version });
  }

  public setSocksProxy(options: { socksProxy: string }) {
    const { socksProxy } = serializeArguments(options) as SerializedArguments<
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
    ) as SerializedArguments<typeof options>;

    this.handle = NativeIndyVdr.build_acceptance_mechanisms_request({
      submitter_did: submitterDid,
      aml: aml,
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
    ) as SerializedArguments<typeof options>;

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
    ) as SerializedArguments<typeof options>;

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
    ) as SerializedArguments<typeof options>;

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
    ) as SerializedArguments<typeof options>;

    this.handle = NativeIndyVdr.build_cred_def_request({
      submitter_did: submitterDid,
      cred_def: credDef,
      handle_p: this.handle,
    });
  }

  public buildGetCredDefRequest(options: {
    submittedDid?: string;
    credDefId: string;
  }) {
    const { submittedDid, credDefId } = serializeArguments(
      options
    ) as SerializedArguments<typeof options>;

    this.handle = NativeIndyVdr.build_get_cred_def_request({
      submitter_did: submittedDid,
      cred_def_id: credDefId,
      handle_p: this.handle,
    });
  }
  public buildGetRevocRefDefRequest(options: {
    submittedDid?: string;
    revocRegId: string;
  }) {
    const { revocRegId, submittedDid } = serializeArguments(
      options
    ) as SerializedArguments<typeof options>;

    this.handle = NativeIndyVdr.build_get_revoc_reg_def_request({
      submitter_did: submittedDid,
      revoc_reg_id: revocRegId,
      handle_p: this.handle,
    });
  }

  public buildGetRevocRefRequest(options: {
    submittedDid?: string;
    revocRegId: string;
    timestamp: Date;
  }) {
    const { submittedDid, timestamp, revocRegId } = serializeArguments(
      options
    ) as SerializedArguments<typeof options>;

    this.handle = NativeIndyVdr.build_get_revoc_reg_request({
      submitter_did: submittedDid,
      revoc_reg_id: revocRegId,
      timestamp: timestamp.valueOf(),
      handle_p: this.handle,
    });
  }

  public buildGetRevocRefDeltaRequest(options: {
    submittedDid?: string;
    revocRegId: string;
    fromTs?: number;
    toTs: number;
  }) {
    const { submittedDid, revocRegId, fromTs, toTs } = serializeArguments(
      options
    ) as SerializedArguments<typeof options>;

    this.handle = NativeIndyVdr.build_get_revoc_reg_delta_request({
      submitter_did: submittedDid,
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
    ) as SerializedArguments<typeof options>;

    this.handle = NativeIndyVdr.build_get_revoc_reg_def_request({
      submitter_did: submitterDid,
      revoc_reg_id: revocRegId,
      handle_p: this.handle,
    });
  }

  public buildcustomrequest(options: { requestJson: Record<string, unknown> }) {
    const { requestJson } = serializeArguments(options) as SerializedArguments<
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
    const { submitterDid } = serializeArguments(options) as SerializedArguments<
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
    ) as SerializedArguments<typeof options>;

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
    ) as SerializedArguments<typeof options>;

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
    ) as SerializedArguments<typeof options>;

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
    ) as SerializedArguments<typeof options>;

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
    const { submitterDid } = serializeArguments(options) as SerializedArguments<
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
    ) as SerializedArguments<typeof options>;

    this.handle = NativeIndyVdr.build_nym_request({
      submitter_did: submitterDid,
      dest,
      role,
      alias,
      verkey,
      handle_p: this.handle,
    });
  }

  public buildRevocReqEntryRequest(options: {
    submitterDid: string;
    revocRegDefId: string;
    revocRegDefType: string;
    revocRegEntry: string;
  }) {
    const { submitterDid, revocRegEntry, revocRegDefType, revocRegDefId } =
      serializeArguments(options) as SerializedArguments<typeof options>;

    this.handle = NativeIndyVdr.build_revoc_reg_entry_request({
      submitter_did: submitterDid,
      revoc_reg_entry: revocRegEntry,
      revoc_reg_def_id: revocRegDefId,
      revoc_reg_def_type: revocRegDefType,
      handle_p: this.handle,
    });
  }

  public buildSchemaRequest(options: { submitterDid: string; schema: string }) {
    const { submitterDid, schema } = serializeArguments(
      options
    ) as SerializedArguments<typeof options>;

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
      serializeArguments(options) as SerializedArguments<typeof options>;

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
      serializeArguments(options) as SerializedArguments<typeof options>;

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
    ) as SerializedArguments<typeof options>;

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
    ) as SerializedArguments<typeof options>;

    this.handle =
      NativeIndyVdr.build_get_rich_schema_object_by_metadata_request({
        submitter_did: submitterDid,
        rs_name: rsName,
        rs_type: rsType,
        rs_version: rsVersion,
        handle_p: this.handle,
      });
  }

  public poolCreate(options: { params: string }) {
    const { params } = serializeArguments(options) as SerializedArguments<
      typeof options
    >;

    this.handle = NativeIndyVdr.pool_create({
      params,
      handle_p: this.handle,
    });
  }

  // TODO: callback needs mapped typing
  //       is poolhandle like handle_p?
  public poolRefresh(options: {
    poolHandle: number;
    cb?: Callback;
    cbId: number;
  }) {
    const { poolHandle, cb, cbId } = serializeArguments(
      options
    ) as SerializedArguments<typeof options>;

    this.handle = NativeIndyVdr.pool_refresh({
      cb_id: cbId,
      pool_handle: poolHandle,
      cb,
    });
  }

  public poolGetStatus(options: {
    poolHandle: number;
    cb?: CallbackWithResponse;
    cbId: number;
  }) {
    const { poolHandle, cb, cbId } = serializeArguments(
      options
    ) as SerializedArguments<typeof options>;

    this.handle = NativeIndyVdr.pool_get_status({
      cb_id: cbId,
      pool_handle: poolHandle,
      cb,
    });
  }

  public poolGetTransactions(options: {
    poolHandle: number;
    cb?: CallbackWithResponse;
    cbId: number;
  }) {
    const { poolHandle, cb, cbId } = serializeArguments(
      options
    ) as SerializedArguments<typeof options>;

    this.handle = NativeIndyVdr.pool_get_transactions({
      cb_id: cbId,
      pool_handle: poolHandle,
      cb,
    });
  }

  public poolGetVerfiers(options: {
    poolHandle: number;
    cb?: CallbackWithResponse;
    cbId: number;
  }) {
    const { poolHandle, cb, cbId } = serializeArguments(
      options
    ) as SerializedArguments<typeof options>;

    this.handle = NativeIndyVdr.pool_get_verifiers({
      cb_id: cbId,
      pool_handle: poolHandle,
      cb,
    });
  }

  public poolSubmitAction(options: {
    poolHandle: number;
    requestHandle: number;
    nodes?: string;
    timeout?: number;
    cb?: CallbackWithResponse;
    cbId: number;
  }) {
    const { poolHandle, cb, cbId, requestHandle, nodes, timeout } =
      serializeArguments(options) as SerializedArguments<typeof options>;

    this.handle = NativeIndyVdr.pool_submit_action({
      cb_id: cbId,
      pool_handle: poolHandle,
      request_handle: requestHandle,
      nodes,
      timeout,
      cb,
    });
  }

  public poolClose(options: { poolHandle: number }) {
    const { poolHandle } = serializeArguments(options) as SerializedArguments<
      typeof options
    >;

    this.handle = NativeIndyVdr.pool_close({
      pool_handle: poolHandle,
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
      serializeArguments(options) as SerializedArguments<typeof options>;

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
  public requestFree(options: { requestHandle: number }) {
    const { requestHandle } = serializeArguments(
      options
    ) as SerializedArguments<typeof options>;

    this.handle = NativeIndyVdr.request_free({ request_handle: requestHandle });
  }

  // TODO: check body
  public requestGetBody(options: { requestHandle: number; bodyP: string }) {
    const { requestHandle, bodyP } = serializeArguments(
      options
    ) as SerializedArguments<typeof options>;

    this.handle = NativeIndyVdr.request_get_body({
      request_handle: requestHandle,
      body_p: bodyP,
    });
  }

  public requestGetSignatureInput(options: {
    requestHandle: number;
    inputP: string;
  }) {
    const { requestHandle, inputP } = serializeArguments(
      options
    ) as SerializedArguments<typeof options>;

    this.handle = NativeIndyVdr.request_get_signature_input({
      request_handle: requestHandle,
      input_p: inputP,
    });
  }

  public requestSetEndorser(options: {
    requestHandle: number;
    endorser: string;
  }) {
    const { requestHandle, endorser } = serializeArguments(
      options
    ) as SerializedArguments<typeof options>;

    this.handle = NativeIndyVdr.request_set_endorser({
      request_handle: requestHandle,
      endorser,
    });
  }

  public requestSetMultiSignature(options: {
    requestHandle: number;
    identifier: string;
    signature: string;
    signatureLen: number;
  }) {
    const { requestHandle, signature, signatureLen, identifier } =
      serializeArguments(options) as SerializedArguments<typeof options>;

    this.handle = NativeIndyVdr.request_set_multi_signature({
      request_handle: requestHandle,
      identifier,
      signature,
      signature_len: signatureLen,
    });
  }

  // TODO: why is the sig a number here
  public requestSetSignature(options: {
    requestHandle: number;
    signature: number;
    signatureLen: number;
  }) {
    const { requestHandle, signature, signatureLen } = serializeArguments(
      options
    ) as SerializedArguments<typeof options>;

    this.handle = NativeIndyVdr.request_set_signature({
      request_handle: requestHandle,
      signature,
      signature_len: signatureLen,
    });
  }

  public requestSetTxnAuthorAgreementAcceptance(options: {
    requestHandle: number;
    acceptance: string;
  }) {
    const { requestHandle, acceptance } = serializeArguments(
      options
    ) as SerializedArguments<typeof options>;

    this.handle = NativeIndyVdr.request_set_txn_author_agreement_acceptance({
      request_handle: requestHandle,
      acceptance,
    });
  }
}

export { IndyVdr, NativeIndyVdr };
