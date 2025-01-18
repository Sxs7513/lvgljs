import {
  NormalizePx,
  NormalizeTime,
  ProcessDeg,
  ProcessPx,
  ProcessScale,
} from "../util";

const timing_function = [
  "linear",
  "ease-in",
  "ease-out",
  "ease-in-out",
  "overshoot",
  "bounce",
  "step",
];

const LV_STYLE_PROP_LAYOUT_REFR = 1 << 12;
const LV_STYLE_PROP_EXT_DRAW = 1 << 11;
const LV_STYLE_PROP_PARENT_LAYOUT_REFR = 1 << 13;
const LV_STYLE_PROP_FILTER = 1 << 14;
const LV_STYLE_PROP_INHERIT = 1 << 10;

const transitionProperty = {
  /*Group 0*/
  width: 1,
  "min-width": 2,
  "max-width": 3,
  height: 4,
  "min-height": 5,
  "max-height": 6,
  left: 7,
  top: 8,
  align: 9,
  display: 10,
  "border-radius": 11,

  /*Group 1*/
  "padding-top": 16,
  "padding-bottom": 17,
  "padding-left": 18,
  "padding-right": 19,
  "padding-row": 20,
  "padding-column": 21,
  "base-dir": 22,
  "clip-corner": 23,

  /*Group 2*/
  "background-color": 32,
  "background-opacity": 33,
  "background-grad-color": 34,
  "background-grad-dir": 35,
  "background-main-stop": 36,
  "background-grad-stop": 37,
  "background-grad": 38,
  "background-dither-mode": 39,

  "background-image": 40,
  "background-image-opacity": 41,
  "background-image-recolor": 42,
  "background-image-recolor-opacity": 43,
  "background-image-tiled": 44,

  /*Group 3*/
  "border-color": 48,
  "border-opacity": 49,
  "border-width": 50,
  "border-side": 51,
  "boder-post": 52,

  "outline-width": 53,
  "outline-color": 54,
  "outline-opacity": 55,
  "outline-padding": 56,

  "shadow-width": 64,
  "shadow-ofs-x": 65,
  "shadow-ofs-y": 66,
  "shadow-spread": 67,
  "shadow-color": 68,
  "shadow-opacity": 69,

  "img-opacity": 70,
  "img-recolor": 71,
  "img-recolor-opacity": 72,

  "line-width": 73,
  "line-dash-width": 74,
  "line-dash-gap": 75,
  "line-rounded": 76,
  "line-color": 77,
  "line-opacity": 78,

  "arc-width": 80,
  "arc-rounded": 81,
  "arc-color": 82,
  "arc-opacity": 83,
  "arc-image": 84,

  "text-color": 85,
  "text-opacity": 86,
  "font-size": 87,
  "letter-spacing": 88,
  "line-height": 89,
  "text-decor": 90,
  "text-align": 91,

  opacity: 96,
  "color-filter-dsc": 97,
  "color-filter-opacity": 98,
  animate: 99,
  "animate-time": 100,
  "animate-speed": 101,
  transition: 102,
  "blend-mode": 103,
  "transform-width": 104,
  "transform-height": 105,
  "translate-x": 106,
  "translate-y": 107,
  "transform-scale": 108,
  "transform-rotate": 109,
  "transform-pivot-x": 110,
  "transform-pivot-y": 111,
};

