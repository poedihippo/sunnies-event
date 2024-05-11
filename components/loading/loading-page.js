import React from "react";
import Image from "next/image";
import classes from "./loading.module.css";

const LoadingPage = () => {
  return (
    <div className={classes.loading_page}>
      <Image
        src={"/images/icon/Loading.svg"}
        width={100}
        height={100}
        objectFit={"contain"}
        alt="loading"
      />
    </div>
  );
};

export default LoadingPage;
