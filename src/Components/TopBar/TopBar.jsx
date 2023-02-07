import React, { useState } from "react";
import style from "./TopBar.module.css";
import { BsQuestionCircle, BsSun, BsMoon } from "react-icons/bs";
import { useTheme } from "next-themes";
import Crown from "../../assets/crown.png";
import Image from "next/image";
import Modal from "../Modal/Modal";

const TopBar = () => {
  const { theme, setTheme } = useTheme();
  const [modal, setModal] = useState(false);

  return (
    <div className={style.TopBar}>
      <Modal modal={modal} setModal={setModal} />
      <BsQuestionCircle
        className={style.icons}
        onClick={() => {
          setModal(true);
        }}
      />
      <div
        className={style.title}
        onClick={() => {
          window.location.reload();
        }}
      >
        <h2>React Chess</h2>
        <Image src={Crown} height={20} width={20} alt="asdfas" />
      </div>

      {theme === "dark" ? (
        <BsMoon
          className={style.icons}
          onClick={() => {
            setTheme(theme === "dark" ? "ligth" : "dark");
          }}
        />
      ) : (
        <BsSun
          className={style.icons}
          onClick={() => {
            setTheme(theme === "dark" ? "ligth" : "dark");
          }}
        />
      )}
    </div>
  );
};

export default TopBar;
