import React from "react";
import Image from "next/image";
import classes from "./loading.module.css";

const Loading = () => {
  return (
    <div className={classes.loading}>
      <Image
        src={"/images/icon/Loading.svg"}
        width={100}
        height={100}
        objectFit={"contain"}
        alt='loading'
      />
      {/* <h1>Loading...</h1> */}
    </div>
  );
};

export default Loading;