// const transitionProperty = {
//     /*Group 0*/
//     'width': 1 | LV_STYLE_PROP_LAYOUT_REFR,
//     'min-width': 2 | LV_STYLE_PROP_LAYOUT_REFR,
//     'max-width': 3 | LV_STYLE_PROP_LAYOUT_REFR,
//     'height': 4 | LV_STYLE_PROP_LAYOUT_REFR,
//     'min-height': 5 | LV_STYLE_PROP_LAYOUT_REFR,
//     'max-height': 6 | LV_STYLE_PROP_LAYOUT_REFR,
//     'left': 7 | LV_STYLE_PROP_LAYOUT_REFR,
//     'top': 8 | LV_STYLE_PROP_LAYOUT_REFR,
//     'align': 9 | LV_STYLE_PROP_LAYOUT_REFR,
//     'transform-width': 10 | LV_STYLE_PROP_EXT_DRAW,
//     'transform-height': 11 | LV_STYLE_PROP_EXT_DRAW,
//     'translateX': 12 | LV_STYLE_PROP_LAYOUT_REFR | LV_STYLE_PROP_PARENT_LAYOUT_REFR,
//     'translateY': 13 | LV_STYLE_PROP_LAYOUT_REFR | LV_STYLE_PROP_PARENT_LAYOUT_REFR,
//     'scale': 14 | LV_STYLE_PROP_EXT_DRAW | LV_STYLE_PROP_LAYOUT_REFR | LV_STYLE_PROP_PARENT_LAYOUT_REFR,
//     'rotate': 15 | LV_STYLE_PROP_EXT_DRAW | LV_STYLE_PROP_LAYOUT_REFR | LV_STYLE_PROP_PARENT_LAYOUT_REFR,

//     /*Group 1*/
//     'padding-top': 16 | LV_STYLE_PROP_EXT_DRAW | LV_STYLE_PROP_LAYOUT_REFR,
//     'padding-bottom': 17 | LV_STYLE_PROP_EXT_DRAW | LV_STYLE_PROP_LAYOUT_REFR,
//     'padding-left': 18 | LV_STYLE_PROP_EXT_DRAW | LV_STYLE_PROP_LAYOUT_REFR,
//     'padding-right': 19 | LV_STYLE_PROP_EXT_DRAW | LV_STYLE_PROP_LAYOUT_REFR,
//     'padding-row': 20 | LV_STYLE_PROP_EXT_DRAW | LV_STYLE_PROP_LAYOUT_REFR,
//     'padding-column': 21 | LV_STYLE_PROP_EXT_DRAW | LV_STYLE_PROP_LAYOUT_REFR,

//     /*Group 2*/
//     'background-color': 32,
//     'background-color-filter': 32 | LV_STYLE_PROP_FILTER,
//     'backgroun-opacity': 33,
//     'background-grad-color': 34,
//     'background-grad-color-filter': 34 | LV_STYLE_PROP_FILTER,
//     'background-grad-dir': 35,
//     'background-main-stop': 36,
//     'background-grad-stop': 37,
//     'background-grad': 38,
//     'background-dither-mode': 39,

//     'background-image': 40 | LV_STYLE_PROP_EXT_DRAW,
//     'background-image-opacity': 41,
//     'background-image-recolor': 42,
//     'background-image-recolor-filter': 42 | LV_STYLE_PROP_FILTER,
//     'background-image-recolor-opacity': 43,
//     'background-image-tiled': 44,

//     /*Group 3*/
//     'border-color': 48,
//     'border-color-filter': 48 | LV_STYLE_PROP_FILTER,
//     'border-opacity': 49,
//     'border-width': 50 | LV_STYLE_PROP_LAYOUT_REFR,
//     'border-side': 51,
//     'boder-post': 52,

//     'outline-width': 58 | LV_STYLE_PROP_EXT_DRAW,
//     'outline-color': 59,
//     'outline-color-filter': 59 | LV_STYLE_PROP_FILTER,
//     'outline-opacity': 60 | LV_STYLE_PROP_EXT_DRAW,
//     'outline-padding': 61 | LV_STYLE_PROP_EXT_DRAW,

//     'shadow-width': 64 | LV_STYLE_PROP_EXT_DRAW,
//     'shadow-ofs-x': 65 | LV_STYLE_PROP_EXT_DRAW,
//     'shadow-ofs-y': 66 | LV_STYLE_PROP_EXT_DRAW,
//     'shadow-spread': 67 | LV_STYLE_PROP_EXT_DRAW,
//     'shadow-color': 68,
//     'shadow-color-filtered': 68 | LV_STYLE_PROP_FILTER,
//     'shadow-opacity': 69 | LV_STYLE_PROP_EXT_DRAW,

//     'img-opacity': 70,
//     'img-recolor': 71,
//     'img-recolor-filtered': 71 | LV_STYLE_PROP_FILTER,
//     'img-recolor-filtered-opacity': 72,

