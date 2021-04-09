import React, { useEffect } from "react";
import { ChromePicker } from "react-color";
import { fabric } from "fabric";

export default function Text({
  id,
  canvas,
  textSize,
  textColor,
  setTextSize,
  setTextColor,
  setId,
  setIndex,
}) {
  // TODO: Init
  const fonts: Array<string> = [
    "Pacifico",
    "VT323",
    "Quicksand",
    "Inconsolata",
  ];

  useEffect(() => {
    return () => {};
  });

  // TODO: EventHandling Functions
  const handleAddTextBox = () => {
    const textbox: any = new fabric.Textbox("내용을 입력하세요", {
      fontSize: textSize,
      fill: textColor,
    });

    textbox.set({
      // * : 오브젝트 타입과 키값을 명시합니다.
      type: "textbox",
      id: id,
      left: canvas.width / 2 - textbox.width,
      top: canvas.height / 2 - textbox.height,
    });

    setId(id + 1);

    textbox.setControlsVisibility({
      mb: false,
      mt: false,
    });

    // TODO: Event - Selected
    textbox.on("selected", (event) => {
      setTextSize(textbox.fontSize);
      setTextColor(textbox.fill);
      setIndex(1);

      const slider: any = document.getElementById("slider-text");
      if (!slider) return;
      slider.value = String(textbox.fontSize);
    });

    canvas.add(textbox);
    canvas.setActiveObject(textbox);
  };

  const handleChangeColor = (color, event) => {
    const items = canvas.getActiveObjects();

    items.forEach((item) => {
      if (item.type === "textbox") {
        item.set({ fill: color.hex });
      }
    });

    canvas.renderAll();
    setTextColor(color.hex);
  };

  const handleChangeSize = (event) => {
    event.preventDefault();
    const items = canvas.getActiveObjects();

    items.forEach((item) => {
      if (item.type === "textbox") {
        item.set({ fontSize: event.target.value });
      }
    });

    canvas.renderAll();
    setTextSize(event.target.value);
  };

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
        <div className="title">텍스트 상자</div>
        <button onClick={handleAddTextBox}>생성하기</button>
      </div>

      <div className="content">
        <div className="title">글꼴</div>
        <select name="fonts" id="fonts"></select>
      </div>

      <div className="content">
        <div className="title">크기</div>
        <div className="slider-container">
          <input
            type="range"
            min="1"
            max="100"
            id="slider-text"
            className="slider"
            onChange={handleChangeSize}
            defaultValue={textSize}
          ></input>
          <span>{textSize}</span>
        </div>
      </div>

      <div className="content">
        <div className="title">색상</div>
        <div className="color-selector-container">
          <input defaultValue={textColor}></input>
          <div
            className="color-selector-color"
            style={{ backgroundColor: textColor }}
          ></div>
        </div>
        <ChromePicker
          className="color-selector-picker"
          color={textColor}
          onChange={handleChangeColor}
          disableAlpha={true}
        />
      </div>
    </React.Fragment>
  );
}
