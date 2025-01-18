import { LvgljsComponentConfig } from "../config";
import { RollerComp, RollerProps } from "./comp";

export default class RollerConfig implements LvgljsComponentConfig<RollerProps, RollerComp> {
  tagName = "Roller";
  native = null;
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps: RollerProps, rootInstance, context, workInProgress, uid) {
    const instance = new RollerComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps: RollerProps, internalInstanceHandle) {}
  commitUpdate(instance, updatePayload, oldProps: RollerProps, newProps: RollerProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  setProps(newProps: RollerProps, oldProps: RollerProps) {}
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
}
