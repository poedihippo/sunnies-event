import Image from "next/image";
import classes from "./loading.module.css";

function EnterId(props) {
  const { searchColumn, filter } = props;

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
    <div className={classes.enter_id}>
      <Image
        src={"/images/enter_id.png"}
        width={350}
        height={350}
        objectFit={"contain"}
        alt={"enter"}
      />
      <p>Enter {typeName} To Do A Search</p>
    </div>
  );
}

export default EnterId;
