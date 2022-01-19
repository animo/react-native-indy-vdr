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
};

} // namespace react
} // namespace facebook
