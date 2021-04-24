import React from "react";
import { useHistory } from "react-router-dom";
import creator from "../dummy/creator";
import shape from "../dummy/shape";
import samplemake from "../images/sample/samplemake.png";

export default function selectShape() {
  const history = useHistory();

  const handleIndex = (idx: number): void => {
    if (idx === 0) {
      creator[0].objects[0].type = "ellipse";
      creator[0].objects[0].rx = 100;
      creator[0].objects[0].ry = 100;
      history.push("/maker/selectcolor");
    } else {
      creator[0].objects[0].type = "path";
      creator[0].objects[0].path = shape[idx - 1];
      delete creator[0].objects[0].rx;
      delete creator[0].objects[0].ry;
      history.push("/maker/selectcolor");
    }
  };

  return (
    <React.Fragment>
      <div id="section-creator">
        <div className="body-header">
          <div className="title">사용할 도형을 선택하세요</div>
          <div className="subtitle">
            선택한 도형은 에디터에서 수정할 수 있습니다
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
              style={{ backgroundImage: `url(${samplemake})` }}
            ></div>
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
