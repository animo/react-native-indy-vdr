#pragma once

#include <ReactCommon/TurboModule.h>
#include <jsi/jsi.h>
#include "rust_header.h"

using namespace facebook;
using namespace react;

// state of a callback function
struct State {
    jsi::Function cb;
    // TODO: can we not make this a void pointer
    void* rt;
    
    State(jsi::Function *cb_): cb(std::move(*cb_)) {}
};

const char *name = "_indy_vdr";

class TurboModuleUtils {
public:
    // Install the Turbomodule
    static void installTurboModule(jsi::Runtime &runtime, std::shared_ptr<CallInvoker> jsCallInvoker);

    // Handles an error from within the module and sends it back to the js side
    static void handleError(jsi::Runtime &rt, ErrorCode code);

    // Converts jsi values to regular cpp values
    template <typename T>
    static T jsiToValue(jsi::Runtime &rt, jsi::Value value, bool optional = false);

    // Callback function that makes the host function async
    static void callback(uintptr_t result, ErrorCode code);
    
    // Callback function that makes the host function async with response from rust side
    static void callbackWithResponse(uintptr_t result, ErrorCode code, const char* response);
};