//     'line-width': 73 | LV_STYLE_PROP_EXT_DRAW,
//     'line-dash-width': 74,
//     'line-dash-gap': 75,
//     'line-rounded': 76,
//     'line-color': 77,
//     'line-color-filtered': 77 | LV_STYLE_PROP_FILTER,
//     'line-opacity': 78,

//     'arc-width': 80 | LV_STYLE_PROP_EXT_DRAW,
//     'arc-rounded': 81,
//     'arc-color': 82,
//     'arc-color-filtered': 82 | LV_STYLE_PROP_FILTER,
//     'arc-opacity': 83,
//     'arc-image': 84,

//     'text-color': 87 | LV_STYLE_PROP_INHERIT,
//     'text-color-filtered': 87 | LV_STYLE_PROP_INHERIT | LV_STYLE_PROP_FILTER,
//     'text-opacity': 88 | LV_STYLE_PROP_INHERIT,
//     'font-size': 89 | LV_STYLE_PROP_INHERIT | LV_STYLE_PROP_LAYOUT_REFR,
//     'letter-spacing': 90 | LV_STYLE_PROP_INHERIT | LV_STYLE_PROP_LAYOUT_REFR,
//     'line-height': 91 | LV_STYLE_PROP_INHERIT | LV_STYLE_PROP_LAYOUT_REFR,
//     'text-decor': 92 | LV_STYLE_PROP_INHERIT,
//     'text-align': 93 | LV_STYLE_PROP_INHERIT | LV_STYLE_PROP_LAYOUT_REFR,

//     'border-radius': 96,
//     'clip-corner': 97,
//     'opacity': 98 | LV_STYLE_PROP_INHERIT,
//     'color-filter-dsc': 99,
//     'color-filter-opacity': 100,
//     'animate-time': 101,
//     'animate-speed': 102
// }

const transformSupportKeys = [
  "translate",
  "translate-x",
  "translate-y",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "transform-width",
  "transform-height",
];

export type TransStyleType = {
  transition?: string;
  transform?: string;
  "transform-origin"?: string;
};

export function TransStyle(style: TransStyleType, result, compName) {
  if (style["transition-property"]) {
    let properties = style["transition-property"];
    properties = properties
      .split(",")
      .map((item) => item.replace(/\s/, ""))
      .map((item) => transitionProperty[item])
      .filter((item) => !!item);

    const duration = style["transition-duration"] || 0;
    const func = style["transition-timing-function"] || "linear";
    const delay = style["transition-delay"] || 0;

    const trans = [
      properties.length,
      properties,
      NormalizeTime(duration),
      func,
      delay,
    ];
    result["transition"] = trans;
  }

  if (style["transform"]) {
    let value = style["transform"];
    value = value.match(/[a-zA-Z\-]+\([^\(]+\)/g);
    const reg = /^([a-zA-Z\-]+)\((.+)\)$/;
    value &&
      value.forEach((item) => {
        let [_, prop, val] = item.match(reg);
        if (transformSupportKeys.includes(prop) && val) {
          if (prop == "translate") {
            val = val.split(",");
            ProcessPx("translateX", val[0], result);
            ProcessPx("translateY", val[1], result);
          } else if (prop == "scale") {
            if (compName === "Image") {
              prop = `img-${prop}`;
            }
            ProcessScale(prop, val, result);
          } else if (prop == "rotate") {
            if (compName === "Image") {
              prop = `img-${prop}`;
            }
            ProcessDeg(prop, val, result);
          } else if (
            (prop == "scaleX" || prop == "scaleY") &&
            compName == "Chart"
          ) {
            ProcessScale(`chart-${prop}`, val, result);
          } else {
            if (compName === "Image") {
              prop = `img-${prop}`;
            }
            ProcessPx(prop, val, result);
          }
        }
      });
  }

  if (style["transform-origin"] && compName === "Image") {
    const [x, y] = style["transform-origin"].trim()?.split(" ");
    result["img-origin"] = [NormalizePx(+x), NormalizePx(+y)];
  }
  return result;
}
