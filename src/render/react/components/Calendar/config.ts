import { LvgljsComponentConfig } from "../config";
import { CalendarComp, CalendarProps } from "./comp";

export default class CalendarConfig implements LvgljsComponentConfig<CalendarProps, CalendarComp> {
  tagName = "Calendar";
  native = null;
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps: CalendarProps, rootInstance, context, workInProgress, uid) {
    const instance = new CalendarComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps: CalendarProps, internalInstanceHandle) {}
  commitUpdate(instance, updatePayload, oldProps: CalendarProps, newProps: CalendarProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  setProps(newProps: CalendarProps, oldProps: CalendarProps) {}
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
}
