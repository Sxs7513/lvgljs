import { ColorType } from "../color";
import { ProcessColor, ProcessEnum, ProcessPx } from "../util";

const builtInFontList = [
  8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46,
  48,
];

const obj = {
  "text-color": ProcessColor,
  "letter-spacing": ProcessPx,
  "line-spacing": ProcessPx,
  "text-overflow": ProcessEnum({
    ellipsis: 1,
    clip: 4,
    auto: 0,
    scroll: 2,
    circular: 3,
  }),
  "text-align": ProcessEnum({
    auto: 0,
    left: 1,
    center: 2,
    right: 3,
  }),
  "text-decoration": ProcessEnum({
    none: 0,
    underline: 1,
    strikethrough: 2,
  }),
  "font-size": ProcessPx,
};
const keys = Object.keys(obj);

export type TextStyleType = {
  "text-color"?: ColorType;
  "letter-spacing"?: number;
  "line-spacing"?: number;
  "text-overflow"?: "ellipsis" | "clip" | "auto" | "scroll" | "circular";
  "text-align"?: "auto" | "left" | "center" | "right";
  "text-decoration"?: "none" | "underline" | "strikethrough";
  "font-size"?: number | string;
}

export function TextStyle(style: TextStyleType, result, compName) {
  keys.forEach((key) => {
    if (style[key] !== void 0) {
      obj[key](key, style[key], result);
    }
  });

  if (style["font-size"]) {
    let size = style["font-size"];

    if (typeof size == "string") {
      const reg = /(\d+\.?\d*)(px)?$/;
      size = size.replace(/(^\s*)|(\s*$)/g, "").match(reg)?.[1];
    }

    if (isNaN(size)) return result;

    if (size % 2 == 1) {
      size += 1;
    }
    size = Math.min(
      builtInFontList[builtInFontList.length - 1],
      Math.max(builtInFontList[0], size),
    );

    if (compName === "Text") {
      result["font-size"] = builtInFontList.indexOf(size);
    } else {
      result["font-size-1"] = builtInFontList.indexOf(size);
    }
  }
}
