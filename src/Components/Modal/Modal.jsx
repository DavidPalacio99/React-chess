import React from "react";
import style from "./Modal.module.css";
import { BsXLg } from "react-icons/bs";

const Modal = ({ modal, setModal }) => {
  return (
    <>
      <div className={`${style.modal} ${!modal && style.closeModal}`}>
        <div className={style.content}>
          <BsXLg
            className="X"
            size={"20px"}
            onClick={() => {
              setModal(false);
            }}
          />
          <h2>How to use React Chess</h2>
          <p>
            Hello, challenger! Welcome to React Chess!. You are the white
            player, and your opponent is the black player (player or CPU). To
            play, drag the piece you want to move, and then drop it on the
            desired destination.
            <br />
            <br />
            You can undo a move by clicking on the previous move button and you
            can also reset the game.
          </p>
          <h2>Chess rules</h2>
          <p>
            You can visit this{" "}
            <a
              href="https://en.wikipedia.org/wiki/Rules_of_chess"
              target={"_blanck"}
            >
              link
            </a>{" "}
            to learn chess rules. React Chess implements all of these rules,
            except for resigning, and time limits.
          </p>
          <button
            onClick={() => {
              setModal(false);
            }}
          >
            Got it!
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
