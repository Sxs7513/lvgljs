
#include "calendar.hpp"

Calendar::Calendar(std::string uid, lv_obj_t* parent): BasicComponent() {
    this->type = COMP_TYPE_CALENDAR;

    this->uid = uid;
    this->instance = lv_calendar_create(parent != nullptr ? parent : lv_scr_act());
    lv_calendar_header_dropdown_create(this->instance);
    lv_calendar_header_arrow_create(this->instance);
    
    lv_obj_set_user_data(this->instance, this);
};

void Calendar::setToday (uint32_t year, uint32_t month, uint32_t day) {
    lv_calendar_set_today_date(this->instance, year, month, day);
};

void Calendar::setShownMonth (uint32_t year, uint32_t month) {
    lv_calendar_set_showed_date(this->instance, year, month);
};

void Calendar::setHighlightDates (std::vector<lv_calendar_date_t>& dates, int32_t num) {
    this->highlighted_days = dates;
    lv_calendar_set_highlighted_dates(this->instance, this->highlighted_days.data(), num);
};