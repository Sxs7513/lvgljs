import { LvgljsComponentConfig } from "../config";
import { MaskComp, MaskProps } from "./comp";

export default class MaskConfig implements LvgljsComponentConfig<MaskProps, MaskComp> {
  tagName = "Mask";
  native = null;
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps: MaskProps, rootInstance, context, workInProgress, uid) {
    const instance = new MaskComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps: MaskProps, internalInstanceHandle) {}
  commitUpdate(instance, updatePayload, oldProps: MaskProps, newProps: MaskProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  setProps(newProps: MaskProps, oldProps: MaskProps) {}
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
}
