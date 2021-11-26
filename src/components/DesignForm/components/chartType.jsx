import React from "react";
import { Tabs } from "antd";
import styled from "@emotion/styled";

const { TabPane } = Tabs;

const ItemsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;
const ItemsButton = styled.div`
  width: 134px;
  background: ${(props) => (props.isActive ? "#F0F4FF" : "#F5F5F5")};
  border-radius: 4px;
  line-height: 40px;
  font-size: 14px;
  color: ${(props) => (props.isActive ? "#376BFF" : "#999999")};
  margin-bottom: 10px;
  text-align: center;
  transition: color 0.1s;
  cursor: pointer;
  span {
    padding-left: 10px;
  }
  &:hover {
    color: #376bff;
  }
  .iconfont {
    font-size: 18px;
  }
`;

const normalOptions = [
  { text: "柱状图", value: "1", icon: "icon-jurassic_chart" },
  { text: "折线图", value: "2", icon: "icon-areachart" },
  { text: "折线图", value: "3", icon: "icon-chartpie-fill" },
];

// icon待完善
const otherOptions = [
  { text: "实时折线图", value: "4", icon: "icon-chartpie-fill" },
  { text: "历史折线图", value: "5", icon: "icon-chartpie-fill" },
];

// 统计图
function ChartType({ value, onChange }) {
  console.log(value, "value--");
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="常规统计图" key="1">
        <ItemsSection>
          {normalOptions.map((item) => (
            <ItemsButton
              key={item.value}
              isActive={value === item.value}
              onClick={() => onChange(item.value)}
            >
              <i className={`iconfont ${item.icon}`}></i>
              <span>{item.text}</span>
            </ItemsButton>
          ))}
        </ItemsSection>
      </TabPane>
      <TabPane tab="高级统计图" key="2">
        <ItemsSection>
          {otherOptions.map((item) => (
            <ItemsButton
              key={item.value}
              isActive={value === item.value}
              onClick={() => onChange(item.value)}
            >
              <i className={`iconfont ${item.icon}`}></i>
              <span>{item.text}</span>
            </ItemsButton>
          ))}
        </ItemsSection>
      </TabPane>
    </Tabs>
  );
}
export default ChartType;
