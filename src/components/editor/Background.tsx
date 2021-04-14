import React from "react";
import ColorPicker from "./ColorPicker";

export default function Background({ canvas, bgColor, setBgColor }) {
  const handleChangeColor = (color, event) => {
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
        <ColorPicker color={bgColor} handleChangeColor={handleChangeColor} />
      </div>
    </React.Fragment>
  );
}
