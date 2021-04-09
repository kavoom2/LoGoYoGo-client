import React, { useEffect, useState } from "react";
import { ChromePicker } from "react-color";
import { fabric } from "fabric";

// ! 선택된 Textbox를 모아두는 Container입니다.
const texts: Object = {};

export default function Text({ canvas, setIndex }) {
  // TODO: Init
  const [id, setId] = useState<number>(0);
  const [color, setColor] = useState("Black");
  const [size, setSize] = useState(40);
  const fonts: Array<string> = [
    "Pacifico",
    "VT323",
    "Quicksand",
    "Inconsolata",
  ];

  // useEffect(() => {
  //   return () => {
  //     for (const key in texts) {
  //       delete texts[key];
  //     }
  //   };
  // });

  // TODO: EventHandling Functions
  const handleAddTextBox = () => {
    // * : 생성 버튼을 클릭하면 새로운 텍스트 박스를 생성합니다.
    const textbox: any = new fabric.Textbox("내용을 입력하세요", {
      fontSize: size,
    });

    textbox.set({
      // * : 오브젝트 타입 구분을 할 수 있도록 Type을 설정합니다.
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

    // TODO: 선택되면 팔레트도 TEXT로 넘어가도록 설정합니다.
    textbox.on("selected", (event) => {
      const id = textbox.id;
      texts[id] = textbox;

      setIndex(1);
      setColor(textbox.fill);
    });

    textbox.on("deselected", (event) => {
      const id = textbox.id;
      delete texts[id];
    });

    textbox.on("object:scaling", (options) => {});
    textbox.on("object.modified", (options) => {});

    canvas.add(textbox);
    canvas.setActiveObject(textbox);
  };

  const handleChangeColor = (color, event) => {
    setColor(color.hex);

    if (Object.keys(texts).length > 0) {
      for (const key in texts) {
        const item = texts[key];
        item.set({ fill: color.hex });
      }
      canvas.renderAll();
    }
  };

  const handleChangeSize = (event) => {
    event.preventDefault();
    setSize(event.target.value);

    if (Object.keys(texts).length > 0) {
      for (const key in texts) {
        const item = texts[key];
        item.set({ fontSize: event.target.value });
      }
      canvas.renderAll();
    }
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
            className="slider"
            onChange={handleChangeSize}
            defaultValue={size}
          ></input>
          <span>{size}</span>
        </div>
      </div>

      <div className="content">
        <div className="title">색상</div>
        <div className="color-selector-container">
          <input defaultValue={color}></input>
          <div
            className="color-selector-color"
            style={{ backgroundColor: color }}
          ></div>
        </div>
        <ChromePicker
          className="color-selector-picker"
          color={color}
          onChange={handleChangeColor}
        />
      </div>
    </React.Fragment>
  );
}
