// class "interface" of the generated code. This has to be copied over from
// `../lib/cpp-generated/NativeModules.h`

#include "../lib/cpp-generated/NativeModules.h"
#include "NativeModules.h"
#include "TurboModuleUtils.h"
#include "rust_header.h"
#include <ReactCommon/TurboModule.h>
#include <jsi/jsi.h>
#include <jsi/jsilib.h>



namespace facebook {
namespace react {

class IndyVdrCxx : public IndyVdrCxxSpecJSI {
public:
    IndyVdrCxx(std::shared_ptr<CallInvoker> jsInvoker);

    jsi::String version(jsi::Runtime &rt);
    void set_config(jsi::Runtime &rt, const jsi::Object &options);
    void set_default_logger(jsi::Runtime &rt);
    void set_protocol_version(jsi::Runtime &rt, const jsi::Object &options);
    void set_socks_proxy(jsi::Runtime &rt, const jsi::Object &options);
    
    double build_acceptance_mechanisms_request(jsi::Runtime &rt, const jsi::Object &options);
    double build_get_acceptance_mechanisms_request(jsi::Runtime &rt, const jsi::Object &options);
    double build_attrib_request(jsi::Runtime &rt, const jsi::Object &options);
    double build_get_attrib_request(jsi::Runtime &rt, const jsi::Object &options);
    double build_cred_def_request(jsi::Runtime &rt, const jsi::Object &options);
    double build_get_cred_def_request(jsi::Runtime &rt, const jsi::Object &options);
    double build_get_revoc_reg_def_request(jsi::Runtime &rt, const jsi::Object &options);
    double build_get_revoc_reg_request(jsi::Runtime &rt, const jsi::Object &options);
    double build_get_revoc_reg_delta_request(jsi::Runtime &rt, const jsi::Object &options);
    double build_revoc_reg_def_request(jsi::Runtime &rt, const jsi::Object &options);
    double build_custom_request(jsi::Runtime &rt, const jsi::Object &options);
    double build_disable_all_txn_author_agreements_request(jsi::Runtime &rt, const jsi::Object &options);
    double build_get_nym_request(jsi::Runtime &rt, const jsi::Object &options);
    double build_get_schema_request(jsi::Runtime &rt, const jsi::Object &options);
    double build_get_txn_author_agreement_request(jsi::Runtime &rt, const jsi::Object &options);
    double build_get_txn_request(jsi::Runtime &rt, const jsi::Object &options);
    double build_get_validator_info_request(jsi::Runtime &rt, const jsi::Object &options);
    double build_nym_request(jsi::Runtime &rt, const jsi::Object &options);
    double build_revoc_reg_entry_request(jsi::Runtime &rt, const jsi::Object &options);
    double build_schema_request(jsi::Runtime &rt, const jsi::Object &options);
    double build_txn_author_agreement_request(jsi::Runtime &rt, const jsi::Object &options);
    double build_rich_schema_request(jsi::Runtime &rt, const jsi::Object &options);
    double build_get_rich_schema_object_by_id_request(jsi::Runtime &rt, const jsi::Object &options);
    double build_get_rich_schema_object_by_metadata_request(jsi::Runtime &rt, const jsi::Object &options);
    
    double pool_create(jsi::Runtime &rt, const jsi::Object &options);
    double pool_refresh(jsi::Runtime &rt, const jsi::Object &options);
    double pool_get_status(jsi::Runtime &rt, const jsi::Object &options);
    double pool_get_transactions(jsi::Runtime &rt, const jsi::Object &options);
    double pool_get_verifiers(jsi::Runtime &rt, const jsi::Object &options);
    double pool_submit_action(jsi::Runtime &rt, const jsi::Object &options);
    double pool_submit_request(jsi::Runtime &rt, const jsi::Object &options);
    double pool_close(jsi::Runtime &rt, const jsi::Object &options);
    
    
    double request_free(jsi::Runtime &rt, const jsi::Object &options);
    double request_set_endorser(jsi::Runtime &rt, const jsi::Object &options);
    double request_set_multi_signature(jsi::Runtime &rt, const jsi::Object &options);
    double request_set_signature(jsi::Runtime &rt, const jsi::Object &options);
    double request_set_txn_author_agreement_acceptance(jsi::Runtime &rt, const jsi::Object &options);

    jsi::String prepare_txn_author_agreement_acceptance(jsi::Runtime &rt, const jsi::Object &options);
    
    jsi::String request_get_body(jsi::Runtime &rt, const jsi::Object &options);
    jsi::String request_get_signature_input(jsi::Runtime &rt, const jsi::Object &options);
};

} // namespace react
} // namespace facebook
