import { LvgljsComponentConfig } from "../config";
import { ButtonComp, ButtonProps } from "./comp";

export default class ButtonConfig implements LvgljsComponentConfig<ButtonProps, ButtonComp> {
  tagName = "Button";
  native = null;
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps: ButtonProps, rootInstance, context, workInProgress, uid) {
    const instance = new ButtonComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps: ButtonProps, internalInstanceHandle) {}
  commitUpdate(instance, updatePayload, oldProps: ButtonProps, newProps: ButtonProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  setProps(newProps: ButtonProps, oldProps: ButtonProps) {}
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
}
