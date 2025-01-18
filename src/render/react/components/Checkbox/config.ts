import { LvgljsComponentConfig } from "../config";
import { CheckboxComp, CheckboxProps } from "./comp";

export default class CheckboxConfig implements LvgljsComponentConfig<CheckboxProps, CheckboxComp> {
  tagName = "Checkbox";
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps: CheckboxProps, rootInstance, context, workInProgress, uid) {
    const instance = new CheckboxComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps: CheckboxProps, internalInstanceHandle) {}
  commitUpdate(instance, updatePayload, oldProps: CheckboxProps, newProps: CheckboxProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  commitUnmount(instance) {}
  setProps(newProps: CheckboxProps, oldProps: CheckboxProps) {}
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
}
