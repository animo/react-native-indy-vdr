#include <jsi/jsi.h>
#include <ReactCommon/TurboModule.h>

namespace utils {
  using namespace facebook;
  using namespace react;

  // Install the Turbomodule
  void installTurboModule(jsi::Runtime& runtime, std::shared_ptr<CallInvoker> jsCallInvoker);
}
