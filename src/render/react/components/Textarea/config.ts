import { LvgljsComponentConfig } from "../config";
import { TextareaComp, TextAreaProps } from "./comp";

export default class TextareaConfig implements LvgljsComponentConfig<TextAreaProps, TextareaComp> {
  tagName = "Textarea";
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps: TextAreaProps, rootInstance, context, workInProgress, uid) {
    const instance = new TextareaComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps: TextAreaProps, internalInstanceHandle) {}
  commitUpdate(instance, updatePayload, oldProps: TextAreaProps, newProps: TextAreaProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  commitUnmount(instance) {}
  setProps(newProps: TextAreaProps, oldProps: TextAreaProps) {}
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
}
