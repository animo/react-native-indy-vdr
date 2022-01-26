#pragma once

#include <cstdarg>
#include <cstdint>
#include <cstdlib>
#include <ostream>
#include <new>
#include <string>

static const int64_t DEFAULT_ACK_TIMEOUT = 20;

static const int64_t DEFAULT_REPLY_TIMEOUT = 60;

static const int64_t DEFAULT_CONN_ACTIVE_TIMEOUT = 5;

static const uintptr_t DEFAULT_CONN_REQUEST_LIMIT = 5;

static const uintptr_t DEFAULT_REQUEST_READ_NODES = 2;

static const uint64_t DEFAULT_FRESHNESS_TIMEOUT = 300;

enum class ErrorCode : uintptr_t {
  Success = 0,
  Config = 1,
  Connection = 2,
  FileSystem = 3,
  Input = 4,
  Resource = 5,
  Unavailable = 6,
  Unexpected = 7,
  Incompatible = 8,
  PoolNoConsensus = 30,
  PoolRequestFailed = 31,
  PoolTimeout = 32,
};

typedef const char* FfiStr;

extern "C" {

ErrorCode indy_vdr_set_config(FfiStr config);

ErrorCode indy_vdr_set_default_logger();

ErrorCode indy_vdr_set_protocol_version(uintptr_t version);

ErrorCode indy_vdr_set_socks_proxy(FfiStr socks_proxy);

char *indy_vdr_version();

ErrorCode indy_vdr_get_current_error(const char **error_json_p);

ErrorCode indy_vdr_build_acceptance_mechanisms_request(FfiStr submitter_did,
                                                       FfiStr aml,
                                                       FfiStr version,
                                                       FfiStr aml_context,
                                                       uintptr_t *handle_p);

ErrorCode indy_vdr_build_get_acceptance_mechanisms_request(FfiStr submitter_did,
                                                           int64_t timestamp,
                                                           FfiStr version,
                                                           uintptr_t *handle_p);

ErrorCode indy_vdr_build_attrib_request(FfiStr submitter_did,
                                        FfiStr target_did,
                                        FfiStr hash,
                                        FfiStr raw,
                                        FfiStr enc,
                                        uintptr_t *handle_p);

ErrorCode indy_vdr_build_get_attrib_request(FfiStr submitter_did,
                                            FfiStr target_did,
                                            FfiStr raw,
                                            FfiStr hash,
                                            FfiStr enc,
                                            uintptr_t *handle_p);

ErrorCode indy_vdr_build_cred_def_request(FfiStr submitter_did,
                                          FfiStr cred_def,
                                          uintptr_t *handle_p);

ErrorCode indy_vdr_build_custom_request(FfiStr request_json, uintptr_t *handle_p);

ErrorCode indy_vdr_build_disable_all_txn_author_agreements_request(FfiStr submitter_did,
                                                                   uintptr_t *handle_p);

ErrorCode indy_vdr_build_get_cred_def_request(FfiStr submitter_did,
                                              FfiStr cred_def_id,
                                              uintptr_t *handle_p);

ErrorCode indy_vdr_build_get_nym_request(FfiStr submitter_did, FfiStr dest, uintptr_t *handle_p);

ErrorCode indy_vdr_build_get_revoc_reg_def_request(FfiStr submitter_did,
                                                   FfiStr revoc_reg_id,
                                                   uintptr_t *handle_p);

ErrorCode indy_vdr_build_get_revoc_reg_request(FfiStr submitter_did,
                                               FfiStr revoc_reg_id,
                                               int64_t timestamp,
                                               uintptr_t *handle_p);

ErrorCode indy_vdr_build_get_revoc_reg_delta_request(FfiStr submitter_did,
                                                     FfiStr revoc_reg_id,
                                                     int64_t from_ts,
                                                     int64_t to_ts,
                                                     uintptr_t *handle_p);

ErrorCode indy_vdr_build_get_schema_request(FfiStr submitter_did,
                                            FfiStr schema_id,
                                            uintptr_t *handle_p);

ErrorCode indy_vdr_build_get_txn_author_agreement_request(FfiStr submitter_did,
                                                          FfiStr data,
                                                          uintptr_t *handle_p);

ErrorCode indy_vdr_build_get_txn_request(FfiStr submitter_did,
                                         int32_t ledger_type,
                                         int32_t seq_no,
                                         uintptr_t *handle_p);

ErrorCode indy_vdr_build_get_validator_info_request(FfiStr submitter_did, uintptr_t *handle_p);

ErrorCode indy_vdr_build_nym_request(FfiStr submitter_did,
                                     FfiStr dest,
                                     FfiStr verkey,
                                     FfiStr alias,
                                     FfiStr role,
                                     uintptr_t *handle_p);

ErrorCode indy_vdr_build_revoc_reg_def_request(FfiStr submitter_did,
                                               FfiStr revoc_reg_def,
                                               uintptr_t *handle_p);

ErrorCode indy_vdr_build_revoc_reg_entry_request(FfiStr submitter_did,
                                                 FfiStr revoc_reg_def_id,
                                                 FfiStr revoc_reg_def_type,
                                                 FfiStr revoc_reg_entry,
                                                 uintptr_t *handle_p);

ErrorCode indy_vdr_build_schema_request(FfiStr submitter_did, FfiStr schema, uintptr_t *handle_p);

ErrorCode indy_vdr_build_txn_author_agreement_request(FfiStr submitter_did,
                                                      FfiStr text,
                                                      FfiStr version,
                                                      int64_t ratification_ts,
                                                      int64_t retirement_ts,
                                                      uintptr_t *handle_p);

ErrorCode indy_vdr_build_rich_schema_request(FfiStr submitter_did,
                                             FfiStr rs_id,
                                             FfiStr rs_content,
                                             FfiStr rs_name,
                                             FfiStr rs_version,
                                             FfiStr rs_type,
                                             FfiStr ver,
                                             uintptr_t *handle_p);

ErrorCode indy_vdr_build_get_rich_schema_object_by_id_request(FfiStr submitter_did,
                                                              FfiStr rs_id,
                                                              uintptr_t *handle_p);

ErrorCode indy_vdr_build_get_rich_schema_object_by_metadata_request(FfiStr submitter_did,
                                                                    FfiStr rs_type,
                                                                    FfiStr rs_name,
                                                                    FfiStr rs_version,
                                                                    uintptr_t *handle_p);

ErrorCode indy_vdr_pool_create(FfiStr params, uintptr_t *handle_p);

ErrorCode indy_vdr_pool_refresh(uintptr_t pool_handle,
                                void (*cb)(uintptr_t cb_id, ErrorCode err),
                                uintptr_t cb_id);

ErrorCode indy_vdr_pool_get_status(uintptr_t pool_handle,
                                   void (*cb)(uintptr_t cb_id, ErrorCode err, const char *response),
                                   uintptr_t cb_id);

ErrorCode indy_vdr_pool_get_transactions(uintptr_t pool_handle,
                                         void (*cb)(uintptr_t cb_id, ErrorCode err, const char *response),
                                         uintptr_t cb_id);

ErrorCode indy_vdr_pool_get_verifiers(uintptr_t pool_handle,
                                      void (*cb)(uintptr_t cb_id, ErrorCode err, const char *response),
                                      uintptr_t cb_id);

ErrorCode indy_vdr_pool_submit_action(uintptr_t pool_handle,
                                      uintptr_t request_handle,
                                      FfiStr nodes,
                                      int32_t timeout,
                                      void (*cb)(uintptr_t cb_id, ErrorCode err, const char *response),
                                      uintptr_t cb_id);

ErrorCode indy_vdr_pool_submit_request(uintptr_t pool_handle,
                                       uintptr_t request_handle,
                                       void (*cb)(uintptr_t cb_id, ErrorCode err, const char *response),
                                       uintptr_t cb_id);

ErrorCode indy_vdr_pool_close(uintptr_t pool_handle);

ErrorCode indy_vdr_prepare_txn_author_agreement_acceptance(FfiStr text,
                                                           FfiStr version,
                                                           FfiStr taa_digest,
                                                           FfiStr acc_mech_type,
                                                           uint64_t time,
                                                           const char **output_p);

ErrorCode indy_vdr_request_free(uintptr_t request_handle);

ErrorCode indy_vdr_request_get_body(uintptr_t request_handle, const char **body_p);

ErrorCode indy_vdr_request_get_signature_input(uintptr_t request_handle, const char **input_p);

ErrorCode indy_vdr_request_set_endorser(uintptr_t request_handle, FfiStr endorser);

ErrorCode indy_vdr_request_set_multi_signature(uintptr_t request_handle,
                                               FfiStr identifier,
                                               const uint8_t *signature,
                                               uintptr_t signature_len);

ErrorCode indy_vdr_request_set_signature(uintptr_t request_handle,
                                         const uint8_t *signature,
                                         uintptr_t signature_len);

ErrorCode indy_vdr_request_set_txn_author_agreement_acceptance(uintptr_t request_handle,
                                                               FfiStr acceptance);

} // extern "C"
