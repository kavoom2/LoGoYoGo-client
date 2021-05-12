import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";

export default function NoResult() {
  return (
    <div className="clipart-noresult">
      <div>
        <FontAwesomeIcon icon={faFrown} />
      </div>
      <div>결과를 찾을 수 없어요</div>
    </div>
  );
}
