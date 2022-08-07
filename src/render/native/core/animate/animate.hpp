#pragma once

#include "engine.hpp"
#include "render/native/core/style/style.hpp"
#include "render/native/core/utils/utils.hpp"

typedef struct ANIMATE_REF {
    void* comp;
    int32_t uid;
    bool use_native;
} ANIMATE_REF;

void NativeAnimateInit (JSContext* ctx, JSValue ns);