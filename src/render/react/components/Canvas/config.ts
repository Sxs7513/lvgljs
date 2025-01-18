import { LvgljsComponentConfig } from "../config";
import { CanvasComp, CanvasProps } from "./comp";

export default class CanvasConfig implements LvgljsComponentConfig<CanvasProps, CanvasComp> {
  tagName = "Canvas";
  native = null;
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps: CanvasProps, rootInstance, context, workInProgress, uid) {
    const instance = new CanvasComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps: CanvasProps, internalInstanceHandle) {}
  commitUpdate(instance, updatePayload, oldProps: CanvasProps, newProps: CanvasProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  setProps(newProps: CanvasProps, oldProps: CanvasProps) {}
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
}
