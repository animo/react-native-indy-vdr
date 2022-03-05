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

void TurboModuleUtils::handleError(jsi::Runtime &rt, ErrorCode code) {
    int error_code = int(code);
    printf("error code: %d\n",error_code);

    // TODO: what should we do when rust panics (code = 7)
    if (error_code == 0) return;

    const char *error_message = "";
    indy_vdr_get_current_error(&error_message);

    throw jsi::JSError(rt, error_message);
};

void TurboModuleUtils::callback(uintptr_t result, ErrorCode code) {
    State *s = reinterpret_cast<State*>(result);
    jsi::Function *cb = &s->cb;
    jsi::Runtime *rt = reinterpret_cast<jsi::Runtime*>(s->rt);

    cb->call(*rt, int(code));
}

void TurboModuleUtils::callbackWithResponse(uintptr_t result, ErrorCode code, const char* response) {
    State *s = reinterpret_cast<State*>(result);
    jsi::Function *cb = &s->cb;
    jsi::Runtime *rt = reinterpret_cast<jsi::Runtime*>(s->rt);
    
    cb->call(*rt, int(code), response);
}

template <>
std::string TurboModuleUtils::jsiToValue<std::string>(jsi::Runtime &rt, jsi::Value value, bool optional) {
    // We return an std::string() because we cannot return a nullptr.
    if ((value.isNull() || value.isUndefined()) && optional) return std::string();
  
    if (value.isString()) return value.asString(rt).utf8(rt);

    throw jsi::JSError(rt, "Value is not of type string");
}

template <>
int64_t TurboModuleUtils::jsiToValue<int64_t>(jsi::Runtime &rt, jsi::Value value, bool optional) {
    // We return -1 here as rust interprets this as the optional value was not given.
    if ((value.isNull() || value.isUndefined()) && optional) return -1;

    if (value.isNumber()) return value.asNumber();

    throw jsi::JSError(rt, "Value is not of type number");
}

template <>
int32_t TurboModuleUtils::jsiToValue<int32_t>(jsi::Runtime &rt, jsi::Value value, bool optional) {
    // We return -1 here as rust interprets this as the optional value was not given.
    if ((value.isNull() || value.isUndefined()) && optional) return -1;

    if (value.isNumber()) return value.asNumber();

    throw jsi::JSError(rt, "Value is not of type number");
}

template <>
uint8_t TurboModuleUtils::jsiToValue<uint8_t>(jsi::Runtime &rt, jsi::Value value, bool optional) {
    // We return -1 here as rust interprets this as the optional value was not given.
    if ((value.isNull() || value.isUndefined()) && optional) return -1;

    if (value.isNumber()) return value.asNumber();

    throw jsi::JSError(rt, "Value is not of type number");
}
