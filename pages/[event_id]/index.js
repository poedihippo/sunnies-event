import { useRouter } from "next/router";
import MainPage from "../../components/main-page/MainPage";

export default function Home() {
  const router = useRouter();
  const { event_id } = router.query;
  return <MainPage event_id={event_id} />;
}
