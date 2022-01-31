#include "react-native-indy-vdr.h"

using namespace facebook;
using namespace react;

IndyVdrCxx::IndyVdrCxx(std::shared_ptr<CallInvoker> jsInvoker): IndyVdrCxxSpecJSI(jsInvoker){};

jsi::String IndyVdrCxx::version(jsi::Runtime &rt) {
    return jsi::String::createFromAscii(rt, indy_vdr_version());
};

jsi::String IndyVdrCxx::get_current_error(jsi::Runtime &rt) {
    const char* error_message;
    ErrorCode code = indy_vdr_get_current_error(&error_message);

    // TODO: do we want to handle errors here
    TurboModuleUtils::handleError(rt, code);

    return jsi::String::createFromAscii(rt, error_message);
}

void IndyVdrCxx::set_default_logger(jsi::Runtime &rt) {
    ErrorCode code = indy_vdr_set_default_logger();
    TurboModuleUtils::handleError(rt, code);
};

void IndyVdrCxx::set_config(jsi::Runtime &rt, const jsi::Object &options) {
    std::string config = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "config"));

    ErrorCode code = indy_vdr_set_config(config.c_str());
    TurboModuleUtils::handleError(rt, code);
};

void IndyVdrCxx::set_protocol_version(jsi::Runtime &rt, const jsi::Object &options) {
    int64_t version = TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "version"));

    ErrorCode code = indy_vdr_set_protocol_version(version);
    TurboModuleUtils::handleError(rt, code);
};

void IndyVdrCxx::set_socks_proxy(jsi::Runtime &rt, const jsi::Object &options) {
    std::string socks_proxy = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "socks_proxy"));

    ErrorCode code = indy_vdr_set_socks_proxy(socks_proxy.c_str());
    TurboModuleUtils::handleError(rt, code);
};

double IndyVdrCxx::build_acceptance_mechanisms_request(jsi::Runtime &rt, const jsi::Object &options) {
      std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"));
      std::string aml = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "aml"));
      std::string version = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "version"));
      std::string aml_context = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "aml_context"), true);
      uintptr_t handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));

      ErrorCode code = indy_vdr_build_acceptance_mechanisms_request(submitter_did.c_str(),
                                                                    aml.c_str(),
                                                                    version.c_str(),
                                                                    aml_context.length() ? aml_context.c_str() : nullptr,
                                                                    &handle);

      TurboModuleUtils::handleError(rt, code);
      return handle;
};

double IndyVdrCxx::build_get_acceptance_mechanisms_request(jsi::Runtime &rt, const jsi::Object &options) {
    std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"));
    int64_t timestamp = TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "timestamp"), true);
    std::string version = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "version"), true);
    uintptr_t handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));
    
    ErrorCode code = indy_vdr_build_get_acceptance_mechanisms_request(submitter_did.c_str(),
                                                                      timestamp,
                                                                      version.length() > 0 ? version.c_str() : nullptr,
                                                                      &handle);

    TurboModuleUtils::handleError(rt, code);
    
    return handle;
};

double IndyVdrCxx::build_attrib_request(jsi::Runtime &rt, const jsi::Object &options) {
    std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"));
    std::string target_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "target_did"));
    std::string hash = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "hash"), true);
    std::string raw = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "raw"), true);
    std::string enc = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "enc"), true);
    uintptr_t handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));
    
    ErrorCode code = indy_vdr_build_attrib_request(submitter_did.c_str(),
                                                   target_did.c_str(),
                                                   hash.length() > 0 ? hash.c_str() : nullptr,
                                                   raw.length()  > 0 ? raw.c_str() : nullptr,
                                                   enc.length()  > 0 ? enc.c_str() : nullptr,
                                                   &handle);

    TurboModuleUtils::handleError(rt, code);
    
    return handle;
}

