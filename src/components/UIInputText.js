import { Form } from "react-bootstrap";

function UIInputText({ ...props }) {
  console.log(props.type);
  return (
    <div className="input-group">
      <label>{props.label}</label>
       {
        (props.type === "text" || props.type === "password" || props.type === "file" || props.type === "phone" || props.type === "date" || props.type === "email") &&
        <Form.Control
              className="input-box"
              isInvalid={!!props.error}
              value={props.value}
              type={props.type}
              name={props.id}
              label={props.id}
              placeholder={props.placeholder}
              onChange={props.onChange}
        />
       }
       {
        props.type === "select" &&
        <Form.Select
              className="input-box"
              isInvalid={!!props.error}
              onChange={props.onChange}
        >
          <option value="0">Select department1</option>
          <option value="1">Select department2</option>
          <option value="2">Select department3</option>
        </Form.Select>
       }
       {
        props.type === "textarea" &&
        <textarea className="form-control input-box" isInvalid={!!props.error} onChange={props.onChange} placeholder={props.placeholder} rows={props.rows}></textarea>
       }
      <Form.Control.Feedback type="invalid">
        {props.error}
      </Form.Control.Feedback>
    </div>
  );
}

export default UIInputText;
