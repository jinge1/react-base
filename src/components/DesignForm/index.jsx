import React, { useState, useEffect, useMemo, useCallback } from "react";
import styled from "@emotion/styled";
import { Button, Spin } from "antd";
import Generator from "fr-generator";
// import { useParams, useHistory } from "react-router-dom";
import LinkHeader from "../LinkHeader/index";
// import { getQuery } from "../../util/utils";
import { getAction } from "../../util/requestAction";
import { ScrollBox, scrollStyle } from "../../util/theme";
import LeftTabs from "./components/leftTabs";
import { settings, commonSettings, widgets } from "./conf";

const { Provider, Sidebar, Canvas, Settings } = Generator;

const PageBox = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f0f1f5;
`;
const HeaderBox = styled.div``;
const HeaderButtons = styled.div``;
const PageContent = styled.div`
  flex: 1;
  display: flex;
  padding-top: 10px;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
`;
const BaseContent = styled(ScrollBox)`
  overflow: auto;
  background: #fff;
`;
const LeftSet = styled(BaseContent)`
  /* width: 280px; */
  width: 344px;
  .ant-tabs-nav {
    width: 63px;
  }
  .ant-tabs-ink-bar {
    /* background: orange; */
    /* 高度没法覆盖 */
  }
`;
const ComponentsBox = styled(BaseContent)`
  flex: 1;
  margin: 0 20px;
  .mid-layout {
    height: 100%;
  }
  .field-wrapper {
    ${scrollStyle}
  }
`;
const DataOriginBox = styled(BaseContent)`
  width: 232px;
  margin-right: 2px;
`;
const AttributeBox = styled(BaseContent)`
  width: 320px;
  .ant-tabs-tabpane {
    ${scrollStyle}
  }
  .right-layout {
    width: 100%;
  }
`;

// 模拟默认值
const defaultValue = {
  type: "object",
  properties: {
    inputCard: {
      //   title: "指标卡",
      type: "object",
      widget: "IndexCard",
      name: "标题……123",
    },
  },
};

// 报表设计态
function DesignReport(props) {
  const { projectId, projectName, pageName, pageUuid } = props;
  const [conf, setConf] = useState({});
  const [init, setInit] = useState(false);

  // 获取默认配置信息
  useEffect(() => {
    async function getInitInfo() {
      const { reportList, screenList, styleConfig } = await getAction(
        `/dataworkreport/info/${pageUuid}`
      );
      console.log(reportList, screenList, styleConfig, "data---");
      setConf(defaultValue);
      setInit(true);
    }
    getInitInfo();
  }, [pageUuid]);

  const links = useMemo(() => {
    return [
      { text: "我的应用", path: "/mytool", options: { target: "_blank" } },
      {
        text: projectName,
        path: `/mytool/tooldetail/${projectId}/${projectName}`,
        options: { target: "_blank" },
      },
      { text: pageName, options: { style: { color: "#376BFF" } } },
    ];
  }, [projectName, projectId, pageName]);

  const onChange = useCallback((data) => {
    console.log("data:change", data);
  }, []);
  const onSchemaChange = useCallback(
    (schema) => console.log("schema:change", schema),
    []
  );

  return (
    <Spin tip="Loading..." spinning={!init}>
      <PageBox>
        <HeaderBox>
          <LinkHeader links={links}>
            <HeaderButtons>
              <Button style={{ marginRight: "16px" }}>预览</Button>
              <Button type="primary" className="primary">
                保存
              </Button>
            </HeaderButtons>
          </LinkHeader>
        </HeaderBox>
        <PageContent className="fr-generator-container">
          <Provider
            onChange={onChange}
            onSchemaChange={onSchemaChange}
            widgets={widgets}
            settings={settings}
            commonSettings={commonSettings}
            defaultValue={conf}
          >
            <LeftSet>
              <LeftTabs>
                <Sidebar>456</Sidebar>
              </LeftTabs>
            </LeftSet>
            <ComponentsBox>
              <Canvas />
            </ComponentsBox>
            <DataOriginBox>
              <div>数据源</div>
            </DataOriginBox>
            <AttributeBox>
              <Settings />
            </AttributeBox>
          </Provider>
        </PageContent>
      </PageBox>
    </Spin>
  );
}

export default DesignReport;
