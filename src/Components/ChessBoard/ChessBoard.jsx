import React, { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import style from "./ChessBoard.module.css";
import { AiFillBackward, AiFillForward } from "react-icons/ai";
import Black from "../../assets/black.png";
import White from "../../assets/white.png";
import Image from "next/image";
import Crown from "../../assets/crown.png";
import { BsXLg } from "react-icons/bs";
import useSound from "use-sound";
// import clickSfx from "../../sounds/movement.mp3";

const ChessBoard = () => {
  const [game, setGame] = useState(new Chess());
  const [isCPU, setIsCPU] = useState(true);
  const [nextToMove, setNextToMove] = useState("w");
  const [history, setHistory] = useState(game.history());
  const [modal, setModal] = useState(false);
  const [width, setWidth] = useState(0);
  const [heigth, setHeight] = useState(0);

  console.log(width);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      },
      true
    );

    // return () => {
    //   window.removeEventListener("resize", true);
    // };
  }, []);

  // const [playSfx] = useSound(clickSfx);

  // console.log(history);

  // useEffect(() => {}, [fen]);

  // console.log(fen);
  //Let's perform a function on the game state

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  const resetGame = () => {
    safeGameMutate((game) => {
      game.reset();
    });

    setHistory([]);
  };

  //Movement of computer
  function makeRandomMove() {
    const possibleMove = game.moves();

    if (game.game_over()) {
      setModal(true);
    }

    // if (game.in_draw()) {
    //   window.alert("its a draw");
    // }

    //exit if the game is over

    if (
      game.game_over() ||
      game.in_draw() ||
      possibleMove.length === 0 ||
      !isCPU
    )
      return;
    //select random move

    const randomIndex = Math.floor(Math.random() * possibleMove.length);

    //play random move
    safeGameMutate((game) => {
      game.move(possibleMove[randomIndex]);

      // console.log(possibleMove[randomIndex]);
    });
  }

  // console.log(game.history());

  //Perform an action when a piece is droped by a user

  function onDrop(source, target) {
    // playSfx();
    let move = null;

    safeGameMutate((game) => {
      move = game.move({
        from: source,
        to: target,
        promotion: "q",
      });
    });
    setNextToMove(game.turn());
    //illegal move
    if (move == null) return false;
    //valid move

    setTimeout(() => {
      makeRandomMove();
      setHistory(game.history());
    }, 200);

    return true;
  }

  const arr = history.filter((elem, i) => {
    return i % 2 === 0;
  });

  console.log(game);

  return (
    <>
      <div className={`${style.ChessBoard} ${style.pushDown}`}>
        <div className={`disabled ${modal && "modal"}`}>
          <div className="gameOver">
            <BsXLg
              className="X"
              size={"20px"}
              onClick={() => {
                setModal(false);
              }}
            />
            <h2>Game over</h2>
            <h4>
              {game.in_checkmate()
                ? nextToMove === "w"
                  ? "Black won by checkmate!"
                  : "White won by checkmate!"
                : game.insufficient_material()
                ? "Game drawn due to insufficient material!"
                : game.in_threefold_repetition()
                ? "Game drawn due to three fold repetition!"
                : "Its a draw"}
            </h4>
            <div className="images">
              <div
                className={`containers ${
                  game.in_checkmate() && nextToMove === "b" && "win"
                }`}
              >
                <Image src={White} alt="sdf" height={110} width={60} />
              </div>
              <div
                className={`containers ${
                  game.in_checkmate() && nextToMove === "w" && "win"
                }`}
              >
                <Image src={Black} alt="sdf" height={110} width={60} />
              </div>
            </div>
            <div className="names">
              <h3>Player 1</h3>
              <h3>{isCPU ? "CPU" : "Player 2"}</h3>
            </div>
            <div className="newGame">
              <button
                onClick={() => {
                  resetGame();
                  setModal(false);
                }}
              >
                New Game
              </button>
            </div>

            {/* <div className="ventana">sdfsdf</div> */}
          </div>
        </div>
        <div className={style.title}>
          <h2>{isCPU ? "Player 1 vs CPU" : "Player 1 vs Player 2"}</h2>
          <h3>
            {" "}
            {isCPU ? "White" : nextToMove === "w" ? "White" : "Black"} moves
          </h3>
        </div>
        <div className={style.chessBoard}>
          <Chessboard
            position={game.fen()}
            onPieceDrop={onDrop}
            // boardOrientation={"black"}
            boardWidth={
              width < 450 ? 320 : width < 680 || heigth < 900 ? 420 : 560
            }
            // arePremovesAllowed={true}
            // className={style.tablero}
          />
        </div>

        <div className={style.controls}>
          <button
            className={style.extremeButtons}
            onClick={() => {
              safeGameMutate((game) => {
                if (isCPU) {
                  game.undo();
                  game.undo();
                  setHistory(game.history());
                } else {
                  game.undo();
                  setHistory(game.history());
                }
              });
            }}
          >
            {width > 1000 && <AiFillBackward className={style.icons} />}
            <h3>Undo</h3>
            <h3>{width > 1000 && "last"}</h3>
            <h3>move</h3>
          </button>
          <button className={style.reset} onClick={resetGame}>
            <h3>Reset game</h3>
          </button>
        </div>
      </div>
      <div
        className={`${style.modes} ${heigth < 900 && style.pushDown} ${
          width < 1000 && width > 560 && style.flex
        }`}
      >
        {width > 1000 && (
          <div className={style.logo}>
            <h2>React Chess</h2>
            <Image src={Crown} width={70} height={70} alt={"asdf"} />
          </div>
        )}

        <div className={style.gameModes}>
          <h2>Game modes</h2>
          <button
            className={`${style.gameModesButtons} ${!isCPU && style.selected}`}
            onClick={() => {
              setIsCPU((prev) => !prev);
              resetGame();
              setNextToMove("w");
            }}
          >
            <h3>Player 1 vs CPU</h3>
          </button>
          <button
            className={`${style.gameModesButtons} ${isCPU && style.selected}`}
            onClick={() => {
              setIsCPU((prev) => !prev);
              resetGame();
              setNextToMove("w");
            }}
          >
            <h3>Player 1 vs Player 2</h3>
          </button>
        </div>
        <div className={style.history}>
          <h2>Movements history</h2>
          <div className={style.table}>
            <div className={style.pieces}>
              <h3>White</h3>
              <h3>Black</h3>
            </div>
            {history.map((elem, i, array) => {
              return (
                <>
                  {i % 2 === 0 && (
                    <div className={`${style.wrap}`} key={i}>
                      <div className={style.number}>
                        {i % 2 === 0 &&
                          arr.indexOf(
                            arr.filter((elemento) => elemento === elem)[0]
                          ) + 1}
                        .
                      </div>

                      <div className={style.whiteWrap}>
                        <h4>{elem}</h4>
                        <h4 className={style.moves}>{array[i + 1]}</h4>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChessBoard;
