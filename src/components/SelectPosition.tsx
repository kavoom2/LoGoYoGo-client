import React from "react";
import { useHistory } from "react-router-dom";
import creator from "../dummy/creator";
import imgPath0 from "../images/position/pos0.png";
import imgPath1 from "../images/position/pos1.png";
import imgPath2 from "../images/position/pos2.png";

export default function selectShape() {
  const history = useHistory();

  const handlePosition = (posIdx: number): void => {
    // TODO: Variable Init
    const shape = creator[0].objects[0];
    const textbox = creator[0].objects[1];
    const canvasWidth = 700;
    const canvasHeight = 600;

    if (posIdx === 0) {
      const totalWidth =
        shape.width * shape.scaleX + textbox.width * textbox.scaleX + 40;

      creator[0].objects[0].top =
        (canvasHeight - shape.height * shape.scaleY) / 2;
      creator[0].objects[0].left = (canvasWidth - totalWidth) / 2;

      creator[0].objects[1].top =
        (canvasHeight - textbox.height * textbox.scaleY) / 2;
      creator[0].objects[1].left =
        (canvasWidth - totalWidth) / 2 + shape.width * shape.scaleX + 40;
    } else if (posIdx === 1) {
      const totalHeight =
        shape.height * shape.scaleY + textbox.height * textbox.scaleY + 25;

      creator[0].objects[0].top = (canvasHeight - totalHeight) / 2;
      creator[0].objects[0].left =
        (canvasWidth - shape.width * shape.scaleX) / 2;

      creator[0].objects[1].top =
        (canvasHeight - totalHeight) / 2 + shape.height * shape.scaleY + 25;
      creator[0].objects[1].left =
        (canvasWidth - textbox.width * textbox.scaleX) / 2;
    } else if (posIdx === 2) {
      const totalWidth =
        shape.width * shape.scaleX + textbox.width * textbox.scaleX + 30;

      creator[0].objects[0].top =
        (canvasHeight - shape.height * shape.scaleY) / 2;
      creator[0].objects[0].left =
        (canvasWidth - totalWidth) / 2 + textbox.width * textbox.scaleX + 30;

      creator[0].objects[1].top =
        (canvasHeight - textbox.height * textbox.scaleY) / 2;
      creator[0].objects[1].left = (canvasWidth - totalWidth) / 2;
    }

    creator[0].objects[0].customType = "shape";
    creator[0].objects[1].customType = "textbox";

    const makesample = creator[0];
    sessionStorage.setItem("sample", JSON.stringify(makesample));
    history.push("/maker/editor");
  };

  return (
    <React.Fragment>
      <div id="section-creator">
        <div className="body-header">
          <div className="title">????????? ???????????????.</div>
          <div className="subtitle">
            ????????? ???????????? ????????? ????????? ???????????? ???????????????. ????????? ?????????
            ??????????????? ????????? ??? ????????????.
          </div>
        </div>
        <div className="body-item-outer-container">
          <div className="body-item-container">
            <div className="item-position">
              <img src={imgPath0} onClick={() => handlePosition(0)} />
            </div>
            <div className="item-position">
              <img src={imgPath1} onClick={() => handlePosition(1)} />
            </div>
            <div className="item-position">
              <img src={imgPath2} onClick={() => handlePosition(2)} />
            </div>
          </div>
        </div>
      </div>
      <div id="footer-creator">
        <button
          className="item-sample"
          onClick={() => history.push("/maker/editor")}
        >
          ??? ??????????????? ?????? ?????? ?????????
        </button>
      </div>
    </React.Fragment>
  );
}
