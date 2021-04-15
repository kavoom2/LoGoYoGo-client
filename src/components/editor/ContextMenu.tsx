import React, { useEffect } from "react";

export default function ContextMenu({ canvas, visible, pointer, setVisible }) {
  useEffect(() => {
    const contextMenu = document.getElementsByClassName("contextMenu")[0];
    contextMenu.setAttribute(
      "style",
      `top: ${pointer.y + 3}px; left: ${pointer.x + 5}px`
    );

    const handleClickEvent = (e) => {
      e.preventDefault();
      setVisible(false);
    };

    document.addEventListener("click", handleClickEvent);
    document.addEventListener("contextmenu", handleClickEvent);
    return () => {
      document.removeEventListener("click", handleClickEvent);
      document.removeEventListener("contextmenu", handleClickEvent);
    };
  }, []);

  const handleDeleteObject = () => {
    const items = canvas.getObjects();
    for (let i = 0; i < items.length; i++) {
      canvas.remove(items[i]);
    }

    canvas.discardActiveObject().renderAll();
  };

  const handleBringForward = () => {
    const items = canvas.getActiveObjects();
    const lastItem = items[items.length - 1];

    for (let i = 0; i < items.length; i++) {
      canvas.bringForward(items[i]);
    }

    if (items.length > 1) canvas.bringForward(lastItem);

    canvas.discardActiveObject().renderAll();
  };

  const handleSendBackwards = () => {
    const items = canvas.getActiveObjects();

    for (let i = 0; i < items.length; i++) {
      canvas.sendBackwards(items[i]);
    }

    canvas.discardActiveObject().renderAll();
  };

  return (
    <div className="contextMenu">
      <div className="contextMenu-option" onClick={handleBringForward}>
        앞으로 가져오기
      </div>
      <div className="contextMenu-option" onClick={handleSendBackwards}>
        뒤로 보내기
      </div>
      <div className="contextMenu-sperator" />
      <div className="contextMenu-option" onClick={handleDeleteObject}>
        삭제하기
      </div>
    </div>
  );
}
