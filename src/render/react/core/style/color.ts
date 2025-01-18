export const builtinColor = {
  red: 0xf44336,
  pink: 0xe91e63,
  purple: 0x9c27b0,
  "deep-purple": 0x673ab7,
  indigo: 0x3f51b5,
  blue: 0x2196f3,
  "light-blue": 0x03a9f4,
  cyan: 0x00bcd4,
  teal: 0x009688,
  green: 0x4caf50,
  "light-green": 0x8bc34a,
  lime: 0xcddc39,
  yellow: 0xffeb3b,
  amber: 0xffc107,
  orange: 0xff9800,
  "deep-orange": 0xff5722,
  brown: 0x795548,
  "blue-grey": 0x607d8b,
  grey: 0x9e9e9e,
  white: 0xffffff,
  black: 0,
};

/** Either one of the builtin colors or a hex code representing the color e.g. `#ffffff` for white */
export type ColorType = keyof typeof builtinColor | `#${string}`;

export const colorTransform = (data) => {
  if (builtinColor[data]) {
    return builtinColor[data];
  }
  data = data.replace(/(^\s*)|(\s*$)/g, "");
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(data)) {
    const aColor = data.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    let num = "0x";
    for (let i = 0; i < aColor.length; i++) {
      let hex = Number(aColor[i]).toString(16);
      if (hex.length < 2) {
        hex = "0" + hex;
      }
      num += hex;
    }
    if (num.length !== 8) {
      num = "";
    }
    return num;
  } else if (reg.test(data)) {
    const aNum = data.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return Number(`0x${data.substring(1)}`);
    } else if (aNum.length === 3) {
      let num = "0x";
      for (let i = 0; i < aNum.length; i += 1) {
        num += aNum[i] + aNum[i];
      }
      return Number(num);
    }
  }
  return "";
};
