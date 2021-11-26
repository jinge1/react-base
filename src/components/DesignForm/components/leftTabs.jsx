import React from "react";
import { Tabs, Radio, Space } from "antd";
import styled from "@emotion/styled";
import { styleOptions, layoutOptions, columnsOptions } from "../conf";

const { TabPane } = Tabs;

const Box = styled.div`
  padding-top: 20px;
  height: 100%;
  box-sizing: border-box;
  .ant-tabs-tab-btn {
    line-height: 30px;
    height: 30px;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    .iconfont {
      font-size: 22px;
      color: #999999;
    }
  }
  .ant-tabs-tab-active .iconfont {
    color: #376bff;
  }
  .ant-tabs-left > .ant-tabs-nav .ant-tabs-ink-bar {
    width: 4px;
  }
  .ant-tabs-left > .ant-tabs-nav .ant-tabs-tab {
    text-align: center;
    margin-bottom: 10px;
    padding: 0;
  }
  .left-layout {
    padding: 4px 0 0 0;
    font-size: 16px;
    font-weight: 500;
    color: #000000;
    .left-item {
      width: 112px;
      height: 30px;
      border: 1px solid #e6e6e6;
      border-radius: 4px;
      background: none;
      font-size: 14px;
      color: #000000;
      .iconfont {
        margin-right: 7px;
      }
    }
  }
`;
const StyleBox = styled.div`
  font-size: 14px;
  color: #000000;
`;
const StyleSection = styled.div`
  padding-bottom: 20px;
`;
const StyleTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 32px;
  padding-bottom: 10px;
`;
const RadioBox = styled.div`
  .ant-space-item {
    padding-bottom: 10px;
  }
`;
const ColumnsBox = styled.div`
  padding: 10px 0 0 26px;
`;

const onChange = (v, type) => {
  console.log(v, type, "type---");
};

function LeftTabs(props) {
  const { defaultActiveKey = "1", children } = props;
  return (
    <Box>
      <Tabs
        defaultActiveKey={defaultActiveKey}
        tabPosition="left"
        style={{ height: "100%" }}
      >
        <TabPane tab={<i className="iconfont icon-yingyong1"></i>} key="1">
          {children}
        </TabPane>
        <TabPane tab={<i className="iconfont icon-gexinghua"></i>} key="2">
          <StyleBox>
            <StyleSection>
              <StyleTitle>风格</StyleTitle>
              <RadioBox>
                <Radio.Group onChange={onChange}>
                  {styleOptions.map(({ value, text }) => (
                    <Radio key={value} value={value}>
                      {text}
                    </Radio>
                  ))}
                </Radio.Group>
              </RadioBox>
            </StyleSection>
            <StyleSection>
              <StyleTitle>布局</StyleTitle>
              <RadioBox>
                <Radio.Group onChange={onChange}>
                  <Space direction="vertical">
                    {layoutOptions.map(({ value, text }) => (
                      <Radio key={value} value={value}>
                        {text}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </RadioBox>
              <ColumnsBox>
                <RadioBox>
                  <Radio.Group onChange={onChange}>
                    {columnsOptions.map(({ value, text }) => (
                      <Radio key={value} value={value}>
                        {text}
                      </Radio>
                    ))}
                  </Radio.Group>
                </RadioBox>
              </ColumnsBox>
            </StyleSection>
          </StyleBox>
        </TabPane>
      </Tabs>
    </Box>
  );
}

export default LeftTabs;
