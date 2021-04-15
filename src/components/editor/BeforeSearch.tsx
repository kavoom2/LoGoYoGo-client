import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrinAlt } from "@fortawesome/free-solid-svg-icons";

export default function BeforeSearch() {
  return (
    <div className="clipart-noresult">
      <div>
        <FontAwesomeIcon icon={faGrinAlt} />
      </div>{" "}
      <div>먼저 검색을 해주세요</div>
    </div>
  );
}
