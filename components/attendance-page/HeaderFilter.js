import Image from "next/image";
import { useRouter } from "next/router";
import classes from "./HeaderFilter.module.css";

function HeaderFilter(props) {
  const router = useRouter();
  const {
    filter,
    searchColumn,
    setSearchColumn,
    searchBy,
    setSearchBy,
    searchValue,
    setSearchValue,
    allEvent,
    setAllEvent,
    user_type,
    eventName,
  } = props;
  console.log(filter);

  let typeName = filter;
  if (searchColumn === "mobile") {
    typeName = "Phone";
  } else if (searchColumn === "register_id") {
    typeName = "Registration Id";
  } else if (searchColumn === "email") {
    typeName = "Email";
  } else if (searchColumn === "full_name") {
    typeName = "Full Name";
  }
  return (
    filter && (
      <div className={classes.header} data-aos="fade-down">
        <div className={classes.header_label}>
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
          <div className={classes.icon}>
            <Image
              src="/images/icon/calender.png"
              alt="mainpage img"
              width={25}
              height={25}
              objectFit={"contain"}
            />
          </div>
          <h1>{eventName}</h1>
        </div>
        <hr />
        <div className={classes.filter_form}>
          <div className={classes.type_filter}>
            <div>
              <Image
                src="/images/icon/bi_filter.png"
                alt="mainpage img"
                width={40}
                height={50}
                objectFit={"contain"}
                layout={"fixed"}
              />
            </div>

            <select
              className={classes.filter_select}
              defaultValue={filter}
              onChange={(e) => setSearchColumn(e.target.value)}
            >
              {/* <option value="none" selected disabled hidden>
              Select an Option
              </option> */}
              <option value={"mobile"}>Phone</option>
              <option value={"email"}>Email</option>
              <option value={"register_id"}>Registration Id</option>
              {user_type === "admin" && (
                <option value={"full_name"}>Full Name</option>
              )}
            </select>
          </div>
          <div className={classes.search_filter}>
            <input
              type={"text"}
              className={classes.filter_input}
              placeholder={`Search ${typeName}`}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <div>
              <div className={classes.btn_search}>
                <Image
                  src="/images/icon/fa-solid_search.png"
                  alt="search"
                  width={15}
                  height={15}
                  objectFit={"contain"}
                  layout={"fixed"}
                />
              </div>
            </div>
          </div>
        </div>
        {user_type === "admin" && (
          <div className={classes.allEvent}>
            <input
              className={classes.styledCheckbox}
              id="styled-checkbox-1"
              type="checkbox"
              onChange={() => setAllEvent(!allEvent)}
            />
            <label htmlFor="styled-checkbox-1">All Events</label>
          </div>
        )}
      </div>
    )
  );
}

export default HeaderFilter;
// attendance , register
