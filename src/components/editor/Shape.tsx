import React from "react";

export default function Shape() {
  return (
    <React.Fragment>
      <div className="header">
        <div className="title">모양</div>
        <div className="description">
          원하는 도형을 선택하세요.
          <br />
          크기와 색상를 변경할 수 있습니다.
        </div>
      </div>

      <div className="content">
        <div className="title">모양</div>
        <div className="shape-container">
          <div>●</div>
          <div>★</div>
          <div>■</div>
          <div>▲</div>
          <div>◆</div>
          <div>〓</div>
          <div>▼</div>
          <div>♠</div>
          <div>♥</div>
          <div>♣</div>
          <div>◈</div>
          <div>▣</div>
        </div>
      </div>

      <div className="content">
        <div className="title">크기</div>
        <div className="slider-container">
          <input type="range" min="1" max="100" className="slider"></input>
          <span>100</span>
        </div>
      </div>

      <div className="content">
        <div className="title">색상</div>
        <div className="color-selector-container">
          <input></input>
          <div
            className="color-selector-color"
            style={{ backgroundColor: "purple" }}
          ></div>
        </div>
      </div>
    </React.Fragment>
  );
}
