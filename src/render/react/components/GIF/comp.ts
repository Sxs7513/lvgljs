import { BUILT_IN_SYMBOL } from "../../core/style/symbol";
import { isValidUrl } from "../../utils/helpers";
import { CommonComponentApi, CommonProps } from "../common/index";
import {
  EVENTTYPE_MAP,
  handleEvent,
  setStyle,
  styleGetterProp,
} from "../config";

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeGIF = bridge.NativeRender.NativeComponents.GIF;

async function getGIFBinary(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/octet-stream",
    },
  });
  const GIFBuffer = await resp.arrayBuffer();
  return GIFBuffer;
}

export type GIFProps = CommonProps & {
  src: string;
}

function setGIFProps(comp, newProps: GIFProps, oldProps: GIFProps) {
  const setter = {
    ...CommonComponentApi({ compName: "GIF", comp, newProps, oldProps }),
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
            url = path.resolve(__dirname, url);
          }
          fs.readFile(url, { encoding: "binary" })
            .then((data) => {
              comp.setGIFBinary(data.buffer);
            })
            .catch((e) => {
              console.log("setGIF error", e);
            });
        } else {
          getGIFBinary(url)
            .then((buffer) => comp.setGIFBinary(Buffer.from(buffer).buffer))
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

export class GIFComp extends NativeGIF {
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
  setProps(newProps: GIFProps, oldProps: GIFProps) {
    setGIFProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "GIF";
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
      compName: "GIF",
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
