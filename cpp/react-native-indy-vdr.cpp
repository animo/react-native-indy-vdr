#include "react-native-indy-vdr.h"

using namespace facebook;
using namespace react;

IndyVdrCxx::IndyVdrCxx(std::shared_ptr<CallInvoker> jsInvoker): IndyVdrCxxSpecJSI(jsInvoker){};

jsi::String IndyVdrCxx::version(jsi::Runtime &rt) {
    return jsi::String::createFromAscii(rt, indy_vdr_version());
};

void IndyVdrCxx::set_default_logger(jsi::Runtime &rt) {
    ErrorCode code = indy_vdr_set_default_logger();
    TurboModuleUtils::handle_error(rt, code);
};

void IndyVdrCxx::set_config(jsi::Runtime &rt, const jsi::Object &options) {
    std::string config = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "config"));

    ErrorCode code = indy_vdr_set_config(config.c_str());
    TurboModuleUtils::handle_error(rt, code);
};

void IndyVdrCxx::set_protocol_version(jsi::Runtime &rt, const jsi::Object &options) {
    int64_t version = TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "version"));

    ErrorCode code = indy_vdr_set_protocol_version(version);
    TurboModuleUtils::handle_error(rt, code);
};

void IndyVdrCxx::set_socks_proxy(jsi::Runtime &rt, const jsi::Object &options) {
    std::string socks_proxy = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "socks_proxy"));

    ErrorCode code = indy_vdr_set_socks_proxy(socks_proxy.c_str());
    TurboModuleUtils::handle_error(rt, code);
};

double IndyVdrCxx::build_acceptance_mechanisms_request(jsi::Runtime &rt, const jsi::Object &options) {
      std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"));
      std::string aml = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "aml"));
      std::string version = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "version"));
      std::string aml_context = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "aml_context"), true);
      unsigned long handle = (unsigned long)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));

      ErrorCode code = indy_vdr_build_acceptance_mechanisms_request(submitter_did.c_str(),
                                                                    aml.c_str(),
                                                                    version.c_str(),
                                                                    aml_context.length() ? aml_context.c_str() : nullptr,
                                                                    &handle);

      TurboModuleUtils::handle_error(rt, code);
      return handle;
};

double IndyVdrCxx::build_get_acceptance_mechanisms_request(jsi::Runtime &rt, const jsi::Object &options) {
    std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"));
    int64_t timestamp = TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "timestamp"), true);
    std::string version = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "version"), true);
    unsigned long handle = (unsigned long)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));
    
    ErrorCode code = indy_vdr_build_get_acceptance_mechanisms_request(submitter_did.c_str(),
                                                                      timestamp,
                                                                      version.length() > 0 ? version.c_str() : nullptr,
                                                                      &handle);

    TurboModuleUtils::handle_error(rt, code);
    
    return handle;
};

double IndyVdrCxx::build_attrib_request(jsi::Runtime &rt, const jsi::Object &options) {
    std::string submitter_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "submitter_did"));
    std::string target_did = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "target_did"));
    std::string hash = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "hash"), true);
    std::string raw = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "raw"), true);
    std::string enc = TurboModuleUtils::jsiToValue<std::string>(rt, options.getProperty(rt, "enc"), true);
    unsigned long handle = (unsigned long)TurboModuleUtils::jsiToValue<int64_t>(rt, options.getProperty(rt, "handle_p"));
    
    ErrorCode code = indy_vdr_build_attrib_request(submitter_did.c_str(),
                                                   target_did.c_str(),
                                                   hash.length() > 0 ? hash.c_str() : nullptr,
                                                   raw.length()  > 0 ? raw.c_str() : nullptr,
                                                   enc.length()  > 0 ? enc.c_str() : nullptr,
                                                   &handle);

    TurboModuleUtils::handle_error(rt, code);
    
    return handle;
}

double IndyVdrCxx::build_get_attrib_request(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::build_cred_def_request(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::build_get_cred_def_request(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::build_get_revoc_reg_def_request(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::build_get_revoc_reg_request(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::build_get_revoc_reg_delta_request(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::build_revoc_reg_def_request(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::build_custom_request(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::build_disable_all_txn_author_agreements_request(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::build_get_nym_request(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::build_get_schema_request(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::build_get_txn_author_agreement_request(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::build_get_txn_request(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::build_get_validator_info_request(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::build_nym_request(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::build_revoc_reg_entry_request(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::build_schema_request(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::build_txn_author_agreement_request(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::build_rich_schema_request(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::build_get_rich_schema_object_by_id_request(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::build_get_rich_schema_object_by_metadata_request(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::pool_create(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::pool_refresh(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::pool_get_status(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::pool_get_transactions(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::pool_get_verifiers(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::pool_submit_action(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::pool_submit_request(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::pool_close(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::prepare_txn_author_agreement_acceptance(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::request_free(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::request_get_body(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::request_get_signature_input(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::request_set_endorser(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::request_set_multi_signature(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::request_set_signature(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
double IndyVdrCxx::request_set_txn_author_agreement_acceptance(jsi::Runtime &rt, const jsi::Object &options) {return 0;};
