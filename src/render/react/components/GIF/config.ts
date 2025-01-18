import { LvgljsComponentConfig } from "../config";
import { GIFComp, GIFProps } from "./comp";

export default class GIFConfig implements LvgljsComponentConfig<GIFProps, GIFComp> {
  tagName = "GIF";
  native = null;
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps: GIFProps, rootInstance, context, workInProgress, uid) {
    const instance = new GIFComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps: GIFProps, internalInstanceHandle) {}
  commitUpdate(instance, updatePayload, oldProps: GIFProps, newProps: GIFProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  setProps(newProps: GIFProps, oldProps: GIFProps) {}
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
}
