import { CommonComponentApi, CommonProps } from "../common/index";
import {
  EVENTTYPE_MAP,
  handleEvent,
  setStyle,
  styleGetterProp,
} from "../config";
import { InputComp } from "../Input/comp";

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeView = bridge.NativeRender.NativeComponents.Keyboard;

const modes = {
  lower: 0,
  upper: 1,
  special: 2,
  number: 3,
};

export type KeyboardProps = CommonProps & {
  /** Sets keyboard mode:
   * - lower, Display lower case letters
   * - upper, Display upper case letters
   * - special, Display special characters
   * - number, Display numbers, +/- sign, and decimal dot
  */
  mode: typeof modes;
  textarea: InputComp;
  onClose?: () => void;
  onOk?: () => void;
};

function setKeyboardProps(comp, newProps: KeyboardProps, oldProps: KeyboardProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Keyboard", comp, newProps, oldProps }),
    mode(mode) {
      if (mode !== oldProps.mode && typeof modes[mode] !== "undefined") {
        comp.setMode(modes[mode]);
      }
    },
    textarea(textarea) {
      if (textarea?.uid !== oldProps.textarea?.uid) {
        comp.setTextarea(textarea);
      }
    },
    onClose(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_CANCEL);
    },
    onOk(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_READY);
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

export class KeyboardComp extends NativeView {
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
  setProps(newProps: KeyboardProps, oldProps: KeyboardProps) {
    setKeyboardProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {}
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
      compName: "Keyboard",
      styleType: type,
      oldStyleSheet: {},
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
