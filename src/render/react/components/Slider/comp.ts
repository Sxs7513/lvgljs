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
const NativeSlider = bridge.NativeRender.NativeComponents.Slider;

export type SliderProps = CommonProps & {
  indicatorStyle?: StyleProps;
  onIndicatorPressedStyle?: StyleProps;
  knobStyle?: StyleProps;
  onKnobPressedStyle?: StyleProps;
  onChange?: (event: OnChangeEvent) => void;
  range: [number, number];
  /** Must be within the defined range */
  value: number;
};

function setSliderProps(comp, newProps: SliderProps, oldProps: SliderProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Slider", comp, newProps, oldProps }),
    indicatorStyle(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName: "Slider",
        styleType: STYLE_TYPE.PART_INDICATOR,
        oldStyleSheet: oldProps.indicatorStyle,
      });
    },
    onIndicatorPressedStyle(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName: "Slider",
        styleType: STYLE_TYPE.PART_INDICATOR | STYLE_TYPE.STATE_PRESSED,
        oldStyleSheet: oldProps.onIndicatorPressedStyle,
      });
    },
    onPressedStyle(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName: "Slider",
        styleType: STYLE_TYPE.STATE_PRESSED,
        oldStyleSheet: oldProps.onPressedStyle,
      });
    },
    knobStyle(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName: "Slider",
        styleType: STYLE_TYPE.PART_KNOB,
        oldStyleSheet: oldProps.knobStyle,
      });
    },
    onKnobPressedStyle(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName: "Slider",
        styleType: STYLE_TYPE.PART_KNOB | STYLE_TYPE.STATE_PRESSED,
        oldStyleSheet: oldProps.onKnobPressedStyle,
      });
    },
    onChange(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_VALUE_CHANGED);
    },
    range(arr) {
      if (!Array.isArray(arr)) return;
      const [min, max] = arr;
      if (min === oldProps.range?.[0] && max === oldProps.range?.[1]) return;
      if (isNaN(min) || isNaN(max)) return;
      comp.setRange([min, max]);
    },
    value(val) {
      if (isNaN(val)) return;
      if (val == oldProps.value) return;
      comp.setValue(val);
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

export class SliderComp extends NativeSlider {
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
  setProps(newProps: SliderProps, oldProps: SliderProps) {
    setSliderProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "Slider";
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
      compName: "Slider",
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
