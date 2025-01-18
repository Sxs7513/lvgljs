import { LvgljsComponentConfig } from "../config";
import { SliderComp, SliderProps } from "./comp";

export default class SliderConfig implements LvgljsComponentConfig<SliderProps, SliderComp> {
  tagName = "Slider";
  native = null;
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps: SliderProps, rootInstance, context, workInProgress, uid) {
    const instance = new SliderComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps: SliderProps, internalInstanceHandle) {}
  commitUpdate(instance, updatePayload, oldProps: SliderProps, newProps: SliderProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  setProps(newProps: SliderProps, oldProps: SliderProps) {}
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
}
