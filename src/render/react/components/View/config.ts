import { LvgljsComponentConfig } from "../config";
import { ViewComp, ViewProps } from "./comp";

export default class ViewConfig implements LvgljsComponentConfig<ViewProps, ViewComp> {
  tagName = "View";
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps: ViewProps, rootInstance, context, workInProgress, uid) {
    const instance = new ViewComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps: ViewProps, internalInstanceHandle) {}
  commitUpdate(instance, updatePayload, oldProps: ViewProps, newProps: ViewProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  commitUnmount(instance) {}
  setProps(newProps: ViewProps, oldProps: ViewProps) {}
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
}