double IndyVdrCxx::build_get_attrib_request(jsi::Runtime &rt, const jsi::Object &options) {
    std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"), true);
    std::string target_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "target_did"));
    std::string hash = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "hash"), true);
    std::string raw = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "raw"), true);
    std::string enc = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "enc"), true);
    uintptr_t handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));

    ErrorCode code = indy_vdr_build_get_attrib_request(submitter_did.length() > 0 ? submitter_did.c_str() : nullptr,
                                                       target_did.c_str(),
                                                       hash.length() > 0 ? hash.c_str() : nullptr,
                                                       raw.length()  > 0 ? raw.c_str() : nullptr,
                                                       enc.length()  > 0 ? enc.c_str() : nullptr,
                                                       &handle);

    TurboModuleUtils::handleError(rt, code);

    return handle;
};

double IndyVdrCxx::build_cred_def_request(jsi::Runtime &rt, const jsi::Object &options) {
    std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"));
    std::string cred_def = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "cred_def"));
    uintptr_t handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));

    ErrorCode code = indy_vdr_build_cred_def_request(submitter_did.c_str(),
                                                     cred_def.c_str(),
                                                     &handle);

    TurboModuleUtils::handleError(rt, code);
    return handle;
};

double IndyVdrCxx::build_get_cred_def_request(jsi::Runtime &rt, const jsi::Object &options) {
    std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"),true);
    std::string cred_def_id = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "cred_def_id"));
    uintptr_t handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));

    ErrorCode code = indy_vdr_build_get_cred_def_request(submitter_did.length() > 0 ? submitter_did.c_str() : nullptr,
                                                     cred_def_id.c_str(),
                                                     &handle);

    TurboModuleUtils::handleError(rt, code);
    return handle;
};

double IndyVdrCxx::build_get_revoc_reg_def_request(jsi::Runtime &rt, const jsi::Object &options) {
    std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"),true);
    std::string revoc_reg_id = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "revoc_reg_id"));
    uintptr_t handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));

    ErrorCode code = indy_vdr_build_get_revoc_reg_def_request(submitter_did.length() > 0 ? submitter_did.c_str() : nullptr,
                                                          revoc_reg_id.c_str(),
                                                          &handle);

    TurboModuleUtils::handleError(rt, code);
    return handle;
};

double IndyVdrCxx::build_get_revoc_reg_request(jsi::Runtime &rt, const jsi::Object &options) {
    std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"),true);
    std::string revoc_reg_id = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "revoc_reg_id"));
    int64_t timestamp = TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "timestamp"));
    uintptr_t handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));

    ErrorCode code = indy_vdr_build_get_revoc_reg_request(submitter_did.length() > 0 ? submitter_did.c_str() : nullptr,
                                                          revoc_reg_id.c_str(),
                                                          timestamp,
                                                          &handle);

    TurboModuleUtils::handleError(rt, code);
    return handle;
};

double IndyVdrCxx::build_get_revoc_reg_delta_request(jsi::Runtime &rt, const jsi::Object &options) {
    std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"),true);
    std::string revoc_reg_id = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "revoc_reg_id"));
    int64_t from_ts = TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "from_ts"), true);
    int64_t to_ts = TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "to_ts"));
    uintptr_t handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));

    ErrorCode code = indy_vdr_build_get_revoc_reg_delta_request(submitter_did.length() > 0 ? submitter_did.c_str() : nullptr,
                                                          revoc_reg_id.c_str(),
                                                          from_ts,
                                                          to_ts,
                                                          &handle);

    TurboModuleUtils::handleError(rt, code);
    return handle;
};

double IndyVdrCxx::build_revoc_reg_def_request(jsi::Runtime &rt, const jsi::Object &options) {
    std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"));
    std::string revoc_reg_id = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "revoc_reg_id"));
    uintptr_t handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));

    ErrorCode code = indy_vdr_build_revoc_reg_def_request(submitter_did.c_str(),
                                                          revoc_reg_id.c_str(),
                                                          &handle);

    TurboModuleUtils::handleError(rt, code);
    return handle;
};

