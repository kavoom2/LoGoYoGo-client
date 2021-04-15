import React from "react";
import { useHistory } from "react-router-dom";
import sample from "../dummy/sample";

export default function selectShape() {
  const history = useHistory();

  const handleColor = (string: string): void => {
    sample[4].objects[0].fill = string;
    sample[4].objects[1].fill = string;
    history.push("/maker/selectposition");
  };

  return (
    <React.Fragment>
      <div id="section-creator">
        <div className="body-header">
          <div className="title">사용할 색상을 선택하세요</div>
          <div className="subtitle">
            선택한 색상은 에디터에서 수정할 수 있습니다
          </div>
        </div>
        <div className="body-item-outer-container">
          <div className="body-item-container">
            <div
              className="item"
              onClick={() => handleColor("red")}
              style={{ backgroundColor: "red" }}
            >
              SAMPLE1
            </div>
            <div
              className="item"
              onClick={() => handleColor("orange")}
              style={{ backgroundColor: "orange" }}
            >
              SAMPLE2
            </div>
            <div
              className="item"
              onClick={() => handleColor("yellow")}
              style={{ backgroundColor: "yellow" }}
            >
              SAMPLE3
            </div>
            <div
              className="item"
              onClick={() => handleColor("green")}
              style={{ backgroundColor: "green" }}
            >
              SAMPLE4
            </div>
            <div
              className="item"
              onClick={() => handleColor("blue")}
              style={{ backgroundColor: "blue" }}
            >
              SAMPLE
            </div>
            <div
              className="item"
              onClick={() => handleColor("indigo")}
              style={{ backgroundColor: "indigo" }}
            >
              SAMPLE
            </div>
            <div
              className="item"
              onClick={() => handleColor("violet")}
              style={{ backgroundColor: "violet" }}
            >
              SAMPLE
            </div>
            <div
              className="item"
              onClick={() => handleColor("black")}
              style={{ backgroundColor: "black" }}
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
