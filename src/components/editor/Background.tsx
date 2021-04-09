import React, { useState } from "react";
import { ChromePicker } from "react-color";
import { fabric } from "fabric";

export default function Background({ canvas, bgColor, setBgColor }) {
  const handleChange = (color, event) => {
    setBgColor(color.hex);
    canvas.backgroundColor = color.hex;
    canvas.renderAll();
  };

  return (
    <React.Fragment>
      <div className="header">
        <div className="title">배경</div>
        <div className="description">원하는 배경 색상을 선택하세요.</div>
      </div>

      <div className="content">
        <div className="title">색상</div>
        <div className="color-selector-container">
          <input defaultValue={bgColor}></input>
          <div
            className="color-selector-color"
            style={{ backgroundColor: bgColor }}
          ></div>
        </div>
        <ChromePicker
          className="color-selector-picker"
          color={bgColor}
          onChange={handleChange}
        />
      </div>
    </React.Fragment>
  );
}
