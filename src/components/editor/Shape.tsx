import React, { useEffect } from "react";
import { ChromePicker } from "react-color";
import { fabric } from "fabric";

const shapes: Object = {};

export default function Shape({
  id,
  canvas,
  shapeSize,
  shapeColor,
  setShapeSize,
  setShapeColor,
  setId,
  setIndex,
}) {
  const handleChangeColor = (color, event) => {
    const items = canvas.getActiveObjects();
    items.forEach((item) => {
      if (item.type === "shape") {
        item.set({ fill: color.hex });
      }
    });

    canvas.renderAll();
    setShapeColor(color.hex);
  };

  const handleChangeSize = (event) => {
    event.preventDefault();

    const items = canvas.getActiveObjects();
    items.forEach((item) => {
      if (item.type === "shape") {
        const scale = Number(event.target.value) / Number(item.width);

        item.set({
          width: item.width * scale,
          height: item.height * scale,
          scaleX: 1,
          scaleY: 1,
        });
      }
    });

    canvas.renderAll();
    setShapeSize(parseInt(event.target.value));
  };

  const handleAddShape = () => {
    const shape: any = new fabric.Rect({
      fill: shapeColor,
      width: shapeSize,
      height: shapeSize,
      scaleX: 1,
      scaleY: 1,
      left: canvas.width / 2 - shapeSize / 2,
      top: canvas.height / 2 - shapeSize / 2,
    });

    shape.set({
      // * : 오브젝트 타입과 키값을 명시합니다.
      type: "shape",
      id: id,
    });

    setId(id + 1);

    // TODO: Event - Selected
    shape.on("selected", (event) => {
      setShapeSize(parseInt(shape.width));
      setShapeColor(shape.fill);
      setIndex(2);

      const slider: any = document.getElementById("slider-shape");
      if (!slider) return;
      slider.value = String(shape.width);
    });

    canvas.add(shape);
    canvas.setActiveObject(shape);
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
        <div className="title">도형</div>
        <button onClick={handleAddShape}>생성하기</button>
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
            max="800"
            id="slider-shape"
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
            style={{ backgroundColor: shapeColor }}
          ></div>
        </div>
        <ChromePicker
          className="color-selector-picker"
          color={shapeColor}
          onChange={handleChangeColor}
          disableAlpha={true}
        />
      </div>
    </React.Fragment>
  );
}
