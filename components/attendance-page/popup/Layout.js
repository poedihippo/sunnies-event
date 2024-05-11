import classes from "./Layout.module.css";

function Popup(props) {
  return <div className={classes.popup}>{props.children}</div>;
}

export default Popup;
