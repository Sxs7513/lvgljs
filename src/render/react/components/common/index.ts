import * as React from "react";
import {
  EAlignType,
  EVENTTYPE_MAP,
  STYLE_TYPE,
  handleEvent,
  setStyle,
  styleGetterProp,
} from "../config";
import { StyleProps } from "../../core/style";

export type CommonProps = {
  style?: StyleProps;
  /** Align takes priority over  */
  align?: {
    type?: typeof EAlignType[keyof typeof EAlignType];
    /** Defines the x,y position */
    pos?: [number, number];
  };
  alignTo?: {
    type?: typeof EAlignType[keyof typeof EAlignType];
    /** Defines the x,y position */
    pos?: [number, number];
    /** Pass the component instance by React ref */
    parent: any;
  };
  scrollbarStyle?: StyleProps;
  onScrollbarPressedStyle?: StyleProps;
  scrollbarScrollingStyle?: StyleProps;
  onPressedStyle?: StyleProps;
  onReleasedStyle?: StyleProps;
  children?: React.ReactNode;
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
  onPressLost?: (event: {
    target: any,
    currentTarget: any,
    stopPropogation: () => void,
  }) => void;
  onReleased?: (event: {
    target: any,
    currentTarget: any,
    stopPropogation: () => void,
  }) => void;
};

export type OnChangeEvent = {
  target: any,
  currentTarget: any,
  stopPropogation: () => void,
  value: number,
}

export type OnClickEvent = {
  target: any,
  currentTarget: any,
  stopPropogation: () => void,
}

export const CommonComponentApi = function ({
  compName,
  comp,
  newProps,
  oldProps,
}: {compName: any, comp: any, newProps: CommonProps, oldProps: CommonProps}) {
  return {
    style(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName,
        styleType: STYLE_TYPE.PART_MAIN,
        oldStyleSheet: oldProps.style,
      });
    },
    align({ type, pos = [0, 0] }) {
      if (
        !type ||
        (type === oldProps.align?.type &&
          newProps.align?.pos?.[0] === oldProps.align?.pos?.[0] &&
          newProps.align?.pos?.[1] === oldProps.align?.pos?.[1])
      )
        return;
      comp.align(type, pos);
    },
    alignTo({ type, pos = [0, 0], parent }) {
      if (
        !type ||
        (type === oldProps.alignTo?.type &&
          newProps.alignTo?.pos?.[0] === oldProps.alignTo?.pos?.[0] &&
          newProps.alignTo?.pos?.[1] === oldProps.alignTo?.pos?.[1] &&
          parent?.uid === oldProps.alignTo?.parent?.uid)
      )
        return;
      comp.alignTo(type, pos, parent);
    },
    scrollbarStyle(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName,
        styleType: STYLE_TYPE.PART_SCROLLBAR,
        oldStyleSheet: oldProps.scrollbarStyle,
      });
    },
    onScrollbarPressedStyle(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName,
        styleType: STYLE_TYPE.PART_SCROLLBAR | STYLE_TYPE.STATE_PRESSED,
        oldStyleSheet: oldProps.onScrollbarPressedStyle,
      });
    },
    onScrollbarScrollingStyle(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName,
        styleType: STYLE_TYPE.PART_SCROLLBAR | STYLE_TYPE.STATE_SCROLLED,
        oldStyleSheet: oldProps.scrollbarScrollingStyle,
      });
    },
    onPressedStyle(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName,
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
    onPressLost(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_PRESS_LOST);
    },
    onReleased(fn) {
      handleEvent(comp, fn, EVENTTYPE_MAP.EVENT_RELEASED);
    },
  };
};
