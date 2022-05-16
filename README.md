# react 基础框架搭建

## 修改配置项

1. 安装 react-app-rewired 及 customize-cra

```shell
npm install react-app-rewired -D
npm install customize-cra -D
```

2. 修改启动方式

```json
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
  }
```

3. 根目录下新建 config-overrides.js 文件，并自定义配置项(如新增别名配置项)

```javascript
const path = require("path");
const { override, addWebpackAlias } = require("customize-cra");

const resolve = (dir) => path.join(__dirname, ".", dir);
module.exports = override(
  addWebpackAlias({
    ["@"]: resolve("src"),
  })
);
```

## css 方案（emotion）

```shell
yarn add @emotion/react
yarn add @emotion/styled
```
