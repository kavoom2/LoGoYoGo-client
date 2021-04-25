import React, { useEffect } from "react";
import { fabric } from "fabric";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignRight,
  faAlignLeft,
  faAlignCenter,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import ColorPicker from "./ColorPicker";

export default function Text({
  canvas,
  textSize,
  textColor,
  fonts,
  fontType,
  fontWeight,
  setTextSize,
  setTextColor,
  setTextAlign,
  setFontType,
  setFontWeight,
}) {
  useEffect(() => {
    setFontType(fonts[1]);

    // TODO: 슬라이더 Rerender 바 색상 렌더
    const slider = document.getElementById("slider-text");
    const value = ((textSize - 1) / (250 - 1)) * 100;
    slider.style.background =
      "linear-gradient(to right, #859ffd 0%, #859ffd " +
      value +
      "%, #eef0f6 " +
      value +
      "%, #eef0f6 100%)";

    // TODO: 슬라이더 Value 변경시 바 색상 렌더
    document.getElementById("slider-text").oninput = function (this: any) {
      var value = ((this.value - this.min) / (this.max - this.min)) * 100;
      this.style.background =
        "linear-gradient(to right, #859ffd 0%, #859ffd " +
        value +
        "%, #eef0f6 " +
        value +
        "%, #eef0f6 100%)";
    };
  }, []);

  // TODO: EventHandling Functions
  const handleAddTextBox = () => {
    const textbox: any = new fabric.Textbox(" ", {
      fontSize: textSize,
      fill: textColor,
      fontFamily: fontType,
      fontWeight: fontWeight,
    });

    textbox.set("text", "내용을 입력하세요");
    textbox.set({
      // * : 오브젝트 타입과 키값을 명시합니다.
      customType: "textbox",
      left: canvas.width / 2 - textbox.width / 2,
      top: canvas.height / 2 - textbox.height / 2,
    });

    textbox._charWidthsCache = {};
    textbox._clearCache();

    textbox.setControlsVisibility({
      mb: false,
      mt: false,
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
    event.preventDefault();
    const items = canvas.getActiveObjects();

    items.forEach((item) => {
      if (item.customType === "textbox") {
        const text = item.text;
        item.set("fontFamily", event.target.value);
        item.set("text", text + " ");
        item.set("text", text);

        item._charWidthsCache = {};
        item._clearCache();
      }
    });

    setFontType(event.target.value);
    canvas.renderAll();
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
    fonts.forEach((el, idx) => {
      const jsxEl = (
        <option key={idx} value={el} style={{ fontFamily: el }}>
          {el}
        </option>
      );
      result.push(jsxEl);
    });
    return result;
  };

  const renderWeightLists = () => {
    const result: Array<JSX.Element> = [];
    for (let i = 100; i <= 900; i += 100) {
      const jsxEl = (
        <option key={i} value={i}>
          {i}
        </option>
      );
      result.push(jsxEl);
    }
    return result;
  };

  return (
    <React.Fragment>
      <div className="header">
        <div className="title">텍스트</div>
        <div className="description">
          원하는 텍스트를 입력하세요.
          <br />
          글꼴, 크기, 색상 등을 변경할 수 있습니다.
        </div>
      </div>

      <div className="content">
        <div className="title">텍스트 상자</div>
        <button onClick={handleAddTextBox}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      <div className="content">
        <div className="title">글꼴</div>
        <select
          name="fontFamily"
          id="fontFamily"
          onChange={handleChangeFont}
          defaultValue={fontType}
          style={{ fontFamily: fontType }}
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
          {renderWeightLists()}
        </select>
      </div>

      <div className="content">
        <div className="title">크기</div>
        <div className="slider-container">
          <input
            type="range"
            min="1"
            max="250"
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
            <FontAwesomeIcon icon={faAlignLeft} />
          </button>
          <button
            onClick={() => {
              handleChangeTextAlign("center");
            }}
          >
            <FontAwesomeIcon icon={faAlignCenter} />
          </button>
          <button
            onClick={() => {
              handleChangeTextAlign("right");
            }}
          >
            <FontAwesomeIcon icon={faAlignRight} />
          </button>
        </div>
      </div>

      <div className="content">
        <div className="title">색상</div>
        <ColorPicker
          color={textColor}
          handleChangeColor={handleChangeColor}
          id="_"
        />
      </div>
    </React.Fragment>
  );
}
