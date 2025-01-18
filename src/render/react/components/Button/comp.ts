import { StyleProps } from "../../core/style";
import { CommonComponentApi, CommonProps, OnClickEvent } from "../common/index";
import {
  EVENTTYPE_MAP,
  STYLE_TYPE,
  handleEvent,
  setStyle,
  styleGetterProp,
} from "../config";

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeButton = bridge.NativeRender.NativeComponents.Button;

export type ButtonProps = CommonProps & {
  onPressedStyle?: StyleProps;
  onClick?: (event: OnClickEvent) => void;
  onPressed?: (event: {
    target: any,
    currentTarget: any,
    stopPropogation: () => void,
  }) => void;
  onLongPressed?: (event: {
    target: any,
    currentTarget: any,
    stopPropogation: () => void,
  }) => void;
  onLongPressRepeat?: (event: {
    target: any,
    currentTarget: any,
    stopPropogation: () => void,
  }) => void;
};

function setButtonProps(comp, newProps: ButtonProps, oldProps: ButtonProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Button", comp, newProps, oldProps }),
    onPressedStyle(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName: "Button",
        styleType: STYLE_TYPE.STATE_PRESSED,
        oldStyleSheet: oldProps.onPressedStyle,
      });
    },
    onClick(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_CLICKED);
    },
    onPressed(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_PRESSED);
    },
    onLongPressed(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_LONG_PRESSED);
    },
    onLongPressRepeat(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_LONG_PRESSED_REPEAT);
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

export class ButtonComp extends NativeButton {
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
  setProps(newProps: ButtonProps, oldProps: ButtonProps) {
    setButtonProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "Button";
  appendInitialChild(child) {}
  appendChild(child) {
    super.appendChild(child);
  }
  removeChild(child) {
    super.removeChild(child);
  }
  close() {
    super.close();
  }
  setStyle(style, type = 0x0000) {
    setStyle({
      comp: this,
      styleSheet: style,
      compName: "Button",
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
