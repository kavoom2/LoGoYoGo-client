import React from "react";
import { useHistory } from "react-router-dom";
import creator from "../dummy/creator";
import leftposition from "../images/position/leftposition.png";
import middleposition from "../images/position/middleposition.png";
import rightposition from "../images/position/rightposition.png";

export default function selectShape() {
  const history = useHistory();

  const handlePosition = (idx: number): void => {
    const position1 = creator[0].objects[0].left;
    const position2 = creator[0].objects[1].left;
    creator[0].objects[0].left = position1 + idx;
    creator[0].objects[1].left = position2 + idx;
    const makesample = creator[0];
    sessionStorage.setItem("sample", JSON.stringify(makesample));
    creator[0].objects[0].left = position1;
    creator[0].objects[1].left = position2;
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
            <div className="item-position-margin">
              <div
                className="item-position"
                onClick={() => handlePosition(-50)}
                style={{
                  backgroundImage: `url(${leftposition}) `,
                }}
              ></div>
            </div>
            <div className="item-position-margin">
              <div
                className="item-position"
                onClick={() => handlePosition(80)}
                style={{
                  backgroundImage: `url(${middleposition}) `,
                }}
              ></div>
            </div>
            <div className="item-position-margin">
              <div
                className="item-position"
                onClick={() => handlePosition(200)}
                style={{
                  backgroundImage: `url(${rightposition}) `,
                }}
              ></div>
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
