import React from "react";
import IndexCard from "./components/indexCard";
import SetIndex from "./components/setIndex";
import Chart from "./components/chart";
import Identification from "./components/identification";
import ChartType from "./components/chartType";

// 左侧风格选项配置
export const styleOptions = [
  { text: "浅色", value: "1" },
  { text: "深色", value: "2" },
];

// 左侧布局选项配置
export const layoutOptions = [
  { text: "自由", value: "1" },
  { text: "固定", value: "2" },
];

// 左侧固定布局列数选项
export const columnsOptions = [
  { text: "一列", value: "1" },
  { text: "两列", value: "2" },
];

// 组件通用配置
export const commonSettings = {
  name: {
    title: "标题",
    type: "string",
  },
};

// 自定义组件
export const widgets = {
  IndexCard,
  SetIndex,
  Chart,
  Identification,
  ChartType,
};

/**
 * 各组件配置信息
 * 参考文档：https://x-render.gitee.io/playground/
 */
export const settings = [
  {
    title: "图表",
    widgets: [
      {
        text: "统计图",
        name: "charts",
        icon: <i className="iconfont icon-jurassic_chart"></i>,
        schema: {
          //   title: "统计图",
          type: "object",
          widget: "Chart",
        },
        setting: {
          width: {
            title: "图表所占宽度",
            type: "string",
            default: "100%",
            enum: ["50%", "100%"],
            enumNames: ["一列", "两列"],
          },
          chartType: {
            // title: "图表所占宽度",
            type: "string",
            default: "100%",
            widget: "ChartType",
          },
          index: {
            title: "指标",
            required: true,
            type: "array",
            widget: "SetIndex",
          },
          filter: {
            title: "过滤条件",
            type: "array",
            widget: "SetIndex",
          },
          attribute: {
            title: "属性",
            required: true,
            type: "array",
            widget: "SetIndex",
          },
          identity: {
            title: "唯一标识",
            type: "string",
            widget: "Identification",
          },
        },
      },
      {
        text: "表格",
        name: "table",
        schema: {
          title: "表格",
          type: "object",
        },
      },
      {
        text: "指标卡",
        name: "indexCard",
        schema: {
          title: "指标卡",
          type: "object",
          widget: "IndexCard",
        },
        setting: {
          width: {
            title: "指标卡所占宽度",
            type: "string",
            default: "100%",
            enum: ["50%", "100%"],
            enumNames: ["一列", "两列"],
          },
          index: {
            title: "指标",
            required: true,
            type: "array",
            widget: "SetIndex",
          },
          filter: {
            title: "过滤条件",
            type: "array",
            widget: "SetIndex",
          },
          formatConf: {
            title: "格式",
            type: "string",
            widget: "select",
            enum: ["1", "2", "3", "4"],
            enumNames: [
              "上标题下指标",
              "上指标下标题",
              "左标题右指标",
              "左指标右标题",
            ],
          },
          columns: {
            title: "每行列数",
            type: "string",
            widget: "select",
            enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
            enumNames: ["1", "2", "3", "4", "5", "6", "7", "8"],
          },
          isShowToolbar: {
            title: "显示侧边条",
            type: "boolean",
          },
          identity: {
            title: "唯一标识",
            type: "string",
            widget: "Identification",
          },
          isExport: {
            title: "导出",
            type: "boolean",
          },
        },
      },
    ],
  },
  {
    title: "查询",
    widgets: [
      {
        text: "查询框",
        name: "search",
        schema: {
          title: "查询框",
          type: "object",
          widget: "NewWidget",
        },
        setting: {
          api: { title: "api", type: "string" },
        },
      },
      {
        text: "时间筛选",
        name: "name",
        schema: {
          title: "输入框",
          type: "string",
        },
        setting: {
          maxLength: { title: "最长字数", type: "number" },
        },
      },
    ],
  },
];
