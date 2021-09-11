
import styled from "@emotion/styled";

export const Page = styled.div`
padding: 20px;
p {
  margin: 0 0 10px 0;
  padding: 0;
}
`;
export const Title = styled.div`
font-size: 18px;
margin-bottom: 10px;
font-weight: bold;
`;
export const Desc = styled.div``;
export const List = styled.div``;
export const Item = styled.div`
box-shadow: 0 0 10px #ccc;
margin-bottom: 10px;
`;
export const ItemTop = styled.div`
padding: 10px;
display: flex;
justify-content: space-between;
`;
export const CanvasBox = styled.div`
height: ${(props) => props.height}px;
overflow: hidden;
`;
export const CodeBox = styled.div`
max-height: 300px;
overflow: auto;
background: #e1e1e1;
code {
  white-space: break-spaces;
}
`;
export const IconBox = styled.span`
font-size: 22px;
margin-right: 20px;
`;
export const Controler = styled.div`
user-select: none;
`;
