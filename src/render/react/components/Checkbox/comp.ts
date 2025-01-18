import { StyleProps } from "../../core/style";
import { CommonComponentApi, CommonProps, OnChangeEvent } from "../common/index";
import {
  EVENTTYPE_MAP,
  STYLE_TYPE,
  handleEvent,
  setStyle,
  styleGetterProp,
} from "../config";

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeView = bridge.NativeRender.NativeComponents.Checkbox;

export type CheckboxProps = CommonProps & {
  checked?: boolean;
  disabled?: boolean;
  text?: string;
  checkedStyle?: StyleProps;
  indicatorStyle?: StyleProps;
  indicatorCheckedStyle?: StyleProps;
  onChange?: (event: OnChangeEvent) => void;
};

function setCheckboxProps(comp, newProps: CheckboxProps, oldProps: CheckboxProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Checkbox", comp, newProps, oldProps }),
    checked(val) {
      if (val !== oldProps.checked) {
        comp.setChecked(val);
      }
    },
    disabled(val) {
      if (val !== oldProps.disabled) {
        comp.setDisabled(val);
      }
    },
    text(val) {
      if (val !== oldProps.text) {
        comp.setText(val);
      }
    },
    checkedStyle(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName: "Checkbox",
        styleType: STYLE_TYPE.STATE_CHECKED,
        oldStyleSheet: oldProps.checkedStyle,
      });
    },
    indicatorStyle(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName: "Checkbox",
        styleType: STYLE_TYPE.PART_INDICATOR,
        oldStyleSheet: oldProps.indicatorStyle,
      });
    },
    indicatorCheckedStyle(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName: "Checkbox",
        styleType: STYLE_TYPE.PART_INDICATOR | STYLE_TYPE.STATE_CHECKED,
        oldStyleSheet: oldProps.indicatorCheckedStyle,
      });
    },
    onChange(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
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

export class CheckboxComp extends NativeView {
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
  setProps(newProps: CheckboxProps, oldProps: CheckboxProps) {
    setCheckboxProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {
    this.insertChildBefore(child, beforeChild);
  }
  appendInitialChild(child) {
    this.appendChild(child);
  }
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
      compName: "Checkbox",
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
