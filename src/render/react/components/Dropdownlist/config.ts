import { DropdownlistComp, DropdownListProps } from "./comp";
import { LvgljsComponentConfig } from "../config";

export default class DropdownlistConfig implements LvgljsComponentConfig<DropdownListProps, DropdownlistComp> {
  tagName = "Dropdownlist";
  native = null;
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps: DropdownListProps, rootInstance, context, workInProgress, uid) {
    const instance = new DropdownlistComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps: DropdownListProps, internalInstanceHandle) {}
  commitUpdate(instance, updatePayload, oldProps: DropdownListProps, newProps: DropdownListProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  setProps(newProps: DropdownListProps, oldProps: DropdownListProps) {}
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
}
