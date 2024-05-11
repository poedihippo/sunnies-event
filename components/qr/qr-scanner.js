import classes from "./qr-scanner.module.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Popup from "../attendance-page/popup/Layout";
import Success from "../attendance-page/popup/Succes";
import Failed from "../attendance-page/popup/Failed";
import LoadingPopup from "../attendance-page/popup/LoadingPopup";
import axios from "axios";
import Image from "next/image";
import ExpiredEvent from "../expired-event/expired-event";
const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false });

function QrScanner(props) {
  const { event_id, camera } = props;
  const [popupSuccess, setPopupSuccess] = useState(false);
  const [popupFailed, setPopupFailed] = useState(false);
  const [popupLoading, setPopupLoading] = useState(false);
  const [cameraSide, setCameraSide] = useState(false);

  const [errorMessage, setErrorMessage] = useState();

  const [eventData, setEventData] = useState(null);

  const [leadName, setLeadName] = useState("");
  const [data, setData] = useState("No result");
  const router = useRouter();
  const handleScan = async (data) => {
    if (data) {
      setPopupLoading(true);
      setData(data);
      console.log(data);
      getLead(data);
      try {
        const res = await axios.post(
          `https://sunniescrmrebornv2.suneducationgroup.com/api/public/event-registration/${event_id}/leads/scan/qr-code`,
          {
            register_id: data,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        console.log(res);
        setPopupSuccess(true);
        setPopupLoading(false);
        setTimeout(function () {
          router.replace(`/${event_id}`);
        }, 10000);
      } catch (error) {
        console.error(error);
        setPopupFailed(true);
        setPopupLoading(false);
        console.log(error.response.data.message);
        setErrorMessage(error.response.data.message);
      }
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  const getLead = async (reg_id) => {
    try {
      const res = await axios.get(
        `https://sunniescrmrebornv2.suneducationgroup.com/api/public/event-registration/${event_id}/leads/search?search_by=admin&search_column=register_id&search_value=${reg_id}&all_event=false&userpage_size=10&page=1`,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log(res.data.data[0].full_name);
      setLeadName(res.data.data[0].full_name);
    } catch (error) {
      console.error(error);
    }
  };

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
      } catch (error) {
        console.error(error);
      }
    };

    event_id && getEvent();
  }, [event_id]);

  useEffect(() => {
    console.log(cameraSide);
  }, [cameraSide]);

  return !eventData ? (
    <ExpiredEvent />
  ) : (
    camera && (
      <div className={classes.qr_scanner}>
        {popupSuccess && (
          <Popup>
            <Success
              setPopup={setPopupSuccess}
              event_id={event_id}
              leadName={leadName}
            />
          </Popup>
        )}
        {popupFailed && (
          <Popup>
            <Failed setPopup={setPopupFailed} errorMessage={errorMessage} />
          </Popup>
        )}
        {popupLoading && (
          <Popup>
            <LoadingPopup setPopup={setPopupFailed} />
          </Popup>
        )}
        <div className={classes.header_qr}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
              cursor: "pointer",
            }}
            onClick={() => router.back()}
          >
            <Image
              src="/images/icon/arrow-left.png"
              width={25}
              height={20}
              alt={"back"}
              objectFit={"contain"}
            />
          </div>
          <h1>Scan QR</h1>
        </div>

        <div className={classes.scanner}>
          <div className={classes.camera}>
            <QrReader
              delay={500}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%" }}
              constraints={{
                facingMode: camera === "front" ? "user" : "environment",
              }}
            />
          </div>
          <p>Place the QR Code in the box</p>
        </div>
      </div>
    )
  );
}

export default QrScanner;
