import { HostConfig } from "react-reconciler";
import { ArcComp, ArcProps } from "./comp";
import { LvgljsComponentConfig } from "../config";

export default class ArcConfig implements LvgljsComponentConfig<ArcProps, ArcComp> {
  tagName = "Arc";
  native = null;
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps: ArcProps, rootInstance, context, workInProgress, uid) {
    const instance = new ArcComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps: ArcProps, internalInstanceHandle) {}
  commitUpdate(instance, updatePayload, oldProps: ArcProps, newProps: ArcProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  setProps(newProps: ArcProps, oldProps: ArcProps) {}
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
}