import { useDrop } from "react-dnd";
import styled from "@emotion/styled";

const Item = styled.div`
  width: 200px;
  height: 200px;
  background: #ddd;
`;
function Bucket() {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: "BOX",
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <Item
      ref={drop}
      role={"Dustbin"}
      style={{ backgroundColor: isOver ? "red" : "white" }}
    >
      {canDrop ? "Release to drop" : "Drag a box here"}
    </Item>
  );
}

export default Bucket;
