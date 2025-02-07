#include "./comp.hpp"

#include "native/core/utils/utils.hpp"

std::unordered_map<std::string, BasicComponent*> comp_map;

static MemoryPool<sizeof(lv_style_t), 30> style_pool;

void BasicComponent::addEventListener (int eventType) {
    if (!this->registeEvents.count(eventType)) {
        this->registeEvents.insert({ eventType, true });
    }
    if (!this->listening) {
        this->listening = true;
        lv_obj_add_event_cb(this->instance, &BasicComponent::EventCallback, LV_EVENT_ALL, this);
    }
};

void BasicComponent::EventCallback (lv_event_t * event) {
    BasicComponent* instance = static_cast<BasicComponent*>(event->user_data);
    std::string uid = instance->uid;
    lv_event_code_t code = event->code;
    if (instance->isEventRegist(static_cast<int>(code))) {
        FireEventToJS(event, uid, code);
    }
};

void BasicComponent::removeEventListener (int eventType) {
    this->registeEvents.erase(eventType);

    lv_obj_remove_event_cb(this->instance, &BasicComponent::EventCallback);
};

bool BasicComponent::isEventRegist(int eventType) {
    return this->registeEvents.count(eventType) > 0;
};

void BasicComponent::insertChildBefore(void *child) {
    static_cast<BasicComponent*>(child)->parent_instance = this->instance;
    if (!(static_cast<BasicComponent*>(child)->is_fixed) && (static_cast<BasicComponent*>(child)->type != COMP_TYPE_MASK)) {
        lv_obj_t* ins = (static_cast<BasicComponent*>(child))->instance;
        lv_obj_set_parent(ins, this->instance);
        uint32_t index = lv_obj_get_index(ins);
        lv_obj_move_to_index(ins, index);
    }
};

void BasicComponent::removeChild(void* child) {};

void BasicComponent::appendChild (void* child) {
    static_cast<BasicComponent*>(child)->parent_instance = this->instance;
    if (!(static_cast<BasicComponent*>(child)->is_fixed) && (static_cast<BasicComponent*>(child)->type != COMP_TYPE_MASK)) {
        lv_obj_set_parent((static_cast<BasicComponent*>(child))->instance, this->instance);
    }
};

void BasicComponent::initCompStyle (int32_t type) {

};

void BasicComponent::initStyle (int32_t type) {
    bool is_new = this->ensureStyle(type);
    lv_style_t* style = this->style_map.at(type);
    lv_style_init(style);
    lv_style_reset(style);

    this->initCompStyle(type);

    if (is_new) {
        lv_obj_add_style(this->instance, style, type);
    }
};

BasicComponent::BasicComponent (std::string& uid) {
    this->uid = uid;
    comp_map.insert({ this->uid, this });
};

void BasicComponent::setTransition (JSContext* ctx, JSValue obj, lv_style_t* style, int32_t type) {
    int32_t len;
    JSValue value_len = JS_GetPropertyUint32(ctx, obj, 0);
    JS_ToInt32(ctx, &len, value_len);

    lv_style_prop_t* old_transProps = this->trans_props_map[type];

    this->trans_props_map[type] = (lv_style_prop_t*)malloc((len + 1) * sizeof(lv_style_prop_t));

    JSValue props = JS_GetPropertyUint32(ctx, obj, 1);
    int32_t prop_key;
    for(int i=0; i < len; i++) {
        JSValue prop = JS_GetPropertyUint32(ctx, props, i);
        JS_ToInt32(ctx, &prop_key, prop);
        JS_FreeValue(ctx, prop);
        this->trans_props_map[type][i] = (lv_style_prop_t)prop_key;
    }
    this->trans_props_map[type][len] = LV_STYLE_PROP_INV;

    int32_t dura;
    JSValue dura_value = JS_GetPropertyUint32(ctx, obj, 2);
    JS_ToInt32(ctx, &dura, dura_value);

    JSValue func_value = JS_GetPropertyUint32(ctx, obj, 3);
    size_t func_str_len;
    const char* func_str = JS_ToCStringLen(ctx, &func_str_len, func_value);
    std::string func_str_1 = func_str;
    func_str_1.resize(func_str_len);

    int32_t delay;
    JSValue delay_value = JS_GetPropertyUint32(ctx, obj, 4);
    JS_ToInt32(ctx, &delay, delay_value);

    CompSetTransition(style, &this->trans, this->trans_props_map[type], func_str_1, dura, delay);

    JS_FreeValue(ctx, value_len);
    JS_FreeValue(ctx, props);
    JS_FreeValue(ctx, func_value);
    JS_FreeValue(ctx, dura_value);
    JS_FreeValue(ctx, delay_value);
    JS_FreeCString(ctx, func_str);

    if (old_transProps != nullptr) {
        free(old_transProps);
    }
};

bool BasicComponent::ensureStyle (int32_t type) {
    lv_style_t* style;
    bool is_new;
    if (this->style_map.find(type) != this->style_map.end()) {
        
    } else {
        style = static_cast<lv_style_t*>(style_pool.allocate());
        style_map[type] = style;
        is_new = true;
    }
    return is_new;
};

