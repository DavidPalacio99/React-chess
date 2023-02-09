import React, { useEffect, useState } from "react";
import style from "./BottomBar.module.css";
import { BsGithub, BsCodeSlash } from "react-icons/bs";

const BottomBar = () => {
  const [width, setWidth] = useState(0);
  const [heigth, setHeight] = useState(0);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      },
      true
    );
  }, []);
  return (
    <div className={`${style.BottomBar} `}>
      <a href="https://github.com/DavidPalacio99" target={"_blanck"}>
        <BsGithub className={style.icons} />
      </a>
      <h3>Developed by David Palacio</h3>
      <a href="https://github.com/DavidPalacio99/Chess" target={"_blanck"}>
        <BsCodeSlash className={style.icons} />
      </a>
    </div>
  );
};

export default BottomBar;
