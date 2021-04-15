import React from "react";
import { useHistory } from "react-router-dom";
import sample from "../dummy/sample";

export default function selectShape() {
  const history = useHistory();

  const handlePosition = (idx: number): void => {
    const position1 = sample[4].objects[0].left;
    const position2 = sample[4].objects[1].left;
    sample[4].objects[0].left = position1 + idx;
    sample[4].objects[1].left = position2 + idx;
    const makesample = sample[4];
    sessionStorage.setItem("sample", JSON.stringify(makesample));
    sample[4].objects[0].left = position1;
    sample[4].objects[1].left = position2;
    history.push("/maker/editor");
  };

  return (
    <React.Fragment>
      <div id="section-creator">
        <div className="body-header">
          <div className="title">사용할 위치를 선택하세요</div>
          <div className="subtitle">
            선택한 위치는 에디터에서 수정할 수 있습니다
          </div>
        </div>
        <div className="body-item-outer-container">
          <div className="body-item-container">
            <div className="item" onClick={() => handlePosition(-50)}>
              왼쪽
            </div>
            <div className="item" onClick={() => handlePosition(80)}>
              가운데
            </div>
            <div className="item" onClick={() => handlePosition(200)}>
              오른쪽
            </div>
          </div>
        </div>
      </div>
      {/* <div id="footer-creator">
        <button onClick={() => history.push("/maker")}>
          이전으로 돌아가기
        </button>
      </div> */}
    </React.Fragment>
  );
}
