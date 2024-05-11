import Link from "next/link";
import React from "react";
import classes from "./button.module.css";

export function Btn(props) {
  return (
    <Link href={props.link}>
      <a className={classes.btn} style={{ background: `${props.bg}` }}>
        {props.children}
      </a>
    </Link>
  );
};

export function BtnWithRefresh(props) {
  return (
    <a
      href={props.link}
      className={classes.btn}
      style={{ background: `${props.bg}` }}
    >
      {props.children}
    </a>
  );
}
