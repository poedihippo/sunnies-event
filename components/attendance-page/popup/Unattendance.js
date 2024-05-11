import axios from "axios";
import Image from "next/image";
import React from "react";
import BtnAction from "../BtnAction";
import classes from "./Layout.module.css";

const Unattendance = (props) => {
  const { setPopup, event_id, leadName, setPopupLoading, leadId, setPopupFailed } = props;
  //   const [eventName, setEventName] = useState("");

  const postUnattendance = async () => {
    setPopupLoading(true);

    const data = {
      type: "attendance",
      is_attend: false,
    };
    try {
      const res = await axios.post(
        `https://sunniescrmrebornv2.suneducationgroup.com/api/public/event-registration/${event_id}/leads/${leadId}/attend`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log(res);
      setPopupLoading(false);
      setPopup(false)
    } catch (error) {
      console.error(error);
      setPopupLoading(false);
      setPopupFailed(true);
    }
  };
  return (
    <div className={classes.unattendance}>
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
        <h1>Are you sure you want to cancel your attendance</h1>

        <div onClick={() => postUnattendance()}>
          <BtnAction bg={"#E71332"}>
            <Image
              src={"/images/icon/check.png"}
              width={28}
              height={28}
              layout={"fixed"}
              style={{ marginTop: "3px" }}
              alt="check"
            />
            <span>Unattendance</span>
          </BtnAction>
        </div>
      </div>
    </div>
  );
};

export default Unattendance;
