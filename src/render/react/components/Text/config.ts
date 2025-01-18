import { LvgljsComponentConfig } from "../config";
import { TextComp, TextProps } from "./comp";

export default class TextConfig implements LvgljsComponentConfig<TextProps, TextComp> {
  tagName = "Text";
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps: TextProps, rootInstance, context, workInProgress, uid) {
    const instance = new TextComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps: TextProps, internalInstanceHandle) {}
  commitUpdate(instance, updatePayload, oldProps: TextProps, newProps: TextProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  commitUnmount(instance) {}
  setProps(newProps: TextProps, oldProps: TextProps) {}
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
}
