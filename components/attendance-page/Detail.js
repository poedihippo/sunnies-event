import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "../loading/loading";
import Desc from "./DescItem";
import classes from "./Detail.module.css";

function Detail(props) {
  const { detailActive, setDetailActive, leadId } = props;

  const [leadData, setLeadData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getLeadDetail = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `https://sunniescrmrebornv2.suneducationgroup.com/api/public/event-registration/EVENT.0322.5/leads/${leadId}/detail`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        // console.log(res.data);
        setLeadData(res.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    leadId && getLeadDetail();
  }, [leadId]);

  return (
    <div
      className={`${classes.detail} ${
        detailActive ? classes.detail_active : classes.detail_off
      }`}
    >
      <div className={classes.close}>
        <Image
          src={"/images/icon/times.png"}
          width={15}
          height={15}
          alt={"close"}
          onClick={() => setDetailActive(false)}
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        leadData && (
          <div className={classes.detail_content}>
            <div className={classes.name}>
              <div className={classes.image_user}>
                <div className={classes.initial_user}>SC</div>
              </div>
              <h1>{leadData?.full_name}</h1>
            </div>
            <div className={classes.desc}>
              <Desc label={"Mobile Phone Number"} value={leadData?.mobile} />
              <Desc label={"Email"} value={leadData?.email} />
              <Desc label={"Date of Birth"} value={leadData?.birth} />
              <Desc label={"Parents Name"} value={leadData?.parents_name} />
              <Desc
                label={"Parents Mobile Phone"}
                value={leadData?.parents_mobile}
              />
              <Desc
                label={"Full Address"}
                value={`${leadData?.address}, ${leadData?.kelurahan}, ${leadData?.kecamatan}, ${leadData?.dt2}, ${leadData?.kabupaten}, ${leadData?.provinsi}`}
              />
              <Desc label={"Post Code/City Area"} value={leadData?.zip_code} />
              <Desc label={"Home Address Phone"} value={leadData?.phone} />
              <Desc
                label={"Current Education Greade"}
                value={leadData?.highest_edu}
              />
              <Desc
                label={"Previous / Current School"}
                value={leadData?.precur_school}
              />
              <Desc
                label={"Major Interested"}
                value={leadData?.major_interested}
              />
              <Desc
                label={"Destination of Study"}
                value={leadData?.destination_of_study}
              />
              <Desc
                label={"Program Interested"}
                value={leadData?.program_interested}
              />
              <Desc label={"Planning Year"} value={leadData?.planning_year} />
              <Desc
                label={"Marketing Source"}
                value={leadData?.marketing_source}
              />
              <Desc
                label={"Ever Contact SUN Office?"}
                value={leadData?.has_contact_sun}
              />
              <Desc
                label={"Today's IELTS participant"}
                value={leadData?.is_ielts_participant}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Detail;
