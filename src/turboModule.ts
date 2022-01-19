import { TurboModule, TurboModuleRegistry } from 'react-native-tscodegen-types';

// types
type FfiStr = string;
type uintptr_t = number;
//type ErrorCode = number;
//type Str = string;
type int64_t = number;
//type uint64_t = number;
//type int32_t = number;
//type uint8_t = number;

export interface NativeIndyVdrBindings extends TurboModule {
  version(): string;
  set_config(options: { config: FfiStr }): void;
  set_default_logger(): void;
  set_protocol_version(options: { version: uintptr_t }): void;
  set_socks_proxy(options: { socks_proxy: FfiStr }): void;
  build_acceptance_mechanisms_request(options: {
    submitter_did: FfiStr;
    aml: FfiStr;
    version: FfiStr;
    aml_context?: FfiStr;
    handle_p: uintptr_t;
  }): number;

  build_get_acceptance_mechanisms_request(options: {
    submitter_did?: FfiStr;
    timestamp?: int64_t;
    version?: FfiStr;
    handle_p: uintptr_t;
  }): number;

  //build_attrib_request(
  //submitter_did: FfiStr,
  //target_did: FfiStr,
  //hash: FfiStr,
  //raw: FfiStr,
  //enc: FfiStr,
  //handle_p: uintptr_t
  //): ErrorCode;

  //build_get_attrib_request(
  //submitter_did: FfiStr,
  //target_did: FfiStr,
  //raw: FfiStr,
  //hash: FfiStr,
  //enc: FfiStr,
  //handle_p: uintptr_t
  //): ErrorCode;

  //build_cred_def_request(
  //submitter_did: FfiStr,
  //cred_def: FfiStr,
  //handle_p: uintptr_t
  //): ErrorCode;

  //build_custom_request(request_json: FfiStr, handle_p: uintptr_t): ErrorCode;

  //build_disable_all_txn_author_agreements_request(
  //submitter_did: FfiStr,
  //handle_p: uintptr_t
  //): ErrorCode;

  //build_get_cred_def_request(
  //submitter_did: FfiStr,
  //cred_def_id: FfiStr,
  //handle_p: uintptr_t
  //): ErrorCode;

  //build_get_nym_request(
  //submitter_did: FfiStr,
  //dest: FfiStr,
  //handle_p: uintptr_t
  //): ErrorCode;

  //build_get_revoc_reg_def_request(
  //submitter_did: FfiStr,
  //revoc_reg_id: FfiStr,
  //handle_p: uintptr_t
  //): ErrorCode;

  //build_get_revoc_reg_request(
  //submitter_did: FfiStr,
  //revoc_reg_id: FfiStr,
  //timestamp: int64_t,
  //handle_p: uintptr_t
  //): ErrorCode;

  //build_get_revoc_reg_delta_request(
  //submitter_did: FfiStr,
  //revoc_reg_id: FfiStr,
  //from_ts: int64_t,
  //to_ts: int64_t,
  //handle_p: uintptr_t
  //): ErrorCode;

  //build_get_schema_request(
  //submitter_did: FfiStr,
  //schema_id: FfiStr,
  //handle_p: uintptr_t
  //): ErrorCode;

  //build_get_txn_author_agreement_request(
  //submitter_did: FfiStr,
  //data: FfiStr,
  //handle_p: uintptr_t
  //): ErrorCode;

  //build_get_txn_request(
  //submitter_did: FfiStr,
  //ledger_type: int32_t,
  //seq_no: int32_t,
  //handle_p: uintptr_t
  //): ErrorCode;

  //build_get_validator_info_request(
  //submitter_did: FfiStr,
  //handle_p: uintptr_t
  //): ErrorCode;

  //build_nym_request(
  //submitter_did: FfiStr,
  //dest: FfiStr,
  //verkey: FfiStr,
  //alias: FfiStr,
  //role: FfiStr,
  //handle_p: uintptr_t
  //): ErrorCode;

  //build_revoc_reg_def_request(
  //submitter_did: FfiStr,
  //revoc_reg_def: FfiStr,
  //handle_p: uintptr_t
  //): ErrorCode;

  //build_revoc_reg_entry_request(
  //submitter_did: FfiStr,
  //revoc_reg_def_id: FfiStr,
  //revoc_reg_def_type: FfiStr,
  //revoc_reg_entry: FfiStr,
  //handle_p: uintptr_t
  //): ErrorCode;

