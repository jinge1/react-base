import styled from "@emotion/styled";
import { useState, useCallback } from "react";
import { ReactSortable } from "react-sortablejs";

const Box = styled.div`
  line-height: 30px;
  background: gray;
`;

const conf = {
  group: "shared", // set both lists to same group
  animation: 150,
};

function About() {
  const [state1, setState1] = useState([
    { id: 1, name: "fiona1" },
    { id: 2, name: "fiona2" },
    { id: 3, name: "fiona3" },
    { id: 4, name: "fiona4" },
    { id: 5, name: "fiona5" },
  ]);
  const [state2, setState2] = useState([
    { id: 21, name: "shrek21" },
    { id: 22, name: "shrek22" },
    { id: 23, name: "shrek23" },
    { id: 24, name: "shrek24" },
    { id: 25, name: "shrek25" },
  ]);
  // const changeList = useCallback((arr) => {
  //   setState(arr);
  // }, []);
  return (
    <>
      <ReactSortable list={state1} setList={setState1} {...conf}>
        {state1.map((item) => (
          <Box key={item.id}>{item.name}</Box>
        ))}
      </ReactSortable>
      <ReactSortable list={state2} setList={setState2} {...conf}>
        {state2.map((item) => (
          <Box key={item.id}>{item.name}</Box>
        ))}
      </ReactSortable>
    </>
  );
}
export default About;
