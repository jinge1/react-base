import React from "react";
import { Button } from "antd";
import styled from "@emotion/styled";

const Box = styled.div`
  height: 120px;
  background: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

// 指标设置
function SetIndex({ value, onChange, ...args }) {
  console.log(args, "args---");
  return (
    <Box>
      <div>指标设置</div>
    </Box>
  );
}
export default SetIndex;
