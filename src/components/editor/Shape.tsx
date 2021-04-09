import React, { useEffect } from "react";
import { ChromePicker } from "react-color";
import { fabric } from "fabric";

const shapes: Object = {};

export default function Shape({
  canvas,
  shapeSize,
  shapeColor,
  setShapeSize,
  setShapeColor,
}) {
  const handleChangeColor = (color, event) => {
    setShapeColor(color.hex);

    // if (Object.keys(shapes).length > 0) {
    //   for (const key in shapes) {
    //     const item = shapes[key];
    //     item.set({ fill: color.hex });
    //   }
    //   canvas.renderAll();
    // }
  };

  const handleChangeSize = (event) => {
    event.preventDefault();
    setShapeSize(event.target.value);

    // if (Object.keys(shapes).length > 0) {
    //   for (const key in shapes) {
    //     const item = shapes[key];
    //     item.set({ fontSize: event.target.value });
    //   }
    //   canvas.renderAll();
    // }
  };

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
          <input
            type="range"
            min="1"
            max="100"
            className="slider"
            onChange={handleChangeSize}
            defaultValue={shapeSize}
          ></input>
          <span>{shapeSize}</span>
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
        <ChromePicker
          className="color-selector-picker"
          color={shapeColor}
          onChange={handleChangeColor}
        />
      </div>
    </React.Fragment>
  );
}
