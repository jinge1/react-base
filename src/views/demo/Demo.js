import React, { useState, useEffect, useMemo, useRef } from "react";
import { Tree } from "antd";
import styled from "@emotion/styled";

import CodeEdit from "../../component/CodeEdit";
// import { fieldsList, servicesList, functionList, defaultValue } from "./mock";

const PageBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;
const Inner = styled.div`
  width: 800px;
  padding: 20px;
`;
const SectionBox = styled.div`
  height: ${(props) => (props.height ? props.height + "px" : "auto")};
  padding: 6px;
  border: solid 1px #ccc;
  border-radius: 6px;
  margin-bottom: 10px;
`;

const Flex = styled.div`
  display: flex;
`;

const FlexItem = styled.div`
  flex: 1;
`;
const ListBox = styled.div`
  max-height: 250px;
  overflow: scroll;
`;

/**
 * 模拟接口数据
 */

/**
 * 块级内容(高亮展示，不提示)
 * 可动态添加，可删除，不能手动编辑、修改
 */
const fieldsList = [
  { id: "input_tq42hef8car", text: "文本.输入" },
  { id: "input_lv1c2qugd6h", text: "数字输入" },
  { id: "datePicker_bfqieygwi59", text: "日期输入" },
];

/**
 * 块级内容(高亮展示，不提示)
 * 可动态添加，可删除，不能手动编辑、修改
 */
const servicesList = [
  { id: "ds_8xfiu8xfiu_115", text: "服务测试" },
  { id: "ds_8xfiu8xfiu_115.1455", text: "服务测试.服务测试ID" },
  { id: "ds_8xfiu8xfiu_115.1456", text: "服务测试.服务测试name" },
  { id: "ds_8xfiu8xfiu_115.1457", text: "服务测试.服务测试_clientId" },
  { id: "ds_e6xfxe6xfx_115", text: "季然-测试" },
  { id: "ds_e6xfxe6xfx_115.Trade_name", text: "季然-测试.测试属性1" },
];

/**
 * 函数内容（编辑框中输入内容会展示提示列表）
 * 可编辑、修改，增删等
 */
const functionList = [
  { id: 1, text: "loginUser()" },
  { id: 2, text: "loginDevice()" },
  { id: 3, text: "select()" },
];

// 模拟初始值
//const defaultValue = `\${select('ds_8xfiu8xfiu_115','ds_8xfiu8xfiu_115.1455',\${input_tq42hef8car},'ds_e6xfxe6xfx_115.Trade_name',\${input_lv1c2qugd6h},\${datePicker_bfqieygwi59})}`;

const defaultValue = `"input_tq42hef8car" \${select(\${concat("input_tq42hef8car", "input_tq42hef8car")}, \${loginUser("input_lv1c2qugd6h","datePicker_bfqieygwi59")})}`;

// const codeValue = `concat(),now(), \u200b物料采购申请表.采购单号\u200b \u200b测试室001\u200b, \u200b测试bug-001\u200b`;

// 应用中心页面组件
function Demo() {
  const [value, setValue] = useState("");
  const [fields, setFileds] = useState([]);
  const [services, setServices] = useState([]);
  const [funs, setFuns] = useState([]);
  const codeRef = useRef(null);

  const treeData = useMemo(() => {
    const getTreeNode = (item) => ({ title: item.text, key: item.id });
    return services
      .filter(({ id }) => !`${id}`.includes("."))
      .map((item) => ({
        ...getTreeNode(item),
        children: services
          .filter(({ id }) => id !== item.id && `${id}`.includes(item.id))
          .map(getTreeNode),
      }));
  }, [services]);

  // console.log(treeData, "treeData", tables);

  useEffect(() => {
    //   模拟网络请求
    Promise.resolve().then(() => {
      setFileds(fieldsList);
      setServices(servicesList);
      setFuns(functionList);
      // setValue 这一步需要放到最后
      setValue(defaultValue);
    });
    // setTimeout(() => {
    //   setValue(defaultValue);
    //   setFileds(fieldsList);
    //   setServices(servicesList);
    //   setFuns(functionList);
    // }, 1500);
  }, []);

  /**
   * 选择字段或函数
   * @param {object|string} item
   * @param {number} type 1 字段 2 函数
   */
  const checkItem = (item, type = 1) => {
    const { current } = codeRef;
    const info =
      typeof item === "string"
        ? [...fields, ...services].find(({ id }) => `${id}` === `${item}`)
        : item;
    // 统一数据格式为{text: '', id: ''}
    current.insert(info, type);
  };

  return (
    <PageBox>
      <Inner>
        <SectionBox height={100}>
          <CodeEdit
            defaultValue={value}
            keywords={[...fields, ...services]}
            hints={funs}
            ref={codeRef}
          ></CodeEdit>
        </SectionBox>
        <Flex>
          <FlexItem>
            <SectionBox>
              <h3>字段</h3>
              <ListBox>
                {fields.map((item) => (
                  <div key={item.id} onClick={() => checkItem(item, 1)}>
                    {item.text}
                  </div>
                ))}
              </ListBox>
            </SectionBox>
          </FlexItem>
          <FlexItem>
            <SectionBox>
              <h3>数据对象</h3>
              <ListBox>
                <Tree
                  treeData={treeData}
                  onSelect={(v) => checkItem(v[0], 1)}
                ></Tree>
              </ListBox>
            </SectionBox>
          </FlexItem>
          <FlexItem>
            <SectionBox>
              <h3>函数列表</h3>
              <ListBox>
                {funs.map((item) => (
                  <div key={item.id} onClick={() => checkItem(item, 2)}>
                    {item.text}
                  </div>
                ))}
              </ListBox>
            </SectionBox>
          </FlexItem>
        </Flex>
      </Inner>
    </PageBox>
  );
}

export default Demo;
