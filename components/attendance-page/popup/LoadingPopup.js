import React from "react";
import Loading from "../../loading/loading";
import classes from "./Layout.module.css";

const LoadingPopup = () => {
  return (
    <div className={classes.loading}>
      <Loading />
    </div>
  );
};

export default LoadingPopup;
