import classes from "./Layout.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

function Success(props) {
  const { setPopup, event_id, leadName } = props;
  const [eventName, setEventName] = useState("");

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const getEvent = async () => {
      try {
        const res = await axios.get(
          `https://sunniescrmrebornv2.suneducationgroup.com/api/public/event-registration/${event_id}/detail`,
          config
        );
        console.log(res);
        setEventName(res.data.data.event_name);
      } catch (error) {
        console.error(error);
      }
    };

    event_id && getEvent();
  }, [event_id]);
  return (
    <div className={classes.success}>
      <div className={classes.close}>
        <Image
          src={"/images/icon/times.png"}
          width={15}
          height={15}
          layout={"fixed"}
          alt="times"
          onClick={() => setPopup(false)}
        />
      </div>
      <div className={classes.content}>
        <div className={classes.image}>
          <Image
            src={"/images/success.png"}
            objectFit="contain"
            width={151}
            height={300}
            alt="success"
          />
        </div>

        <h1>Attended Success</h1>
        <p>
          Hi {leadName}, Welcome to {eventName}
        </p>
        {/* <a href={`/${event_id}`}>Back</a> */}
      </div>
    </div>
  );
}

export default Success;
