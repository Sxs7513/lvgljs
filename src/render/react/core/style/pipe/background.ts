import { ColorType } from "../color";
import { ProcessColor, ProcessEnum } from "../util";

const obj = {
  "background-color": ProcessColor,
  "background-grad-color": ProcessColor,
  "background-grad-color-dir": ProcessEnum({
    none: 0,
    vertical: 1,
    horizontal: 2,
  }),
};
const keys = Object.keys(obj);

export type BackgroundStyleType = {
  "background-color"?: ColorType;
  "background-grad-color"?: ColorType;
  "background-grad-color-dir"?: "none" | "vertical" | "horizontal";
};

export function BackgroundStyle(style: BackgroundStyleType, result, compName) {
  keys.forEach((key) => {
    if (style[key] !== void 0) {
      obj[key](key, style[key], result);
    }
  });
}