double IndyVdrCxx::build_custom_request(jsi::Runtime &rt, const jsi::Object &options) {
    std::string request_json = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "request_json"));
    uintptr_t handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));

    ErrorCode code = indy_vdr_build_custom_request(request_json.c_str(),
                                                   &handle);

    TurboModuleUtils::handleError(rt, code);
    return handle;
};

double IndyVdrCxx::build_disable_all_txn_author_agreements_request(jsi::Runtime &rt, const jsi::Object &options) {
    std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"));
    uintptr_t handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));

    ErrorCode code = indy_vdr_build_disable_all_txn_author_agreements_request(submitter_did.c_str(),
                                                                              &handle);

    TurboModuleUtils::handleError(rt, code);
    return handle;
};

double IndyVdrCxx::build_get_nym_request(jsi::Runtime &rt, const jsi::Object &options) {
    std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"), true);
    std::string dest = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "dest"));
    uintptr_t handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));

    ErrorCode code = indy_vdr_build_get_nym_request(submitter_did.length() > 0 ? submitter_did.c_str() : nullptr,
                                                    dest.c_str(),
                                                    &handle);

    TurboModuleUtils::handleError(rt, code);
    return handle;
};

double IndyVdrCxx::build_get_schema_request(jsi::Runtime &rt, const jsi::Object &options) {
    std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"), true);
    std::string schema_id = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "schema_id"));
    uintptr_t handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));

    ErrorCode code = indy_vdr_build_get_schema_request(submitter_did.length() > 0 ? submitter_did.c_str() : nullptr,
                                                       schema_id.c_str(),
                                                       &handle);

    TurboModuleUtils::handleError(rt, code);
    return handle;
};

double IndyVdrCxx::build_get_txn_author_agreement_request(jsi::Runtime &rt, const jsi::Object &options) {
    std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"), true);
    std::string data = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "data"), true);
    uintptr_t handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));

    ErrorCode code = indy_vdr_build_get_txn_author_agreement_request(submitter_did.length() > 0 ? submitter_did.c_str() : nullptr,
                                                                     data.length() > 0 ? data.c_str() : nullptr,
                                                                     &handle);

    TurboModuleUtils::handleError(rt, code);
    return handle;
};
 
double IndyVdrCxx::build_get_txn_request(jsi::Runtime &rt, const jsi::Object &options) {
    std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"), true);
    int32_t ledger_type = TurboModuleUtils::jsiToValue<int32_t>(rt, options.getProperty(rt, "ledger_type"));
    int32_t seq_no = TurboModuleUtils::jsiToValue<int32_t>(rt, options.getProperty(rt, "seq_no"));
    uintptr_t handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));

    // TODO: fix warning
    ErrorCode code = indy_vdr_build_get_txn_request(submitter_did.length() > 0 ? submitter_did.c_str() : nullptr,
                                                    ledger_type,
                                                    seq_no,
                                                    &handle);

    TurboModuleUtils::handleError(rt, code);
    return handle;
};

double IndyVdrCxx::build_get_validator_info_request(jsi::Runtime &rt, const jsi::Object &options) {
    std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"));
    uintptr_t handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));

    ErrorCode code = indy_vdr_build_get_validator_info_request(submitter_did.c_str(),
                                                               &handle);

    TurboModuleUtils::handleError(rt, code);
    return handle;
};

double IndyVdrCxx::build_nym_request(jsi::Runtime &rt, const jsi::Object &options) {
    std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"));
    std::string dest = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "dest"));
    std::string verkey = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "verkey"), true);
    std::string alias = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "alias"), true);
    std::string role = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "role"), true);
    uintptr_t handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));

    ErrorCode code = indy_vdr_build_nym_request(submitter_did.c_str(),
                                                dest.c_str(),
                                                verkey.length() > 0 ? verkey.c_str() : nullptr,
                                                alias.length() > 0 ? alias.c_str() : nullptr,
                                                role.length() > 0 ? role.c_str() : nullptr,
                                                &handle);

    TurboModuleUtils::handleError(rt, code);
    return handle;
};

