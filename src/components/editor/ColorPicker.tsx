"use strict";

import React, { useState, useEffect } from "react";
import reactCSS from "reactcss";
import { ChromePicker } from "react-color";

export default function ColorPicker({ color, handleChangeColor }) {
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);

  useEffect(() => {
    const handleResizeEvent = () => {
      const stageWidth = document.body.clientWidth;
      const stageHeight = document.body.clientHeight;

      const div: any = document.getElementsByClassName("color-picker-box")[0];

      if (stageWidth <= 768) {
        setTop(
          div.getBoundingClientRect().top +
            document.documentElement.scrollTop -
            50
        );
        setLeft(stageWidth / 2 + 140);
      } else {
        setTop(
          div.getBoundingClientRect().top + document.documentElement.scrollTop
        );
        setLeft(
          div.getBoundingClientRect().left + document.documentElement.scrollLeft
        );
      }
    };

    window.addEventListener("resize", handleResizeEvent, false);
    return () => {
      window.removeEventListener("resize", handleResizeEvent);
    };
  }, []);

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
    const stageWidth = document.body.clientWidth;
    const stageHeight = document.body.clientHeight;

    const div: any = document.getElementsByClassName("color-picker-box")[0];

    if (stageWidth <= 768) {
      setTop(
        div.getBoundingClientRect().top +
          document.documentElement.scrollTop -
          50
      );
      setLeft(stageWidth / 2 + 140);
    } else {
      setTop(
        div.getBoundingClientRect().top + document.documentElement.scrollTop
      );
      setLeft(
        div.getBoundingClientRect().left + document.documentElement.scrollLeft
      );
    }
  };

  const styles = reactCSS({
    default: {
      color: {
        width: "28px",
        height: "28px",
        borderRadius: "0.2rem",
        background: `${color}`,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "0.5rem",
        boxShadow: "0 0 0 1px #dee0e6",
        display: "inline-block",
        cursor: "pointer",
        transition: `0.2s`,
      },
      popover: {
        position: "fixed",
        top: `${top - 150}px`,
        left: `${left - 250}px`,
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  return (
    <div className="color-picker-container">
      <div
        className="color-picker-box"
        style={styles.swatch}
        onClick={handleClick}
      >
        <div style={styles.color} />
      </div>
      {displayColorPicker ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <ChromePicker
            color={color}
            onChange={handleChangeColor}
            disableAlpha={true}
          />
        </div>
      ) : null}
    </div>
  );
}
