import { StyleProps } from "../../core/style";
import { CommonComponentApi, CommonProps, OnChangeEvent } from "../common/index";
import {
  EVENTTYPE_MAP,
  handleEvent,
  setStyle,
  styleGetterProp,
} from "../config";

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeView = bridge.NativeRender.NativeComponents.Textarea;

export type InputProps = CommonProps & {
  placeholder: string;
  /** `password` mode changes text to `*` */
  mode?: "password" | "text";
  /** Maximum number of characters */
  maxlength: number;
  onChange?: (event: OnChangeEvent) => void;
  onFocus?: (event: {
    target: any,
    currentTarget: any,
    stopPropogation: () => void,
  }) => void;
  onBlur?: (event: {
    target: any,
    currentTarget: any,
    stopPropogation: () => void,
  }) => void;
  onFocusStyle: StyleProps;
  value: string;
  /** Virtual keyboard will auto raise up when focus on Input component */
  autoKeyBoard: boolean;
};

function setInputProps(comp, newProps: InputProps, oldProps: InputProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Input", comp, newProps, oldProps }),
    placeholder(str) {
      if (str !== oldProps.placeholder) {
        comp.setPlaceHolder(str);
      }
    },
    mode(mode) {
      if (mode == oldProps.mode) return;
      if (mode === "password") {
        comp.setPasswordMode(true);
      } else if (oldProps.mode === "password") {
        comp.setPasswordMode(false);
      }
    },
    maxlength(len) {
      if (len === oldProps.maxlength) return;
      comp.setMaxLength(len);
    },
    onChange(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
    },
    onFocus(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_FOCUSED);
    },
    onBlur(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_DEFOCUSED);
    },
    onFocusStyle(styleSheet) {
      setStyle({
        comp,
        compName: "Input",
        styleType: 0x0002,
        oldStyleSheet: oldProps.onFocusStyle,
        styleSheet,
      });
    },
    value(str) {
      if (str !== oldProps.value) {
        comp.setText(str);
      }
    },
    autoKeyBoard(payload) {
      if (payload !== oldProps?.autoKeyBoard) {
        comp.setAutoKeyboard(payload);
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

/** A one line mode of Textarea */
export class InputComp extends NativeView {
  constructor({ uid }) {
    super({ uid });
    this.uid = uid;

    super.setOneLine(true);

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
  setProps(newProps: InputProps, oldProps: InputProps) {
    setInputProps(this, newProps, oldProps);
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
      compName: "Input",
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
