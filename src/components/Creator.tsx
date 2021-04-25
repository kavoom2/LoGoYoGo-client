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
import sampleimage8 from "../images/sample/sample8.png";
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
          <div className="title">원하는 템플릿을 선택하세요</div>
          <div className="subtitle">
            원하는 템플릿을 선택하여 로고로 사용해보세요. 또는 하단의 버튼을
            클릭하여 처음부터 만들 수도 있습니다.
          </div>
        </div>
        <div className="body-item-outer-container">
          <div className="body-item-container">
            <div
              className="item-sample"
              onClick={() => samplemaker(0)}
              style={{}}
            >
              <img src={sampleimage1} />
            </div>
            <div className="item-sample">
              <img src={sampleimage2} onClick={() => samplemaker(1)} />
            </div>
            <div className="item-sample">
              <img src={sampleimage3} onClick={() => samplemaker(2)} />
            </div>
            <div className="item-sample">
              <img src={sampleimage4} onClick={() => samplemaker(3)} />
            </div>
            <div className="item-sample">
              <img src={sampleimage5} onClick={() => samplemaker(4)} />
            </div>
            <div className="item-sample">
              <img src={sampleimage6} onClick={() => samplemaker(5)} />
            </div>
            <div className="item-sample">
              <img src={sampleimage7} onClick={() => samplemaker(6)} />
            </div>
            <div className="item-sample">
              <img src={sampleimage8} onClick={() => samplemaker(7)} />
            </div>
          </div>
        </div>
      </div>
      <div id="footer-creator">
        <button
          className="item-sample"
          onClick={() => history.push("/maker/editor")}
        >
          빈 캔버스에서 직접 로고 만들기
        </button>
      </div>
    </React.Fragment>
  );
}
