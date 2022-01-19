#pragma once

#include <ReactCommon/TurboModule.h>
#include <jsi/jsi.h>
#include "rust_header.h"

const char *name = "_indy_vdr";

using namespace facebook;
using namespace react;

class TurboModuleUtils {
public:
  // Install the Turbomodule
  static void installTurboModule(jsi::Runtime &runtime, std::shared_ptr<CallInvoker> jsCallInvoker);
  
  // Handles an error from within the module and sends it back to the js side
  static void handle_error(jsi::Runtime &rt, ErrorCode code);
    
  // Converts jsi values to regular cpp values
  // jsi::String -> std::string
  // jsi::Number -> double
  template <typename T>
  static T jsiToValue(jsi::Runtime &rt, jsi::Value value, bool optional = false);
};
