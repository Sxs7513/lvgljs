import { PixelOrPercent, ProcessEnum, ProcessPx, ProcessPxOrPercent } from "../util";

const obj = {
  height: ProcessPxOrPercent,
  "max-height": ProcessPxOrPercent,
  "min-height": ProcessPxOrPercent,
  width: ProcessPxOrPercent,
  "max-width": ProcessPxOrPercent,
  "min-width": ProcessPxOrPercent,
  left: ProcessPxOrPercent,
  top: ProcessPxOrPercent,
  "row-spacing": ProcessPxOrPercent,
  "column-spacing": ProcessPxOrPercent,
  position: ProcessEnum({
    absolute: "absolute",
    fixed: "fixed",
  }),
};
const keys = Object.keys(obj);

export type PosStyleType = {
  height?: PixelOrPercent;
  "max-height"?: PixelOrPercent;
  "min-height"?: PixelOrPercent;
  width?: PixelOrPercent;
  "max-width"?: PixelOrPercent;
  "min-width"?: PixelOrPercent;
  left?: PixelOrPercent;
  top?: PixelOrPercent;
  "row-spacing"?: PixelOrPercent;
  "column-spacing"?: PixelOrPercent;
  position?: "absolute" | "fixed";
};

export function PosStyle(style: PosStyleType, result, compName) {
  keys.forEach((key) => {
    if (style[key] !== void 0) {
      obj[key](key, style[key], result);
    }
  });
}
