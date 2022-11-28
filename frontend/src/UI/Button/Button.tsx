import "./Button.css";

function Button(props: any): JSX.Element {
  return (
    <button className="Button" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Button;
