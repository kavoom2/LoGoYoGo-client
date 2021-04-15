import React from "react";
import { useHistory } from "react-router-dom";
import sample from "../dummy/sample";
import shape from "../dummy/shape";
import sampleimage4 from "../images/sample4.png";

export default function selectShape() {
  const history = useHistory();

  const handleIndex = (idx: number): void => {
    if (idx === 0) {
      sample[4].objects[0].rx = 100;
      sample[4].objects[0].ry = 100;
      history.push("/maker/selectcolor");
    } else {
      sample[4].objects[0].type = "path";
      sample[4].objects[0].path = shape[idx - 1];
      history.push("/maker/selectcolor");
    }
  };

  return (
    <React.Fragment>
      <div id="section-creator">
        <div className="body-header">
          <div className="title">사용할 도형을 선택하세요</div>
          <div className="subtitle">
            선택한 도형은 에디터에서 수정하거나
            <br />
            바로 사용할 수 있습니다.
          </div>
        </div>
        <div className="body-item-outer-container">
          <div className="body-item-container">
            <div className="item" onClick={() => handleIndex(0)}>
              원
            </div>
            <div className="item" onClick={() => handleIndex(1)}>
              직각 삼각형
            </div>
            <div className="item" onClick={() => handleIndex(2)}>
              정상각형
            </div>
            <div className="item" onClick={() => handleIndex(3)}>
              사다리꼴
            </div>
            <div className="item" onClick={() => handleIndex(4)}>
              별
            </div>
            <div className="item" onClick={() => handleIndex(5)}>
              말풍선
            </div>
            <div className="item" onClick={() => handleIndex(6)}>
              구름
            </div>
            <div
              className="item"
              onClick={() => history.push("/maker/editor")}
              style={{ backgroundImage: `url(${sampleimage4})` }}
            >
              SAMPLE
            </div>
            {/* <div className="item">SAMPLE</div>
            <div className="item">SAMPLE</div>
            <div className="item">SAMPLE</div>
            <div className="item">SAMPLE</div>
            <div className="item">SAMPLE</div>
            <div className="item">SAMPLE</div> */}
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
