import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "@emotion/styled";
import Example from './Example'
import Step1 from './Step1'
import Step2 from './Step2'
// https://react-dnd.github.io/react-dnd/docs/overview
// https://github.com/teleport/react-dnd-treeview/blob/master/README.md
function DndDemo() {
  return (
    <DndProvider backend={HTML5Backend}>
      {/* <Example /> */}
      <Step1></Step1>
      <Step2></Step2>
    </DndProvider>
  );
}

export default DndDemo;
