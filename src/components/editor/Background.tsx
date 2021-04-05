import React from "react";

export default function Background() {
  return (
    <React.Fragment>
      <div className="header">
        <div className="title">배경</div>
        <div className="description">원하는 배경 색상을 선택하세요.</div>
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
