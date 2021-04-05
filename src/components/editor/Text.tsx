import React from "react";

export default function Text() {
  return (
    <React.Fragment>
      <div className="header">
        <div className="title">텍스트</div>
        <div className="description">
          원하는 색상 텍스트를 입력하세요.
          <br />
          글꼴, 크기, 색상을 변경할 수 있습니다.
        </div>
      </div>

      <div className="content">
        <div className="title">텍스트 내용</div>
        <input placeholder="로고를 입력하세요"></input>
      </div>

      <div className="content">
        <div className="title">글꼴</div>
        <select name="fonts" id="fonts"></select>
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
