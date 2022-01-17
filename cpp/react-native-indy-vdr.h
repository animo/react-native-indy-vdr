// class "interface" of the generated code. This has to be copied over from
// `../lib/cpp-generated/NativeModules.h`

#include <ReactCommon/TurboModule.h>
#include <jsi/jsilib.h>
#include <jsi/jsi.h>
#include "NativeModules.h"
#include "rust_header.h"

namespace facebook {
namespace react {

class IndyVdr : public IndyVdrCxxSpecJSI {
public:
    IndyVdr(std::shared_ptr<CallInvoker> jsInvoker);
    double set_config(jsi::Runtime &rt, const jsi::String &cfg);
    jsi::String version(jsi::Runtime &rt);
};

} // namespace react
} // namespace facebook
