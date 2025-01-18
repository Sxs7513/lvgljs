import { LvgljsComponentConfig } from "../config";
import { LineComp, LineProps } from "./comp";

export default class LineConfig implements LvgljsComponentConfig<LineProps, LineComp> {
  tagName = "Line";
  native = null;
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps: LineProps, rootInstance, context, workInProgress, uid) {
    const instance = new LineComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps: LineProps, internalInstanceHandle) {}
  commitUpdate(instance, updatePayload, oldProps: LineProps, newProps: LineProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  setProps(newProps: LineProps, oldProp: LineProps) {}
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
}
