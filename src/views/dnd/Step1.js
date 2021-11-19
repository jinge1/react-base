import { useDrag } from "react-dnd";
import styled from "@emotion/styled";

const Item = styled.div`
  width: 200px;
  height: 50px;
  background: #ccc;
`;

function Box() {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: "BOX",
    // The collect function utilizes a "monitor" instance (see the Overview for what this is)
    // to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={dragPreview} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {/* The drag ref marks this node as being the "pick-up" node */}
      <Item role="Handle" ref={drag}>
        move
      </Item>
    </div>
  );
}

export default Box;