double IndyVdrCxx::build_revoc_reg_entry_request(jsi::Runtime &rt, const jsi::Object &options) {
    std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"));
    std::string revoc_reg_def_id = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "revoc_reg_def_id"));
    std::string revoc_reg_def_type = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "revoc_reg_def_type"));
    std::string revoc_reg_entry = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "revoc_reg_entry"));
    uintptr_t handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));

    ErrorCode code = indy_vdr_build_revoc_reg_entry_request(submitter_did.c_str(),
                                                            revoc_reg_def_id.c_str(),
                                                            revoc_reg_def_type.c_str(),
                                                            revoc_reg_entry.c_str(),
                                                            &handle);

    TurboModuleUtils::handleError(rt, code);
    return handle;
};

double IndyVdrCxx::build_schema_request(jsi::Runtime &rt, const jsi::Object &options) {
    std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"));
    std::string schema = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "schema"));
    uintptr_t handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));

    ErrorCode code = indy_vdr_build_schema_request(submitter_did.c_str(),
                                                   schema.c_str(),
                                                   &handle);

    TurboModuleUtils::handleError(rt, code);
    return handle;
};

double IndyVdrCxx::build_txn_author_agreement_request(jsi::Runtime &rt, const jsi::Object &options) {
    std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"));
    std::string text = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "text"), true);
    std::string version = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "version"));
    int64_t ratification_ts = TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "ratification_ts"), true);
    int64_t retirement_ts = TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "retirement_ts"), true);
    uintptr_t handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));

    ErrorCode code = indy_vdr_build_txn_author_agreement_request(submitter_did.c_str(),
                                                                 text.length() > 0 ? text.c_str() : nullptr,
                                                                 version.c_str(),
                                                                 ratification_ts,
                                                                 retirement_ts,
                                                                 &handle);

    TurboModuleUtils::handleError(rt, code);
    return handle;
};

double IndyVdrCxx::build_rich_schema_request(jsi::Runtime &rt, const jsi::Object &options) {
    std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"));
    std::string rs_id = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "rs_id"));
    std::string rs_content = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "rs_content"));
    std::string rs_name = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "rs_name"));
    std::string rs_version = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "rs_version"));
    std::string rs_type = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "rs_type"));
    std::string ver = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "ver"));
    uintptr_t handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));
    
    ErrorCode code = indy_vdr_build_rich_schema_request(submitter_did.c_str(),
                                                        rs_id.c_str(),
                                                        rs_content.c_str(),
                                                        rs_name.c_str(),
                                                        rs_version.c_str(),
                                                        rs_type.c_str(),
                                                        ver.c_str(),
                                                        &handle);

    TurboModuleUtils::handleError(rt, code);
    
    return handle;
};

double IndyVdrCxx::build_get_rich_schema_object_by_id_request(jsi::Runtime &rt, const jsi::Object &options) { 
    std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"));
    std::string rs_id = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "rs_id"));
    uintptr_t handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));
    
    ErrorCode code = indy_vdr_build_get_rich_schema_object_by_id_request(submitter_did.c_str(), rs_id.c_str(), &handle);
    TurboModuleUtils::handleError(rt, code);
    
    return handle;
};

double IndyVdrCxx::build_get_rich_schema_object_by_metadata_request(jsi::Runtime &rt, const jsi::Object &options) {
    std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"));
    std::string rs_type = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "rs_type"));
    std::string rs_name = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "rs_name"));
    std::string rs_version = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "rs_version"));
    uintptr_t handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));
    
    ErrorCode code = indy_vdr_build_get_rich_schema_object_by_metadata_request(submitter_did.c_str(),
                                                                               rs_type.c_str(),
                                                                               rs_name.c_str(),
                                                                               rs_version.c_str(),
                                                                               &handle);

    TurboModuleUtils::handleError(rt, code);
    return handle;
};

