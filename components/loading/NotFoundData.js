import Image from "next/image";
import classes from "./loading.module.css";

function NotFound(props) {
  const { searchColumn, filter } = props;

  console.log(filter);

  let typeName;
  if (searchColumn === "mobile" || filter === "mobile") {
    typeName = "Phone";
  } else if (searchColumn === "register_id" || filter === "register_id") {
    typeName = "Registration Id";
  } else if (searchColumn === "email" || filter === "email") {
    typeName = "Email";
  } else if (searchColumn === "full_name" || filter === "full_name") {
    typeName = "Full Name";
  }
  return (
    <div className={classes.not_found}>
      <Image
        src={"/images/not-found.png"}
        width={350}
        height={350}
        objectFit={"contain"}
        alt='not-found'
      />
      <h1>Your {typeName} Was Not Found</h1>
      <p>Do Registration First</p>
    </div>
  );
}

export default NotFound;
