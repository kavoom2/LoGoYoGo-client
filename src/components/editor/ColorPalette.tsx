import React from "react";
import colorPalette from "../../dummy/colorPalette";
import "../../scss/editor/ColorPalette.scss";

export default function ColorPalette({ canvas }) {
  const handleChangeColorPalette = (arr) => {
    const objects = canvas.getObjects();

    // * 1. Change BgColor
    canvas.backgroundColor = arr[0];

    // * 2. Change Shape and Text
    objects.forEach((el) => {
      if (el.customType === "shape" || el.customType === "circle") {
        el.set({ fill: arr[Math.round(Math.random()) + 1] });
      } else if (el.customType === "textbox") el.set({ fill: arr[3] });
    });

    canvas.renderAll();
  };
  const renderColorPalette = (
    palettes: Array<Array<string>>
  ): JSX.Element[] => {
    const result = [];
    let count = 1;

    for (let i = 0; i < palettes.length; i++) {
      const arr = palettes[i];
      result.push(
        <div
          className="palette-item-container"
          key={i}
          onClick={() => {
            handleChangeColorPalette(arr);
          }}
        >
          <span className="title">No. {count}</span>
          <div className="palette-item">
            <div
              className="palette-item-child"
              data-color={arr[0]}
              style={{ backgroundColor: arr[0] }}
            ></div>
            <div
              className="palette-item-child"
              data-color={arr[1]}
              style={{ backgroundColor: arr[1] }}
            ></div>
            <div
              className="palette-item-child"
              data-color={arr[2]}
              style={{ backgroundColor: arr[2] }}
            ></div>
            <div
              className="palette-item-child"
              data-color={arr[3]}
              style={{ backgroundColor: arr[3] }}
            ></div>
          </div>
        </div>
      );
      count++;
    }

    return result;
  };

  return (
    <React.Fragment>
      <div className="header">
        <div className="title">색상 팔레트</div>
        <div className="description">
          원하는 색상 팔레트를 선택하세요.
          <br />각 탭에서 오브젝트의 색상을 개별적으로 변경할 수 있습니다.
        </div>
      </div>
      {renderColorPalette(colorPalette)}
    </React.Fragment>
  );
}
