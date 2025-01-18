import { LvgljsComponentConfig } from "../config";
import { Window, WindowProps } from "./comp";

export default class WindowConfig implements LvgljsComponentConfig<WindowProps, Window> {
  tagName = "Window";
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps: WindowProps, rootInstance, context, workInProgress, uid) {
    const instance = new Window({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, props: WindowProps, internalInstanceHandle) {}
  commitUpdate(instance, updatePayload, oldProps: WindowProps, newProps: WindowProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  setProps(newProps: WindowProps, oldProps: WindowProps) {}
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
}
