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
            <div className="item-color">
              <div
                className="item-color-inner"
                onClick={() => handleColor("#ff8282")}
                style={{ backgroundColor: "#ff8282" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#ff6e6e")}
                style={{ backgroundColor: "#ff6e6e" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#ff5a5a")}
                style={{ backgroundColor: "#ff5a5a" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#ff4646")}
                style={{ backgroundColor: "#ff4646" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#ff0000")}
                style={{ backgroundColor: "#ff0000" }}
              ></div>
            </div>
            <div className="item-color">
              <div
                className="item-color-inner"
                onClick={() => handleColor("#ffc341")}
                style={{ backgroundColor: "#ffc341" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#ffb937")}
                style={{ backgroundColor: "#ffb937" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#ffaa28")}
                style={{ backgroundColor: "#ffaa28" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#ff9614")}
                style={{ backgroundColor: "#ff9614" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#ff8200")}
                style={{ backgroundColor: "#ff8200" }}
              ></div>
            </div>
            <div className="item-color">
              <div
                className="item-color-inner"
                onClick={() => handleColor("#fffeab")}
                style={{ backgroundColor: "#fffeab" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#fffe91")}
                style={{ backgroundColor: "#fffe91" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#fffd64")}
                style={{ backgroundColor: "#fffd64" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#ffe650")}
                style={{ backgroundColor: "#ffe650" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#ffdc3c")}
                style={{ backgroundColor: "#ffdc3c" }}
              ></div>
            </div>
            <div className="item-color">
              <div
                className="item-color-inner"
                onClick={() => handleColor("#7df4b2")}
                style={{ backgroundColor: "#7df4b2" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#73eaa8")}
                style={{ backgroundColor: "#73eaa8" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#64db99")}
                style={{ backgroundColor: "#64db99" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#50c785")}
                style={{ backgroundColor: "#50c785" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#3cb371")}
                style={{ backgroundColor: "#3cb371" }}
              ></div>
            </div>
            <div className="item-color">
              <div
                className="item-color-inner"
                onClick={() => handleColor("#50c8ff")}
                style={{ backgroundColor: "#50c8ff" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#3cb4ff")}
                style={{ backgroundColor: "#3cb4ff" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#28a0ff")}
                style={{ backgroundColor: "#28a0ff" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#148cff")}
                style={{ backgroundColor: "#148cff" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#0078ff")}
                style={{ backgroundColor: "#0078ff" }}
              ></div>
            </div>
            <div className="item-color">
              <div
                className="item-color-inner"
                onClick={() => handleColor("#d050d0")}
                style={{ backgroundColor: "#d050d0" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#bc3cbc")}
                style={{ backgroundColor: "#bc3cbc" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#a828a8")}
                style={{ backgroundColor: "#a828a8" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#941494")}
                style={{ backgroundColor: "#941494" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#800080")}
                style={{ backgroundColor: "#800080" }}
              ></div>
            </div>
            <div className="item-color">
              <div
                className="item-color-inner"
                onClick={() => handleColor("#ff9dff")}
                style={{ backgroundColor: "#ff9dff" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#f88ef4")}
                style={{ backgroundColor: "#f88ef4" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#ee84ea")}
                style={{ backgroundColor: "#ee84ea" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#e47ae0")}
                style={{ backgroundColor: "#e47ae0" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#da70d6")}
                style={{ backgroundColor: "#da70d6" }}
              ></div>
            </div>
            <div className="item-color">
              <div
                className="item-color-inner"
                onClick={() => handleColor("#bebebe")}
                style={{ backgroundColor: "#bebebe" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#969696")}
                style={{ backgroundColor: "#969696" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#6e6e6e")}
                style={{ backgroundColor: "#6e6e6e" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#464646")}
                style={{ backgroundColor: "#464646" }}
              ></div>
              <div
                className="item-color-inner"
                onClick={() => handleColor("#000000")}
                style={{ backgroundColor: "#000000" }}
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
