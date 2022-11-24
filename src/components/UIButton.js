import { Button } from "react-bootstrap";

function UIButton({ ...props }) {
  return (
    <Button className={props.className} onClick={props.onClick} type={props.type}>
      {props.label}
    </Button>
  );
}

export default UIButton;
