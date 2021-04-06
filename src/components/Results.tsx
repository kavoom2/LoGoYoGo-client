import React from "react";

export default function Results() {
  return (
    <React.Fragment>
      <div id="section-creator">
        <div className="body-header">
          <div className="title">사용할 로고를 선택하세요</div>
          <div className="subtitle">
            선택한 로고는 에디터에서 수정하거나
            <br />
            바로 사용할 수 있습니다.
          </div>
        </div>
        <div className="body-item-outer-container">
          <div className="body-item-container">
            <div className="item">SAMPLE</div>
            <div className="item">SAMPLE</div>
            <div className="item">SAMPLE</div>
            <div className="item">SAMPLE</div>
            <div className="item">SAMPLE</div>
            <div className="item">SAMPLE</div>
            <div className="item">SAMPLE</div>
            <div className="item">SAMPLE</div>
            <div className="item">SAMPLE</div>
            <div className="item">SAMPLE</div>
            <div className="item">SAMPLE</div>
            <div className="item">SAMPLE</div>
            <div className="item">SAMPLE</div>
            <div className="item">SAMPLE</div>
          </div>
        </div>
      </div>
      <div id="footer-creator">
        <button>이전으로 돌아가기</button>
      </div>
    </React.Fragment>
  );
}