double IndyVdrCxx::pool_create(jsi::Runtime &rt, const jsi::Object &options) {
    std::string params = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "params"));
    uintptr_t pool_handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));

    ErrorCode code = indy_vdr_pool_create(params.c_str(), &pool_handle);

    TurboModuleUtils::handleError(rt, code);
    return pool_handle;
};

double IndyVdrCxx::pool_refresh(jsi::Runtime &rt, const jsi::Object &options) {
    uintptr_t pool_handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "pool_handle"));
    
    jsi::Function cb = options.getPropertyAsFunction(rt, "cb");
    State *state = new State(&cb);
    state->rt = &rt;
    
    indy_vdr_pool_refresh(pool_handle, TurboModuleUtils::callback, uintptr_t(state));

    return pool_handle;
};

double IndyVdrCxx::pool_get_status(jsi::Runtime &rt, const jsi::Object &options) {
    uintptr_t pool_handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "pool_handle"));
    
    jsi::Function cb = options.getPropertyAsFunction(rt, "cb");
    State *state = new State(&cb);
    state->rt = &rt;
    
    indy_vdr_pool_get_status(pool_handle,
                             TurboModuleUtils::callbackWithResponse,
                             uintptr_t(state));

    return pool_handle;
};

double IndyVdrCxx::pool_get_transactions(jsi::Runtime &rt, const jsi::Object &options) {
    uintptr_t pool_handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "pool_handle"));
    
    jsi::Function cb = options.getPropertyAsFunction(rt, "cb");
    State *state = new State(&cb);
    state->rt = &rt;
    
    indy_vdr_pool_get_transactions(pool_handle,
                                   TurboModuleUtils::callbackWithResponse,
                                   uintptr_t(state));

    return pool_handle;
};

double IndyVdrCxx::pool_get_verifiers(jsi::Runtime &rt, const jsi::Object &options) {
    uintptr_t pool_handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "pool_handle"));
    
    jsi::Function cb = options.getPropertyAsFunction(rt, "cb");
    State *state = new State(&cb);
    state->rt = &rt;
    
    indy_vdr_pool_get_verifiers(pool_handle,
                                TurboModuleUtils::callbackWithResponse,
                                uintptr_t(state));

    return pool_handle;
};

double IndyVdrCxx::pool_submit_action(jsi::Runtime &rt, const jsi::Object &options) {
    uintptr_t pool_handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "pool_handle"));
    uintptr_t request_handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "request_handle"));
    std::string nodes = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "nodes"), true);
    int32_t timeout = TurboModuleUtils::jsiToValue<int32_t>(rt, options.getProperty(rt, "timeout"), true);
    
    jsi::Function cb = options.getPropertyAsFunction(rt, "cb");
    State *state = new State(&cb);
    state->rt = &rt;
    
    indy_vdr_pool_submit_action(pool_handle,
                                request_handle,
                                nodes.length() > 0 ? nodes.c_str() : nullptr,
                                timeout,
                                TurboModuleUtils::callbackWithResponse,
                                uintptr_t(state));
    
    return pool_handle;
};

double IndyVdrCxx::pool_submit_request(jsi::Runtime &rt, const jsi::Object &options) {
    uintptr_t pool_handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "pool_handle"));
    uintptr_t request_handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "request_handle"));
    
    jsi::Function cb = options.getPropertyAsFunction(rt, "cb");
    State *state = new State(&cb);
    state->rt = &rt;
    
    indy_vdr_pool_submit_request(pool_handle,
                                request_handle,
                                TurboModuleUtils::callbackWithResponse,
                                uintptr_t(state));

    return pool_handle;
};

double IndyVdrCxx::pool_close(jsi::Runtime &rt, const jsi::Object &options) {
    uintptr_t pool_handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "pool_handle"));
    
    ErrorCode code = indy_vdr_pool_close(pool_handle);
    
    TurboModuleUtils::handleError(rt, code);
    return pool_handle;
};

