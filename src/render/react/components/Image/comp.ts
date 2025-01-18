import { BUILT_IN_SYMBOL } from "../../core/style/symbol";
import { isValidUrl } from "../../utils/helpers";
import { CommonComponentApi, CommonProps } from "../common/index";
import {
  EVENTTYPE_MAP,
  handleEvent,
  setStyle,
  styleGetterProp,
} from "../config";
import path from 'tjs:path';

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeImage = bridge.NativeRender.NativeComponents.Image;

async function getImageBinary(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/octet-stream",
    },
  });
  const imageBuffer = await resp.arrayBuffer();
  return imageBuffer;
}

export type ImageProps = CommonProps & {
  /** GIF loading resource, support network url, local path, buildtin symbol */
  src: string;
};

function setImageProps(comp, newProps: ImageProps, oldProps: ImageProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Image", comp, newProps, oldProps }),
    onClick(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_CLICKED);
    },
    src(url) {
      if (url && url !== oldProps.src) {
        if (BUILT_IN_SYMBOL[url]) {
          comp.setSymbol(BUILT_IN_SYMBOL[url]);
          return;
        }
        if (!isValidUrl(url)) {
          if (!path.isAbsolute(url)) {
            url = path.resolve(url);
          }
          tjs.readFile(url, { encoding: "binary" })
            .then((data) => {
              comp.setImageBinary(data.buffer);
            })
            .catch((e) => {
              console.log("setImage error", e);
            });
        } else {
          getImageBinary(url)
            .then((buffer) => comp.setImageBinary(Buffer.from(buffer).buffer))
            .catch(console.warn);
        }
      }
    },
  };
  Object.keys(setter).forEach((key) => {
    if (newProps.hasOwnProperty(key)) {
      setter[key](newProps[key]);
    }
  });
  comp.dataset = {};
  Object.keys(newProps).forEach((prop) => {
    const index = prop.indexOf("data-");
    if (index === 0) {
      comp.dataset[prop.substring(5)] = newProps[prop];
    }
  });
}

export class ImageComp extends NativeImage {
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;

    const style = super.style;
    const that = this;
    this.style = new Proxy(this, {
      get(obj, prop) {
        if (styleGetterProp.includes(prop)) {
          return style[prop].call(that);
        }
      },
    });
  }
  setProps(newProps: ImageProps, oldProps: ImageProps) {
    setImageProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "Image";
  appendInitialChild(child) {}
  appendChild(child) {}
  removeChild(child) {}
  close() {
    super.close();
  }
  setStyle(style, type = 0x0000) {
    setStyle({
      comp: this,
      styleSheet: style,
      compName: "Image",
      styleType: type,
      oldStyleSheet: null,
      isInit: false,
    });
  }
  moveToFront() {
    super.moveToFront();
  }
  moveToBackground() {
    super.moveToBackground();
  }
  scrollIntoView() {
    super.scrollIntoView();
  }
}
