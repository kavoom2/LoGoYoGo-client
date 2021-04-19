import React from "react";
import { useHistory } from "react-router-dom";
import sample from "../dummy/sample";
import shape from "../dummy/shape";
import sampleimage4 from "../images/sample4.png";

export default function selectShape() {
  const history = useHistory();

  const handleIndex = (idx: number): void => {
    if (idx === 0) {
      sample[4].objects[0].type = "ellipse";
      sample[4].objects[0].rx = 100;
      sample[4].objects[0].ry = 100;
      history.push("/maker/selectcolor");
    } else {
      sample[4].objects[0].type = "path";
      sample[4].objects[0].path = shape[idx - 1];
      delete sample[4].objects[0].rx;
      delete sample[4].objects[0].ry;
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
            <div
              id="sample1"
              className="item-Shape"
              onClick={() => handleIndex(0)}
            ></div>
            <div
              id="sample2"
              className="item-Shape"
              onClick={() => handleIndex(1)}
            ></div>
            <div
              id="sample3"
              className="item-Shape"
              onClick={() => handleIndex(2)}
            ></div>
            <div
              id="sample4"
              className="item-Shape"
              onClick={() => handleIndex(3)}
            ></div>
            <div
              id="sample5"
              className="item-Shape"
              onClick={() => handleIndex(4)}
            ></div>
            <div
              id="sample6"
              className="item-Shape"
              onClick={() => handleIndex(5)}
            ></div>
            <div
              id="sample7"
              className="item-Shape"
              onClick={() => handleIndex(6)}
            ></div>
            <div
              id="sample8"
              className="item-Shape"
              onClick={() => history.push("/maker/editor")}
              // style={{ backgroundImage: `url(${sampleimage4})` }}
            ></div>
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