jsi::String IndyVdrCxx::prepare_txn_author_agreement_acceptance(jsi::Runtime &rt, const jsi::Object &options) {
    std::string text = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "text"));
    std::string version = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "version"));
    std::string taa_digest = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "taa_digest"));
    std::string acc_mech_type = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "acc_mech_type"));
    int32_t time = TurboModuleUtils::jsiToValue<int32_t>(rt, options.getProperty(rt, "time"));
    const char* output;
    
    ErrorCode code = indy_vdr_prepare_txn_author_agreement_acceptance(text.c_str(),
                                                                      version.c_str(),
                                                                      taa_digest.c_str(),
                                                                      acc_mech_type.c_str(),
                                                                      time,
                                                                      &output);

    TurboModuleUtils::handleError(rt, code);
    return jsi::String::createFromAscii(rt, output);
    
};

double IndyVdrCxx::request_free(jsi::Runtime &rt, const jsi::Object &options) {
    uintptr_t request_handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "request_handle"));
    
    ErrorCode code = indy_vdr_request_free(request_handle);

    TurboModuleUtils::handleError(rt, code);
    return request_handle;
};

jsi::String IndyVdrCxx::request_get_body(jsi::Runtime &rt, const jsi::Object &options) {
    uintptr_t request_handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "request_handle"));
    const char* body_p;
    
    ErrorCode code = indy_vdr_request_get_body(request_handle, &body_p);

    TurboModuleUtils::handleError(rt, code);
    
    return jsi::String::createFromAscii(rt, body_p);
};

jsi::String IndyVdrCxx::request_get_signature_input(jsi::Runtime &rt, const jsi::Object &options) {
    uintptr_t request_handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "request_handle"));
    const char* input_p;
    
    ErrorCode code = indy_vdr_request_get_signature_input(request_handle, &input_p);

    TurboModuleUtils::handleError(rt, code);
    
    return jsi::String::createFromAscii(rt, input_p);
};

double IndyVdrCxx::request_set_endorser(jsi::Runtime &rt, const jsi::Object &options) {
    uintptr_t request_handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "request_handle"));
    std::string endorser = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "endorser"));
    
    ErrorCode code = indy_vdr_request_set_endorser(request_handle, endorser.c_str());

    TurboModuleUtils::handleError(rt, code);
    
    return request_handle;
};

double IndyVdrCxx::request_set_multi_signature(jsi::Runtime &rt, const jsi::Object &options) {
    uintptr_t request_handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "request_handle"));
    std::string identifier = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "identifier"));
    // TODO: signature uint8_t whats that all about
    uint8_t signature = TurboModuleUtils::jsiToValue<uint8_t>(rt, options.getProperty(rt, "signature"));
    int64_t signature_len = TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "signature_len"));
    
    ErrorCode code = indy_vdr_request_set_multi_signature(request_handle, identifier.c_str(), &signature, signature_len);

    TurboModuleUtils::handleError(rt, code);
    
    return request_handle;
};

double IndyVdrCxx::request_set_signature(jsi::Runtime &rt, const jsi::Object &options) {
    uintptr_t request_handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "request_handle"));
    uint8_t signature = TurboModuleUtils::jsiToValue<uint8_t>(rt, options.getProperty(rt, "signature"));
    int64_t signature_len = TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "signature_len"));
    
    ErrorCode code = indy_vdr_request_set_signature(request_handle, &signature, signature_len);

    TurboModuleUtils::handleError(rt, code);
    
    return request_handle;
};

double IndyVdrCxx::request_set_txn_author_agreement_acceptance(jsi::Runtime &rt, const jsi::Object &options) {
    uintptr_t request_handle = (uintptr_t)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "request_handle"));
    std::string acceptance = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "acceptance"));
    
    ErrorCode code = indy_vdr_request_set_txn_author_agreement_acceptance(request_handle, acceptance.c_str());

    TurboModuleUtils::handleError(rt, code);
    
    return request_handle;
};

