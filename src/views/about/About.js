import React, { useState, useEffect, useMemo, useRef } from "react";
import { Tree } from "antd";
import styled from "@emotion/styled";

import CodeEdit from "../../components/CodeEdit";
import { fieldsList, servicesList, functionList, defaultValue } from "../../utils/mock";

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
    // 模拟网络请求
    setTimeout(() => {
      setValue(defaultValue);
      setFileds(fieldsList);
      setServices(servicesList);
      setFuns(functionList);
    }, 1500);
  }, []);

  /**
   * 选择字段或函数
   * @param {object|string} item
   * @param {number} flg 1 字段 2 函数
   */
  const checkItem = (item, flg) => {
    const { current } = codeRef;
    // console.log(item, flg, "item---");
    if (flg === 1) {
      const t = typeof item === "object" ? item.text : item;
      current.insert(t, true);
    }
    if (flg === 2) {
      current.insert(item);
    }
  };

  return (
    <PageBox>
      <Inner>
        <SectionBox height={100}>
          <CodeEdit
            defaultValue={value}
            fields={[...fields, ...servicesList]}
            hints={funs.map(({ text }) => text)}
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
                  <div key={item.id} onClick={() => checkItem(item.text, 2)}>
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
