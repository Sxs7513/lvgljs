import { CommonComponentApi, CommonProps, OnChangeEvent } from "../common/index";
import {
  EDropdownListArrowDirection,
  EDropdownlistDirection,
  EVENTTYPE_MAP,
  STYLE_TYPE,
  handleEvent,
  setStyle,
  styleGetterProp,
} from "../config";

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeDropdownlist = bridge.NativeRender.NativeComponents.Dropdownlist;

export type DropdownListProps = CommonProps & {
  items: string[];
  arrow: typeof EDropdownListArrowDirection[keyof typeof EDropdownListArrowDirection];
  selectIndex: number;
  /** If the text is null the selected option is displayed on the items */
  text?: string;
  direction: typeof EDropdownlistDirection[keyof typeof EDropdownlistDirection];
  highlightSelect: boolean;
  onChange?: (event: OnChangeEvent) => void;
};

function setListProps(comp, newProps: DropdownListProps, oldProps: DropdownListProps) {
  const setter = {
    ...CommonComponentApi({
      compName: "Dropdownlist",
      comp,
      newProps,
      oldProps,
    }),
    items(items) {
      if (items !== oldProps.items && Array.isArray(items)) {
        comp.setItems(items, items.length);
      }
    },
    arrow(arrow) {
      if (arrow != oldProps.arrow && typeof arrow === "number") {
        comp.setArrowDir(arrow);
      }
    },
    selectIndex(selectIndex) {
      if (selectIndex !== oldProps.selectIndex) {
        comp.setselectIndex(selectIndex);
      }
    },
    text(text) {
      if (text !== oldProps.text) {
        comp.setText(text);
      }
    },
    direction(direction) {
      if (direction !== oldProps.direction) {
        comp.setDir(direction);
      }
    },
    highlightSelect(payload) {
      if (payload != oldProps.highlightSelect) {
        comp.setHighLightSelect(payload);
      }
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

export class DropdownlistComp extends NativeDropdownlist {
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
  setProps(newProps: DropdownListProps, oldProps: DropdownListProps) {
    setListProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "Dropdownlist";
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
      compName: "Dropdownlist",
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
