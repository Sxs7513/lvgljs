import { LvgljsComponentConfig } from "../config";
import { KeyboardComp, KeyboardProps } from "./comp";

export default class KeyboardConfig implements LvgljsComponentConfig<KeyboardProps, KeyboardComp> {
  tagName = "Keyboard";
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps: KeyboardProps, rootInstance, context, workInProgress, uid) {
    const instance = new KeyboardComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps: KeyboardProps, internalInstanceHandle) {}
  commitUpdate(instance, updatePayload, oldProps: KeyboardProps, newProps: KeyboardProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  commitUnmount(instance) {}
  setProps(newProps: KeyboardProps, oldProps: KeyboardProps) {}
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
}
