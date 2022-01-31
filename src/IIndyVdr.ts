// TODO: async
export type Callback = (err: number) => void;

// TODO: deserialize the response
export type CallbackWithResponse = (err: number, response: string) => void;

export type IndyVdrNativeBindings = {
  version(): string;

  get_current_error(): string;

  set_config(options: { config: string }): void;

  set_default_logger(): void;

  set_protocol_version(options: { version: number }): void;

  set_socks_proxy(options: { socks_proxy: string }): void;

  build_acceptance_mechanisms_request(options: {
    submitter_did: string;
    aml: string;
    version: string;
    aml_context?: string;
    handle_p: number;
  }): number;

  build_get_acceptance_mechanisms_request(options: {
    submitter_did?: string;
    timestamp?: number;
    version?: string;
    handle_p: number;
  }): number;

  build_attrib_request(options: {
    submitter_did: string;
    target_did: string;
    hash?: string;
    raw?: string;
    enc?: string;
    handle_p: number;
  }): number;

  build_get_attrib_request(options: {
    submitter_did?: string;
    target_did: string;
    raw?: string;
    hash?: string;
    enc?: string;
    handle_p: number;
  }): number;

  build_cred_def_request(options: {
    submitter_did: string;
    cred_def: string;
    handle_p: number;
  }): number;

  build_get_cred_def_request(options: {
    submitter_did?: string;
    cred_def_id: string;
    handle_p: number;
  }): number;

  build_get_revoc_reg_def_request(options: {
    submitter_did?: string;
    revoc_reg_id: string;
    handle_p: number;
  }): number;

  build_get_revoc_reg_request(options: {
    submitter_did?: string;
    revoc_reg_id: string;
    timestamp: number;
    handle_p: number;
  }): number;

  build_get_revoc_reg_delta_request(options: {
    submitter_did?: string;
    revoc_reg_id: string;
    from_ts?: number;
    to_ts: number;
    handle_p: number;
  }): number;

  build_revoc_reg_def_request(options: {
    submitter_did: string;
    revoc_reg_def: string;
    handle_p: number;
  }): number;

  build_custom_request(options: {
    request_json: string;
    handle_p: number;
  }): number;

  build_disable_all_txn_author_agreements_request(options: {
    submitter_did: string;
    handle_p: number;
  }): number;

  build_get_nym_request(options: {
    submitter_did?: string;
    dest: string;
    handle_p: number;
  }): number;

  build_get_schema_request(options: {
    submitter_did?: string;
    schema_id: string;
    handle_p: number;
  }): number;

  build_get_txn_author_agreement_request(options: {
    submitter_did?: string;
    data?: string;
    handle_p: number;
  }): number;

  build_get_txn_request(options: {
    submitter_did?: string;
    ledger_type: number;
    seq_no: number;
    handle_p: number;
  }): number;

  build_get_validator_info_request(options: {
    submitter_did: string;
    handle_p: number;
  }): number;

  build_nym_request(options: {
    submitter_did: string;
    dest: string;
    verkey?: string;
    alias?: string;
    role?: string;
    handle_p: number;
  }): number;

  build_revoc_reg_entry_request(options: {
    submitter_did: string;
    revoc_reg_def_id: string;
    revoc_reg_def_type: string;
    revoc_reg_entry: string;
    handle_p: number;
  }): number;

  build_schema_request(options: {
    submitter_did: string;
    schema: string;
    handle_p: number;
  }): number;

  build_txn_author_agreement_request(options: {
    submitter_did: string;
    text?: string;
    version: string;
    ratification_ts?: number;
    retirement_ts?: number;
    handle_p: number;
  }): number;

  build_rich_schema_request(options: {
    submitter_did: string;
    rs_id: string;
    rs_content: string;
    rs_name: string;
    rs_version: string;
    rs_type: string;
    ver: string;
    handle_p: number;
  }): number;

  build_get_rich_schema_object_by_id_request(options: {
    submitter_did: string;
    rs_id: string;
    handle_p: number;
  }): number;

  build_get_rich_schema_object_by_metadata_request(options: {
    submitter_did: string;
    rs_type: string;
    rs_name: string;
    rs_version: string;
    handle_p: number;
  }): number;

  pool_create(options: { params: string; handle_p: number }): number;

  pool_refresh(options: { pool_handle: number; cb: Callback }): number;

  // TODO: what is the type of the response
  pool_get_status(options: {
    pool_handle: number;
    cb: CallbackWithResponse;
  }): number;

  // TODO: what is the type of the response
  pool_get_transactions(options: {
    pool_handle: number;
    cb: CallbackWithResponse;
  }): number;

  // TODO: what is the type of the response
  pool_get_verifiers(options: {
    pool_handle: number;
    cb: CallbackWithResponse;
  }): number;

  // TODO: what is the type of the response
  pool_submit_action(options: {
    pool_handle: number;
    request_handle: number;
    nodes?: string;
    timeout?: number;
    cb: CallbackWithResponse;
  }): number;

  // TODO: what is the type of the response
  pool_submit_request(options: {
    pool_handle: number;
    request_handle: number;
    cb: CallbackWithResponse;
  }): number;

  pool_close(options: { pool_handle: number }): number;

  prepare_txn_author_agreement_acceptance(options: {
    text?: string;
    version?: string;
    taa_digest?: string;
    acc_mech_type: string;
    time: number;
  }): string;

  request_free(options: { request_handle: number }): number;

  request_get_body(options: { request_handle: number }): string;

  request_get_signature_input(options: { request_handle: number }): string;

  request_set_endorser(options: {
    request_handle: number;
    endorser: string;
  }): number;

  request_set_multi_signature(options: {
    request_handle: number;
    identifier: string;
    signature: number;
    signature_len: number;
  }): number;

  request_set_signature(options: {
    request_handle: number;
    signature: number;
    signature_len: number;
  }): number;

  request_set_txn_author_agreement_acceptance(options: {
    request_handle: number;
    acceptance: string;
  }): number;
};
