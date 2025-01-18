import { ArcStyle, ArcStyleType } from "./pipe/arc";
import { BackgroundStyle, BackgroundStyleType } from "./pipe/background";
import { BorderStyle, BorderStyleType } from "./pipe/border";
import { DisplayStyle, DisplayStyleType } from "./pipe/display";
import { FlexStyle, FlexStyleType } from "./pipe/flex";
import { GridStyle, GridStyleType } from "./pipe/grid";
import { LineStyle, LineStyleType } from "./pipe/line";
import { MiscStyle, MiscStyleType } from "./pipe/misc";
import { OpacityStyle, OpacityStyleProp } from "./pipe/opacity";
import { OutlineStyle, OutlineStyleType } from "./pipe/outline";
import { PaddingStyle, PaddingStyleType } from "./pipe/padding";
import { PosStyle, PosStyleType } from "./pipe/pos";
import { ScrollStyle, ScrollStyleType } from "./pipe/scoll";
import { ShadowStyle, ShadowStyleType } from "./pipe/shadow";
import { TextStyle, TextStyleType } from "./pipe/text";
import { TransStyle, TransStyleType } from "./pipe/trans";
import { PostProcessStyle } from "./post";

class StyleSheet {
  static transformStyle: (style, compName) => {};

  static pipeline(args: any[]) {
    StyleSheet.transformStyle = (style, compName) => {
      const result = {};
      args.reduce((_, func) => func(style, result, compName), null);
      return result;
    };
  }

  static transform(style, compName) {
    const result = StyleSheet.transformStyle(style, compName);

    return result;
  }

  static create() {
    return new Proxy(
      { __dirty: true },
      {
        set(obj, prop, value) {
          if (prop !== "__dirty") {
            obj[prop] = value;
            obj.__dirty = true;
          } else {
            obj.__dirty = value;
          }
        },
      },
    );
  }
}

StyleSheet.pipeline([
  FlexStyle,
  GridStyle,
  TextStyle,
  OutlineStyle,
  BorderStyle,
  PosStyle,
  BackgroundStyle,
  PaddingStyle,
  ScrollStyle,
  OpacityStyle,
  MiscStyle,
  TransStyle,
  LineStyle,
  ShadowStyle,
  DisplayStyle,
  ArcStyle,
]);

export function setStyle({
  comp,
  styleSheet,
  compName,
  styleType,
  oldStyleSheet,
  isInit = true,
  defaultStyle = {},
}: {
  comp: any;
  styleSheet: StyleProps;
  compName: string;
  styleType: number;
  oldStyleSheet: StyleProps| null;
  isInit?: boolean;
  defaultStyle?: any;
}) {
  if (!styleSheet) return;
  styleSheet = Array.isArray(styleSheet) ? styleSheet : [styleSheet];
  oldStyleSheet = Array.isArray(oldStyleSheet)
    ? oldStyleSheet
    : [oldStyleSheet];
  const maybeChange = styleSheet.some((item, i) => item !== oldStyleSheet[i]);

  if (!maybeChange) return;
  styleSheet = Object.assign({}, defaultStyle, ...styleSheet);
  const result = StyleSheet.transform(styleSheet, compName);

  const keys = Object.keys(result);
  comp.nativeSetStyle(result, keys, keys.length, styleType, isInit);
  PostProcessStyle({ comp, styleSheet, styleType });
}

type StyleType = 
& ArcStyleType
& BackgroundStyleType
& BorderStyleType
& (DisplayStyleType | FlexStyleType | GridStyleType)
& LineStyleType
& MiscStyleType
& OpacityStyleProp
& OutlineStyleType
& PaddingStyleType
& PosStyleType
& ScrollStyleType
& ShadowStyleType
& TextStyleType
& TransStyleType;

export type StyleProps =  StyleType | StyleType[];