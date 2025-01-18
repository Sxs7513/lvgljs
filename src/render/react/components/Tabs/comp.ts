import { CommonComponentApi, CommonProps } from "../common/index";
import {
  EVENTTYPE_MAP,
  STYLE_TYPE,
  handleEvent,
  setStyle,
  styleGetterProp,
} from "../config";

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeTabs = bridge.NativeRender.NativeComponents.TabView;

export type TabsProps = CommonProps & {
  tabs: string[];
  tabPosition: "left" | "top" | "right" | "bottom";
  tabSize?: number;
};

function setTabsProps(comp, newProps: TabsProps, oldProps: TabsProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Tabs", comp, newProps, oldProps }),
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

const tabPositionObj = {
  left: 1 << 0,
  top: 1 << 2,
  right: 1 << 1,
  bottom: 1 << 3,
};

export class TabsComp extends NativeTabs {
  constructor({ uid, tabPosition, tabSize = 0 }) {
    tabPosition = tabPositionObj[tabPosition] || tabPositionObj.top;
    super({ uid, tabPosition, tabSize });
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
    this.currentAppendIndex = 0;
  }
  setProps(newProps: TabsProps, oldProps: TabsProps) {
    this.tabs = newProps.tabs;
    setTabsProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "Tabs";
  appendInitialChild(child) {
    this.appendChild(child);
  }
  appendChild(child) {
    this.setTab(this.tabs[this.currentAppendIndex] || "", child);
    this.currentAppendIndex++;
  }
  removeChild(child) {}
  close() {
    super.close();
  }
  setStyle(style, type = 0x0000) {
    setStyle({
      comp: this,
      styleSheet: style,
      compName: "Tabs",
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
