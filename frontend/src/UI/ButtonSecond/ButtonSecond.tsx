import "./ButtonSecond.css";

function ButtonSecond(props: any): JSX.Element {
  return (
    <button className="ButtonSecond" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default ButtonSecond;
