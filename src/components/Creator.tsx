import React from "react";

export default function Creator() {
  return (
    <React.Fragment>
      <div id="section-creator">
        <div className="body-header">
          <div className="title">OOO을 선택하세요</div>
          <div className="subtitle">
            최소 3개 이상을 골라주세요. <br /> 선택한 항목들을 요리조리
            조합해드립니다.
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
        <button>다음으로 넘어가기</button>
      </div>
    </React.Fragment>
  );
}
