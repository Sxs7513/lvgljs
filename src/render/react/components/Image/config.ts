import { LvgljsComponentConfig } from "../config";
import { ImageComp, ImageProps } from "./comp";

export default class ImageConfig implements LvgljsComponentConfig<ImageProps, ImageComp> {
  tagName = "Image";
  native = null;
  shouldSetTextContent() {
    return false;
  }
  createInstance(newProps: ImageProps, rootInstance, context, workInProgress, uid) {
    const instance = new ImageComp({ uid });
    instance.setProps(newProps, {});
    return instance;
  }
  commitMount(instance, newProps: ImageProps, internalInstanceHandle) {}
  commitUpdate(instance, updatePayload, oldProps: ImageProps, newProps: ImageProps, finishedWork) {
    instance.setProps(newProps, oldProps);
  }
  setProps(newProps: ImageProps, oldProps: ImageProps) {}
  insertBefore(child, beforeChild) {}
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
}
