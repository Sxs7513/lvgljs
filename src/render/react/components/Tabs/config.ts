import { LvgljsComponentConfig } from "../config";
import { TabsComp, TabsProps } from "./comp";

export default class TabsConfig implements LvgljsComponentConfig<TabsProps, TabsComp> {
  tagName = "Tabs";
  native = null;
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps: TabsProps, rootInstance, context, workInProgress, uid) {
    const instance = new TabsComp({ uid, ...newProps });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps: TabsProps, internalInstanceHandle) {}
  commitUpdate(instance, updatePayload, oldProps: TabsProps, newProps: TabsProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  setProps(newProps: TabsProps, oldProps: TabsProps) {}
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
}
