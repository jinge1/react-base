import React, { lazy, Suspense, useMemo } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import { Menu, Spin } from "antd";

import styled from "@emotion/styled";
import "./index.css";

const Page = styled.div`
  height:100%;
  display: flex;
  flex-flow: column;
`;

const Top = styled.div`
  height: 46px;
`;
const Box = styled.div`
  flex: 1;
`;
const Bottom = styled.div`
  height: 30px;
  text-align: center;
`;

const Loading = styled.div`
  padding: 80px;
  display: flex;
  justify-content: center;
`;

function App () {
  const menuList = useMemo(() => [
    // {
    //   text: "about",
    //   path: "/about",
    //   component: lazy(() => import("../../views/about/About"))
    // },
    {
      text: "基本功能",
      path: "/base",
      component: lazy(() => import("../../views/base/Base"))
    },
    {
      text: "product",
      path: "/product",
      component: lazy(() => import("../../views/product/Product"))
    },
    {
      text: "fabric",
      path: "/fabric",
      component: lazy(() => import("../../views/fabric/Fabric"))
    },
    {
      text: "图片缩放居中",
      path: "/step1",
      component: lazy(() => import("../../views/step1/Step1"))
    },
    {
      text: "拖拽框选平移",
      path: "/step2",
      component: lazy(() => import("../../views/step2/Step2"))
    },
    {
      text: "高清裁切",
      path: "/step3",
      component: lazy(() => import("../../views/step3/Step3"))
    },
  ], [])

  return (
    <Router>
      <Page>
        <Top>
          <Menu theme="dark" mode="horizontal">
            {menuList.map(({ text, path }) => (
              <Menu.Item key={text}>
                <NavLink to={path} activeStyle={{ color: "orange" }}>
                  {text}
                </NavLink>
              </Menu.Item>
            ))}
          </Menu>
        </Top>
        <Box>
          <Suspense
            fallback={
              <Loading>
                <Spin />
              </Loading>
            }
          >
            <Switch>
              {menuList.map((m) => <Route
                path={m.path}
                key={m.path}
                component={m.component}
              />)}
              <Route path="/">
                <Redirect to={menuList[0].path} />
              </Route>
            </Switch>
          </Suspense>
        </Box>
        <Bottom>
          Ant Design ©2018 Created by Ant UED
        </Bottom>
      </Page>
    </Router>
  );
}

export default App;
