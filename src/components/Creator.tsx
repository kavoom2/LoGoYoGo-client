import React from "react";
import { useHistory } from "react-router-dom";
import sample from "../dummy/sample";
import sampleimage1 from "../images/sample/sample1.png";
import sampleimage2 from "../images/sample/sample2.png";
import sampleimage3 from "../images/sample/sample3.png";
import sampleimage4 from "../images/sample/sample4.png";
import sampleimage5 from "../images/sample/sample5.png";
import sampleimage6 from "../images/sample/sample6.png";
import sampleimage7 from "../images/sample/sample7.png";
import samplemake from "../images/sample/samplemake.png";

export default function Creator() {
  const history = useHistory();

  const samplemaker = (index) => {
    const selectsample = sample[index];
    sessionStorage.setItem("sample", JSON.stringify(selectsample));
    history.push("/maker/editor");
  };

  return (
    <React.Fragment>
      <div id="section-creator">
        <div className="body-header">
          <div className="title">원하시는 샘플을 선택하세요</div>
          <div className="subtitle">
            이곳에 있는 샘플이 마음에 드시지 않으신가요? <br /> 직접 만드실 수도
            있습니다!
          </div>
        </div>
        <div className="body-item-outer-container">
          <div className="body-item-container">
            <div
              className="item-sample"
              onClick={() => samplemaker(0)}
              style={{
                backgroundImage: `url(${sampleimage1}) `,
              }}
            ></div>
            <div
              className="item-sample"
              onClick={() => samplemaker(1)}
              style={{ backgroundImage: `url(${sampleimage2})` }}
            ></div>
            <div
              className="item-sample"
              onClick={() => samplemaker(2)}
              style={{ backgroundImage: `url(${sampleimage3})` }}
            ></div>
            <div
              className="item-sample"
              onClick={() => samplemaker(3)}
              style={{ backgroundImage: `url(${sampleimage4})` }}
            ></div>
            <div
              className="item-sample"
              onClick={() => samplemaker(4)}
              style={{ backgroundImage: `url(${sampleimage5})` }}
            ></div>
            <div
              className="item-sample"
              onClick={() => samplemaker(5)}
              style={{ backgroundImage: `url(${sampleimage6})` }}
            ></div>
            <div
              className="item-sample"
              onClick={() => samplemaker(6)}
              style={{ backgroundImage: `url(${sampleimage7})` }}
            ></div>
            <div
              className="item-sample"
              style={{ backgroundImage: `url(${samplemake})` }}
              onClick={() => history.push("/maker/editor")}
            ></div>
          </div>
        </div>
      </div>
      {/* <div id="footer-creator">
        <button onClick={() => history.push("/")}>이전으로 돌아가기</button>
        <button onClick={() => history.push("/maker/results")}>
          다음으로 넘어가기
        </button>
      </div> */}
    </React.Fragment>
  );
}
