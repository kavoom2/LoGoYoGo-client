import React from "react";
import colorPalette from "../../dummy/colorPalette";
import "../../scss/editor/ColorPalette.scss";

export default function ColorPalette() {
  const renderColorPalette = (
    palettes: Array<Array<string>>
  ): JSX.Element[] => {
    const result = [];
    let count = 1;

    for (let i = 0; i < palettes.length; i++) {
      const arr = palettes[i];
      result.push(
        <div className="palette-item-container" key={i}>
          <span className="title">No. {count}</span>
          <div className="palette-item">
            <div
              className="palette-item-child"
              style={{ backgroundColor: arr[0] }}
            ></div>
            <div
              className="palette-item-child"
              style={{ backgroundColor: arr[1] }}
            ></div>
            <div
              className="palette-item-child"
              style={{ backgroundColor: arr[2] }}
            ></div>
            <div
              className="palette-item-child"
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
