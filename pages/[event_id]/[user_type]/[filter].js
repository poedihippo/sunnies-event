import { useRouter } from "next/router";
import AttendancePage from "../../../components/attendance-page/AttendancePage";

function Attendance() {
  const router = useRouter();
  const { event_id, filter, user_type } = router.query;
  return (
    <AttendancePage filter={filter} event_id={event_id} user_type={user_type} />
  );
}

export default Attendance;
