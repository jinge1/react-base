import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import { Layout, Menu, Spin } from "antd";

import styled from "@emotion/styled";
// import "@/utils/utils";
import "./index.css";
// import logo from "@/assets/logo.svg";

const { Header, Content, Footer } = Layout;

const Loading = styled.div`
  padding: 80px;
  display: flex;
  justify-content: center;
`;

function App() {
  const menuList = [
    {
      text: "about",
      path: "/about",
    },
    {
      text: "product",
      path: "/product",
    },
    {
      text: "test",
      path: "/Test",
    },
  ];

  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            {menuList.map(({ text, path }) => (
              <Menu.Item key={text}>
                <NavLink to={path} activeStyle={{ color: "orange" }}>
                  {text}
                </NavLink>
              </Menu.Item>
            ))}
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Suspense
            fallback={
              <Loading>
                <Spin />
              </Loading>
            }
          >
            <Switch>
              <Route
                path="/about"
                component={lazy(() => import("../../views/about/About"))}
              />
              <Route
                path="/product"
                component={lazy(() => import("../../views/product/Product"))}
              />
              <Route
                path="/test"
                component={lazy(() => import("../../views/test/Test"))}
              />
              <Route path="/">
                <Redirect to="/about" />
              </Route>
            </Switch>
          </Suspense>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
