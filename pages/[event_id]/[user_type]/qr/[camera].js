import { useRouter } from "next/router";
import QrScanner from "../../../../components/qr/qr-scanner";

function QrPage() {
  const router = useRouter();
  const { event_id, camera } = router.query;
  return <QrScanner event_id={event_id} camera={camera} />;
}

export default QrPage;
