import { StyleProps } from "../../core/style";
import { colorTransform } from "../../core/style/color";
import { CommonComponentApi, CommonProps } from "../common/index";
import {
  EVENTTYPE_MAP,
  STYLE_TYPE,
  handleEvent,
  setStyle,
  styleGetterProp,
} from "../config";

const bridge = globalThis[Symbol.for('lvgljs')];
const NativeChart = bridge.NativeRender.NativeComponents.Chart;

const chartType = {
  none: 0,
  line: 1,
  bar: 2,
  scatter: 3,
};

export type ChartProps = CommonProps & {
  onPressedStyle?: StyleProps;
  indicatorStyle?: StyleProps;
  pointStyle?: StyleProps;
  itemStyle?: StyleProps;
  type?: string;
  divLineCount?: [number, number];
  pointNum?: number;
  scatterData?: any[];
  leftAxisOption?: any;
  leftAxisData?: any[];
  bottomAxisOption?: any;
  bottomAxisData?: any[];
  rightAxisOption?: any;
  rightAxisData?: any[];
  topAxisOption?: any;
  topAxisData?: any[];
  leftAxisLabels?: any[];
  rightAxisLabels?: any[];
  topAxisLabels?: any[];
  bottomAxisLabels?: any[];
  leftAxisRange?: [number, number];
  rightAxisRange?: [number, number];
  topAxisRange?: [number, number];
  bottomAxisRange?: [number, number];
};

function setChartProps(comp, newProps: ChartProps, oldProps: ChartProps) {
  const setter = {
    ...CommonComponentApi({ compName: "Chart", comp, newProps, oldProps }),
    onPressedStyle(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName: "Chart",
        styleType: STYLE_TYPE.STATE_PRESSED,
        oldStyleSheet: oldProps.onPressedStyle,
      });
    },
    indicatorStyle(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName: "Chart",
        styleType: STYLE_TYPE.PART_INDICATOR,
        oldStyleSheet: oldProps.pointStyle,
      });
    },
    itemStyle(styleSheet) {
      setStyle({
        comp,
        styleSheet,
        compName: "Chart",
        styleType: STYLE_TYPE.PART_ITEMS,
        oldStyleSheet: oldProps.pointStyle,
      });
    },
    type(type) {
      if (chartType[type] !== void 0) {
        comp.setType(chartType[type]);
      }
    },
    divLineCount(arr) {
      if (
        arr?.[0] !== oldProps?.divLineCount?.[0] ||
        arr?.[1] !== oldProps?.divLineCount?.[1]
      ) {
        comp.setDivLineCount(arr);
      }
    },
    pointNum(num) {
      if (num !== oldProps?.pointNum) {
        comp.setPointNum(num);
      }
    },
    scatterData(data) {
      if (data !== oldProps?.scatterData) {
        data = data.map((item) => {
          const arr = [];
          item.data.forEach((item1) => {
            arr.push(item1[0]);
            arr.push(item1[1]);
          });
          return {
            color: item.color === void 0 ? -1 : colorTransform(item.color),
            data: arr,
          };
        });

        comp.setScatterData(data);
      }
    },
    leftAxisOption(options) {
      if (
        options.majorLen == void 0 ||
        options.minorLen == void 0 ||
        options.majorNum == void 0 ||
        options.minorNum == void 0 ||
        !options.drawSize
      ) {
        return;
      }
      if (options != oldProps?.leftAxisOption) {
        comp.setLeftAxisOption(options);
      }
    },
    leftAxisData(data) {
      if (data !== oldProps?.leftAxisData) {
        data = data.map((item) => ({
          ...item,
          color: item.color === void 0 ? -1 : colorTransform(item.color),
        }));
        comp.setLeftAxisData(data);
      }
    },
    bottomAxisOption(options) {
      if (
        options.majorLen == void 0 ||
        options.minorLen == void 0 ||
        options.majorNum == void 0 ||
        options.minorNum == void 0 ||
        !options.drawSize
      ) {
        return;
      }

      if (options != oldProps?.bottomAxisOption) {
        comp.setBottomAxisOption(options);
      }
    },
    bottomAxisData(data) {
      if (data !== oldProps?.bottomAxisData) {
        data = data.map((item) => ({
          ...item,
          color: item.color === void 0 ? -1 : colorTransform(item.color),
        }));
        comp.setBottomAxisData(data);
      }
    },
    rightAxisOption(options) {
      if (
        options.majorLen == void 0 ||
        options.minorLen == void 0 ||
        options.majorNum == void 0 ||
        options.minorNum == void 0 ||
        !options.drawSize
      ) {
        return;
      }

      if (options != oldProps?.rightAxisOption) {
        comp.setRightAxisOption(options);
      }
    },
    rightAxisData(data) {
      if (data !== oldProps?.rightAxisData) {
        data = data.map((item) => ({
          ...item,
          color: item.color === void 0 ? -1 : colorTransform(item.color),
        }));
        comp.setRightAxisData(data);
      }
    },
    topAxisOption(options) {
      if (
        options.majorLen == void 0 ||
        options.minorLen == void 0 ||
        options.majorNum == void 0 ||
        options.minorNum == void 0 ||
        !options.drawSize
      ) {
        return;
      }

      if (options != oldProps?.topAxisOption) {
        comp.setTopAxisOption(options);
      }
    },
    topAxisData(data) {
      if (data !== oldProps?.topAxisData) {
        data = data.map((item) => ({
          ...item,
          color: item.color === void 0 ? -1 : colorTransform(item.color),
        }));
        comp.setTopAxisData(data);
      }
    },
    leftAxisLabels(arr) {
      if (arr !== oldProps?.leftAxisLabels) {
        comp.setLeftAxisLabels(arr);
      }
    },
    rightAxisLabels(arr) {
      if (arr !== oldProps?.rightAxisLabels) {
        comp.setRightAxisLabels(arr);
      }
    },
    topAxisLabels(arr) {
      if (arr !== oldProps?.topAxisLabels) {
        comp.setTopAxisLabels(arr);
      }
    },
    bottomAxisLabels(arr) {
      if (arr !== oldProps?.bottomAxisLabels) {
        comp.setBottomAxisLabels(arr);
      }
    },
    leftAxisRange(arr) {
      if (
        arr?.[0] !== oldProps?.leftAxisRange?.[0] ||
        arr?.[1] !== oldProps?.leftAxisRange?.[1]
      ) {
        comp.setLeftAxisRange(arr);
      }
    },
    rightAxisRange(arr) {
      if (
        arr?.[0] !== oldProps?.rightAxisRange?.[0] ||
        arr?.[1] !== oldProps?.rightAxisRange?.[1]
      ) {
        comp.setRightAxisRange(arr);
      }
    },
    topAxisRange(arr) {
      if (
        arr?.[0] !== oldProps?.topAxisRange?.[0] ||
        arr?.[1] !== oldProps?.topAxisRange?.[1]
      ) {
        comp.setTopAxisRange(arr);
      }
    },
    bottomAxisRange(arr) {
      if (
        arr?.[0] !== oldProps?.bottomAxisRange?.[0] ||
        arr?.[1] !== oldProps?.bottomAxisRange?.[1]
      ) {
        comp.setBottomAxisRange(arr);
      }
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
  // This gives issues: invalid call to setPointNum?
  // comp.refresh();
}

export class ChartComp extends NativeChart {
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
  setProps(newProps: ChartProps, oldProps: ChartProps) {
    setChartProps(this, newProps, oldProps);
  }
  insertBefore(child, beforeChild) {}
  static tagName = "Chart";
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
      compName: "Chart",
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
