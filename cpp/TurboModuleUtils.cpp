// Utility method that registers the module on the global property in JS. This
// creates a poiinter to the turboModule implementation, creates a jsi object
// from it and registers on `global` with the key of `name`. as specified on
// line 14. This is not exposed to the user and only in the module itself.
// Change the `name` constant to something that fits your use case.

#include <jsi/jsilib.h>

#include "TurboModuleUtils.h"

#include "react-native-indy-vdr.h"

const char* name = "_indyVdr";

using namespace facebook;
using namespace react;

namespace utils {
  void installTurboModule(jsi::Runtime& rt,
      std::shared_ptr<CallInvoker> jsCallInvoker) {

      // Register the turboModule as a pointer
      std::shared_ptr<IndyVdr> turboModule = std::make_shared<IndyVdr>(jsCallInvoker);

      // Register UtilsTurboModule instance as global.`NAME`
      rt.global().setProperty(rt,
          name,
          jsi::Object::createFromHostObject(rt, turboModule));
  }
}

