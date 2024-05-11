import Link from "next/link";
import React from "react";
import classes from "./BtnAction.module.css";

const BtnAction = (props) => {
  return (
    <button className={classes.btn} style={{ background: `${props.bg}` }}>
      {props.children}
    </button>
  );
};

export default BtnAction;
