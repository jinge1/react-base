import { useEffect, useRef, useState, useCallback } from "react";
import { fabric } from "fabric";
import styled from "@emotion/styled";
import { Button } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

const Box = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Controler = styled.div`
  height: 50px;
`;
const Contenter = styled.div`
  flex: 1;
`;

export const actionsMap = new Map([["zoomOut", { icon: "" }]]);

function AccurateCropper(props) {
  const { actions = [] } = props;
  return (
    <Box>
      <Controler>Controler</Controler>
      <Contenter>Contenter</Contenter>
    </Box>
  );
}

export default AccurateCropper;
