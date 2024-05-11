import axios from "axios";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { Btn, BtnWithRefresh } from "../button/button";
import ExpiredEvent from "../expired-event/expired-event";
import LoadingPage from "../loading/loading-page";
import classes from "./MainPage.module.css";

function MainPage(props) {
  const { event_id } = props;

  const [eventData, setEventData] = useState(null);
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
        setEventData(res.data);
        setEventName(res.data.data.event_name);
      } catch (error) {
        console.error(error);
      }
    };

    event_id && getEvent();
  }, [event_id]);

  return !event_id ? (
    <div className={classes.mainpage}>
      <h1>You need input event_id!</h1>
    </div>
  ) : !eventData ? (
    <ExpiredEvent />
  ) : (
    <section className={classes.mainpage}>
      <div className={classes.attandanceImg} data-aos="fade-right">
        <Image
          src="/images/Expo 1.png"
          alt="mainpage img"
          width={420}
          height={420}
          priority
          //   className={classes.attandaceIcon}
          //   layout={"responsive"}
          //   objectFit={"contain"}
        />
      </div>
      <div className={classes.mainContent} data-aos="zoom-in">
        <h1>Welcome To Sun Education Expo</h1>
        <h3>
          {eventName &&
            eventName.split("-").map((name, idx) => {
              return (
                <Fragment key={idx}>
                  {name} <br />
                </Fragment>
              );
            })}
        </h3>
        <h3>Please select attendance method</h3>
        <div className={classes.action}>
          <Btn bg={"#16BD98"} link={`/${event_id}/user/email`}>
            Email
          </Btn>

          <BtnWithRefresh bg={"#5BBED9"} link={`/${event_id}/user/qr/front`}>
            QR Code (front)
          </BtnWithRefresh>
          <BtnWithRefresh bg={"#5BBED9"} link={`/${event_id}/user/qr/back`}>
            QR Code (back)
          </BtnWithRefresh>

          <Btn bg={"#6C5DDE"} link={`/${event_id}/user/register_id`}>
            Registration ID
          </Btn>

          <Btn bg={"#F3B44A"} link={`/${event_id}/user/mobile`}>
            Phone
          </Btn>
        </div>
      </div>
    </section>
  );
}

export default MainPage;
