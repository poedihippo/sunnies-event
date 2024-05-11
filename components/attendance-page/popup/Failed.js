import classes from "./Layout.module.css";
import Image from "next/image";

function Failed(props) {
  const { setPopup, errorMessage } = props;
  return (
    <div className={classes.failed}>
      <div className={classes.close}>
        <Image
          src={"/images/icon/times.png"}
          width={15}
          height={15}
          layout={"fixed"}
          onClick={() => setPopup(false)}
          alt="times"
        />
      </div>
      <div className={classes.content}>
        <div className={classes.image}>
          <Image
            src={"/images/failed.png"}
            objectFit="contain"
            width={277}
            height={280}
            alt="failed"
          />
        </div>

        {errorMessage ? (
          <div>
            <h1 style={{ color: "#E71332" }}>Already Attended</h1>{" "}
            <p>{errorMessage}</p>
          </div>
        ) : (
          <div>
            <h1>Something Wrong</h1> <p>Let&apos;s try again</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Failed;
