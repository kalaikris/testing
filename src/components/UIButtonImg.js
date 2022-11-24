import { Button } from "react-bootstrap";

function UIButton({ ...props }) {
  return (
    <Button className={props.className} onClick={props.onClick} type={props.type}>
      <span>{props.label}</span>
    </Button>
  );
}

export default UIButton;