void BasicComponent::setStyle(JSContext* ctx, JSValue& obj, std::vector<std::string>& keys, int32_t type, bool isinit) {

    lv_style_t* style;
    bool is_new = false;

    if (this->style_map.find(type) != this->style_map.end()) {
        style = this->style_map.at(type);
    } else {
        is_new = true;
        style = static_cast<lv_style_t*>(style_pool.allocate());
        style_map[type] = style;
        this->initStyle(type);
    }

    // if (isinit) {
    //     this->initStyle(type);
    // }

    for(int i=0; i < keys.size(); i++) {
        std::string key = keys[i];

        if (StyleManager::styles.count(key) > 0) {
            CompSetStyle* func = StyleManager::styles.at(key);
            JSValue value = JS_GetPropertyStr(ctx, obj, key.c_str());
            func(this->instance, style, ctx, value);
            JS_FreeValue(ctx, value);
        }
    }

    for(int i=0; i < keys.size(); i++) {
        std::string key = keys[i];
        if (key == "transition") {
            JSValue value = JS_GetPropertyStr(ctx, obj, key.c_str());
            this->setTransition(ctx, value, style, type);
            JS_FreeValue(ctx, value);
        }
    }

    if (is_new) {
        lv_obj_add_style(this->instance, style, type);
    }

    lv_obj_refresh_style(this->instance, LV_PART_ANY, LV_STYLE_PROP_ANY);
};

void BasicComponent::setBackgroundImage (uint8_t* buf, size_t buf_len, int32_t style_type, std::string& symbol) {
    lv_img_dsc_t_1* img_desc;
    lv_img_dsc_t_1* old_img_desc = nullptr;
    std::string old_image_symbol;
    std::string image_symbol;
    const uint8_t* prev_buf = nullptr;

    this->ensureStyle(style_type);
    lv_style_t* style = this->style_map.at(style_type);

    if (buf != nullptr) {
        if (this->image_desc_map.find(style_type) != this->image_desc_map.end()) {
            old_img_desc = this->image_desc_map.at(style_type);
        }
        if (old_img_desc != nullptr) {
            prev_buf = old_img_desc->data;
        }
        img_desc = static_cast<lv_img_dsc_t_1*>(malloc(sizeof(lv_img_dsc_t_1)));
        image_desc_map[style_type] = img_desc;
            
        if (buf != nullptr) {
            uint8_t* img_data = GetImgDesc(buf, buf_len, img_desc);
            if (img_data != nullptr) {
                img_desc->data = img_data;
                lv_style_set_bg_img_src(style, img_desc);
            }
        } else {
            lv_style_set_bg_img_src(style, NULL);
        }

        this->image_desc_map[style_type] = img_desc;

        if (prev_buf != nullptr) {
            free((void*)(prev_buf));
        }
        if (old_img_desc != nullptr) {
            free(old_img_desc);
        }
    } else {
        if (this->symbol_map.find(style_type) != this->symbol_map.end()) {
            image_symbol = this->symbol_map.at(style_type);
        }
        this->symbol_map[style_type] = symbol;

        lv_style_set_bg_img_src(style, this->symbol_map[style_type].c_str());
    }

    lv_obj_invalidate(this->instance);
};

BasicComponent::~BasicComponent () {
    comp_map.erase(this->uid);

    const lv_coord_t* ptr1 = this->grid_row_desc;
    const lv_coord_t* ptr2 = this->grid_column_desc;
    
    for(auto& desc : this->image_desc_map) {
        if (desc.second != nullptr) {
            const uint8_t* buf = (static_cast<lv_img_dsc_t_1*>(desc.second))->data;
            if (buf != nullptr) {
                free((void*)(buf));
            }
            free((void*)(desc.second));
        }
    }

    if (ptr1) {
        free((lv_coord_t*)(ptr1));
    }
    if (ptr2) {
        free((lv_coord_t*)(ptr2));
    }

    for(auto &style : style_map) {
        lv_style_reset(style.second);
    }

    lv_obj_remove_event_cb(instance, &BasicComponent::EventCallback);
    lv_obj_del(this->instance);
};

void BasicComponent::setAlign (int32_t align_type, int32_t x, int32_t y) {
    lv_obj_align(this->instance, static_cast<lv_align_t>(align_type), x, y);
};

void BasicComponent::setAlignTo (int32_t align_type, int32_t x, int32_t y, BasicComponent* parent) {
    lv_obj_align_to(this->instance, parent->instance, static_cast<lv_align_t>(align_type), x, y);
};

void BasicComponent::moveToFront () {
    lv_obj_move_foreground(this->instance);
};

void BasicComponent::moveToBackground () {
    lv_obj_move_background(this->instance);
};

void BasicComponent::scrollIntoView () {
    lv_obj_scroll_to_view(this->instance, LV_ANIM_ON);
};
