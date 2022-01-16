// import React from "react";
// import { Button } from "antd";

export const widget = {
  text: '统计图',
  name: 'charts',
  icon: <i className="iconfont icon-jurassic_chart"></i>,
  schema: {
    //   title: "统计图",
    type: 'object',
    widget: 'Chart',
  },
  setting: {
    width: {
      title: '图表所占宽度',
      type: 'string',
      default: '100%',
      enum: ['50%', '100%'],
      enumNames: ['一列', '两列'],
    },
    chartType: {
      // title: "图表所占宽度",
      type: 'string',
      default: '100%',
      widget: 'ChartType',
    },
    index: {
      title: '指标',
      required: true,
      type: 'array',
      widget: 'SetIndex',
    },
    filter: {
      title: '过滤条件',
      type: 'array',
      widget: 'SetIndex',
    },
    attribute: {
      title: '属性',
      required: true,
      type: 'array',
      widget: 'SetIndex',
    },
    identity: {
      title: '唯一标识',
      type: 'string',
      widget: 'Identification',
    },
  },
}

// 统计图
function StatisticalChart({ value, onChange }) {
  return (
    <div style={{ height: '100px', background: '#ccc' }}>统计图组件占位……</div>
  )
}
export default StatisticalChart