  //build_schema_request(
  //submitter_did: FfiStr,
  //schema: FfiStr,
  //handle_p: uintptr_t
  //): ErrorCode;

  //build_txn_author_agreement_request(
  //submitter_did: FfiStr,
  //text: FfiStr,
  //version: FfiStr,
  //ratification_ts: int64_t,
  //retirement_ts: int64_t,
  //handle_p: uintptr_t
  //): ErrorCode;

  //build_rich_schema_request(
  //submitter_did: FfiStr,
  //rs_id: FfiStr,
  //rs_content: FfiStr,
  //rs_name: FfiStr,
  //rs_version: FfiStr,
  //rs_type: FfiStr,
  //ver: FfiStr,
  //handle_p: uintptr_t
  //): ErrorCode;

  //build_get_rich_schema_object_by_id_request(
  //submitter_did: FfiStr,
  //rs_id: FfiStr,
  //handle_p: uintptr_t
  //): ErrorCode;

  //build_get_rich_schema_object_by_metadata_request(
  //submitter_did: FfiStr,
  //rs_type: FfiStr,
  //rs_name: FfiStr,
  //rs_version: FfiStr,
  //handle_p: uintptr_t
  //): ErrorCode;

  //pool_create(params: FfiStr, handle_p: uintptr_t): ErrorCode;

  //pool_refresh(
  //pool_handle: uintptr_t,
  //cb: (cb_id: uintptr_t, err: ErrorCode) => void,
  //cb_id: uintptr_t
  //): ErrorCode;

  //pool_get_status(
  //pool_handle: uintptr_t,
  //cb: (cb_id: uintptr_t, err: ErrorCode, response: Str) => void,
  //cb_id: uintptr_t
  //): ErrorCode;

  //pool_get_transactions(
  //pool_handle: uintptr_t,
  //cb: (cb_id: uintptr_t, err: ErrorCode, response: Str) => void,
  //cb_id: uintptr_t
  //): ErrorCode;

  //pool_get_verifiers(
  //pool_handle: uintptr_t,
  //cb: (cb_id: uintptr_t, err: ErrorCode, response: Str) => void,
  //cb_id: uintptr_t
  //): ErrorCode;

  //pool_submit_action(
  //pool_handle: uintptr_t,
  //request_handle: uintptr_t,
  //nodes: FfiStr,
  //timeout: int32_t,
  //cb: (cb_id: uintptr_t, err: ErrorCode, response: Str) => void,
  //cb_id: uintptr_t
  //): ErrorCode;

  //pool_submit_request(
  //pool_handle: uintptr_t,
  //request_handle: uintptr_t,
  //cb: (cb_id: uintptr_t, err: ErrorCode, response: Str) => void,
  //cb_id: uintptr_t
  //): ErrorCode;

  //pool_close(pool_handle: uintptr_t): ErrorCode;

  //prepare_txn_author_agreement_acceptance(
  //text: FfiStr,
  //version: FfiStr,
  //taa_digest: FfiStr,
  //acc_mech_type: FfiStr,
  //time: uint64_t,
  //output_p: Str
  //): ErrorCode;

  //request_free(request_handle: uintptr_t): ErrorCode;

  //request_get_body(request_handle: uintptr_t, body_p: Str): ErrorCode;

  //request_get_signature_input(
  //request_handle: uintptr_t,
  //input_p: Str
  //): ErrorCode;

  //request_set_endorser(request_handle: uintptr_t, endorser: FfiStr): ErrorCode;

  //request_set_multi_signature(
  //request_handle: uintptr_t,
  //identifier: FfiStr,
  //signature: Str,
  //signature_len: uintptr_t
  //): ErrorCode;

  //request_set_signature(
  //request_handle: uintptr_t,
  //signature: uint8_t,
  //signature_len: uintptr_t
  //): ErrorCode;

  //request_set_txn_author_agreement_acceptance(
  //request_handle: uintptr_t,
  //acceptance: FfiStr
  //): ErrorCode;
}

// We MUST export this according to tscodegen. We are ignoring it however.
export default TurboModuleRegistry.getEnforcing<NativeIndyVdrBindings>(
  'IndyVdr'
) as NativeIndyVdrBindings;
