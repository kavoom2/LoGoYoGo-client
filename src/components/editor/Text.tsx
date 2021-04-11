import React, { useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { fabric } from "fabric";

export default function Text({
  id,
  canvas,
  textSize,
  textColor,
  textAlign,
  fonts,
  fontType,
  fontWeight,
  setTextSize,
  setTextColor,
  setTextAlign,
  setId,
  setIndex,
  setFontType,
  setFontWeight,
}) {
  useEffect(() => {
    setFontType(fonts[0]);
  }, []);

  // TODO: EventHandling Functions
  const handleAddTextBox = () => {
    const textbox: any = new fabric.Textbox("내용을 입력하세요", {
      fontSize: textSize,
      fill: textColor,
      fontFamily: fontType,
      fontWeight: fontWeight,
    });

    textbox.set({
      // * : 오브젝트 타입과 키값을 명시합니다.
      customType: "textbox",
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
      setTextSize(event.target.fontSize);
      setFontWeight(textbox.fontWeight);
      setTextColor(textbox.fill);
      setFontType(textbox.fontFamily);
      setIndex(1);

      const slider: any = document.getElementById("slider-text");
      const fontFamily: any = document.getElementById("fontFamily");
      const fontWeight: any = document.getElementById("fontWeight");

      if (!slider || !fontFamily || !fontWeight) return;
      slider.value = String(textbox.fontSize);
      fontFamily.value = String(textbox.fontFamily);
      fontWeight.value = String(textbox.fontWeight);
    });

    canvas.add(textbox);
    canvas.setActiveObject(textbox);
  };

  const handleChangeColor = (color, event) => {
    const items = canvas.getActiveObjects();

    items.forEach((item) => {
      if (item.customType === "textbox") {
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
      if (item.customType === "textbox") {
        item.set({ fontSize: event.target.value });
      }
    });

    canvas.renderAll();
    setTextSize(event.target.value);
  };

  const handleChangeFont = (event) => {
    const items = canvas.getActiveObjects();

    items.forEach((item) => {
      if (item.customType === "textbox") {
        item.set({ fontFamily: event.target.value });
      }
    });

    setFontType(event.target.value);
    canvas.requestRenderAll();
  };

  const handleChangeFontWeight = (event) => {
    const items = canvas.getActiveObjects();

    items.forEach((item) => {
      if (item.customType === "textbox") {
        item.set({ fontWeight: event.target.value });
      }
    });

    setFontWeight(event.target.value);
    canvas.requestRenderAll();
  };

  const handleChangeTextAlign = (string) => {
    const items = canvas.getActiveObjects();

    items.forEach((item) => {
      if (item.customType === "textbox") {
        item.set({ textAlign: string });
      }
    });

    setTextAlign(string);
    canvas.requestRenderAll();
  };

  // TODO: Render: Fonts lists

  const renderFontLists = () => {
    const result: Array<JSX.Element> = [];
    fonts.forEach((el) => {
      const jsxEl = <option value={el}>{el}</option>;
      result.push(jsxEl);
    });
    return result;
  };

  return (
    <React.Fragment>
      <div className="header">
        <div className="title">텍스트</div>
        <div className="description">
          원하는 색상 텍스트를 입력하세요.
          <br />
          글꼴, 크기, 색상 등을 변경할 수 있습니다.
        </div>
      </div>

      <div className="content">
        <div className="title">텍스트 상자</div>
        <button onClick={handleAddTextBox}>생성하기</button>
      </div>

      <div className="content">
        <div className="title">글꼴</div>
        <select
          name="fontFamily"
          id="fontFamily"
          onChange={handleChangeFont}
          defaultValue={fontType}
        >
          {renderFontLists()}
        </select>
      </div>

      <div className="content">
        <div className="title">굵기</div>
        <select
          name="fontWeight"
          id="fontWeight"
          onChange={handleChangeFontWeight}
          defaultValue={fontWeight}
        >
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="300">300</option>
          <option value="400">400</option>
          <option value="500">500</option>
          <option value="600">600</option>
          <option value="700">700</option>
          <option value="800">800</option>
          <option value="900">900</option>
        </select>
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
        <div className="title">정렬</div>
        <div>
          <button
            onClick={() => {
              handleChangeTextAlign("left");
            }}
          >
            좌측
          </button>
          <button
            onClick={() => {
              handleChangeTextAlign("center");
            }}
          >
            중앙
          </button>
          <button
            onClick={() => {
              handleChangeTextAlign("right");
            }}
          >
            우측
          </button>
        </div>
      </div>

      <div className="content">
        <div className="title">색상</div>
        <div className="color-selector-container">
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
