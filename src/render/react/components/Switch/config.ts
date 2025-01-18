import { LvgljsComponentConfig } from "../config";
import { SwitchComp, SwitchProps } from "./comp";

export default class SwitchConfig implements LvgljsComponentConfig<SwitchProps, SwitchComp> {
  tagName = "Switch";
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps: SwitchProps, rootInstance, context, workInProgress, uid) {
    const instance = new SwitchComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps: SwitchProps, internalInstanceHandle) {}
  commitUpdate(instance, updatePayload, oldProps: SwitchProps, newProps: SwitchProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  commitUnmount(instance) {}
  setProps(newProps: SwitchProps, oldProps: SwitchProps) {}
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
}
