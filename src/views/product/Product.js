import { Button } from "antd";
import Generator from "fr-generator";
const { Provider, Sidebar, Canvas, Settings } = Generator;

const defaultValue = {
  type: "object",
  properties: {
    inputName: {
      title: "简单输入框",
      type: "string",
    },
  },
};

const settings = [
  {
    title: "个人信息",
    widgets: [
      {
        text: "计数器",
        name: "asyncSelect",
        schema: {
          title: "计数器",
          type: "number",
          widget: "NewWidget",
        },
        setting: {
          api: { title: "api", type: "string" },
        },
      },
      {
        text: "姓名",
        name: "name",
        schema: {
          title: "输入框",
          type: "string",
        },
        setting: {
          maxLength: { title: "最长字数", type: "number" },
        },
      },
      {
        text: "object",
        name: "object",
        schema: {
          title: "对象",
          type: "object",
          properties: {},
        },
        setting: {},
      },
      {
        text: "array",
        name: "array",
        schema: {
          title: "数组",
          type: "array",
          items: {
            type: "object",
            properties: {},
          },
        },
        setting: {},
      },
    ],
  },
];

const NewWidget = ({ value = 0, onChange }) => (
  <Button onClick={() => onChange(value + 1)}>{value}</Button>
);

function Product() {
  return (
    <div style={{ height: "80vh" }}>
      <Provider
        onChange={(data) => console.log("data:change", data)}
        onSchemaChange={(schema) => console.log("schema:change", schema)}
        widgets={{ NewWidget }}
        settings={settings}
      >
        <div className="fr-generator-container">
          <Sidebar fixedName />
          <Canvas />
          <Settings />
        </div>
      </Provider>

      <Generator
        widgets={{ NewWidget }}
        commonSettings={{
          description: {
            title: "自定义共通用的入参",
            type: "string",
          },
        }}
      />
    </div>
  );
}
export default Product;
