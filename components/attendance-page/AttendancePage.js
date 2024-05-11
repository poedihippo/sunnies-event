import Card from "./Card";
import HeaderFilter from "./HeaderFilter";
import classes from "./AttendancePage.module.css";
import Popup from "./popup/Layout";
import Success from "./popup/Succes";
import Failed from "./popup/Failed";
import { useEffect, useState } from "react";
import Detail from "./Detail";
import axios from "axios";
import Loading from "../loading/loading";
import useDebounce from "../../lib/hooks/use-debounce";
import EnterId from "../loading/EnterId";
import NotFound from "../loading/NotFoundData";
import LoadingPopup from "./popup/LoadingPopup";
import Unattendance from "./popup/Unattendance";
import ExpiredEvent from "../expired-event/expired-event";

function AttendancePage(props) {
  const { event_id, filter, user_type } = props;
  const [eventData, setEventData] = useState(null);
  const [eventName, setEventName] = useState("");

  const [popupSuccess, setPopupSuccess] = useState(false);
  const [popupUnattendance, setPopupUnattendance] = useState(false);
  const [popupFailed, setPopupFailed] = useState(false);
  const [popupLoading, setPopupLoading] = useState(false);
  const [detailActive, setDetailActive] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [searchBy, setSearchBy] = useState("");
  const [searchColumn, setSearchColumn] = useState(filter);
  const [searchValue, setSearchValue] = useState("");
  const [allEvent, setAllEvent] = useState(false);

  const [leadsData, setLeadsData] = useState([]);

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

  // lead id
  const [leadId, setLeadId] = useState("");
  const search = useDebounce(searchValue, 1000);
  useEffect(() => {
    setIsLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const getLeadsData = async () => {
      try {
        const res = await axios.get(
          `https://sunniescrmrebornv2.suneducationgroup.com/api/public/event-registration/${event_id}/leads/search?search_by=${user_type}&search_column=${
            searchColumn ? searchColumn : filter
          }&search_value=${search}&all_event=${
            user_type === "user" ? "false" : allEvent
          }&page_size=10&page=1`,
          config
        );
        // console.log(res.data.data);
        setLeadsData(res.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setLeadsData([]);
        setIsLoading(false);
      }
    };
    filter && user_type && getLeadsData();
  }, [
    searchBy,
    search,
    allEvent,
    filter,
    user_type,
    searchColumn,
    popupLoading,
    event_id,
  ]);

  return !eventData ? (
    <ExpiredEvent />
  ) : (
    <section className={classes.attendace_page}>
      {popupSuccess && (
        <Popup>
          <Success
            setPopup={setPopupSuccess}
            event_id={event_id}
            // leadName={leadName}
          />
        </Popup>
      )}
      {popupUnattendance && (
        <Popup>
          <Unattendance
            setPopup={setPopupUnattendance}
            popupLoading={popupLoading}
            setPopupLoading={setPopupLoading}
            setPopupFailed={setPopupFailed}
            leadId={leadId}
            event_id={event_id}
          />
        </Popup>
      )}
      {popupFailed && (
        <Popup>
          <Failed setPopup={setPopupFailed} />
        </Popup>
      )}
      {popupLoading && (
        <Popup>
          <LoadingPopup setPopup={setPopupFailed} />
        </Popup>
      )}
      <Detail
        setDetailActive={setDetailActive}
        detailActive={detailActive}
        leadId={leadId}
      />
      <div>
        <HeaderFilter
          filter={filter}
          searchColumn={searchColumn}
          setSearchColumn={setSearchColumn}
          searchBy={searchBy}
          setSearchBy={setSearchBy}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          allEvent={allEvent}
          setAllEvent={setAllEvent}
          user_type={user_type}
          eventName={eventName}
        />

        {!isLoading ? (
          leadsData && leadsData.length !== 0 ? (
            leadsData.map((data) => {
              return (
                <Card
                  key={data.leads_id}
                  data={data}
                  popupSuccess={popupSuccess}
                  setPopupSuccess={setPopupSuccess}
                  popupFailed={popupFailed}
                  setPopupFailed={setPopupFailed}
                  setDetailActive={setDetailActive}
                  detailActive={detailActive}
                  leadId={leadId}
                  setLeadId={setLeadId}
                  event_id={event_id}
                  allEvent={allEvent}
                  popupLoading={popupLoading}
                  setPopupLoading={setPopupLoading}
                  user_type={user_type}
                  setPopupUnattendance={setPopupUnattendance}
                />
              );
            })
          ) : !searchValue ? (
            <EnterId searchColumn={searchColumn} filter={filter} />
          ) : (
            <NotFound searchColumn={searchColumn} filter={filter} />
          )
        ) : (
          <Loading />
        )}
      </div>
    </section>
  );
}

export default AttendancePage;
