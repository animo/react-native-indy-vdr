#include <jsi/jsilib.h>
#include "TurboModuleUtils.h"
#include "react-native-indy-vdr.h"

using namespace facebook;
using namespace react;

void TurboModuleUtils::installTurboModule(jsi::Runtime &rt, std::shared_ptr<CallInvoker> jsCallInvoker) {
  // Register the turboModule as a pointer
  std::shared_ptr<IndyVdrCxx> turboModule = std::make_shared<IndyVdrCxx>(jsCallInvoker);

  // Register IndyVdrCxx instance as global.`NAME`
  rt.global().setProperty(rt, name, jsi::Object::createFromHostObject(rt, turboModule));
}

void TurboModuleUtils::handle_error(jsi::Runtime &rt, ErrorCode code) {
  int error_code = int(code);
  printf("error code: %d\n",error_code);

  // TODO: what should we do when rust panics (code = 7)
  if (error_code == 0 || error_code == 7) return;

  const char *error_message = "";
  indy_vdr_get_current_error(&error_message);

  throw jsi::JSError(rt, error_message);
};

template <>
std::string TurboModuleUtils::jsiToValue<std::string>(jsi::Runtime &rt, jsi::Value value, bool optional) {
  if ((value.isNull() || value.isUndefined()) && optional) return std::string();
  
  if (value.isString()) return value.asString(rt).utf8(rt);

  throw jsi::JSError(rt, "Value is not of type string");
}

template <>
double TurboModuleUtils::jsiToValue<double>(jsi::Runtime &rt, jsi::Value value, bool optional) {
  if ((value.isNull() || value.isUndefined()) && optional) return NULL;
  
  if (value.isNumber()) return value.asNumber();
    
  throw jsi::JSError(rt, "Value is not of type number");
}
