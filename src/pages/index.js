import { Inter } from "@next/font/google";

import BottomBar from "@/Components/BottomBar/BottomBar";
import ChessBoard from "@/Components/ChessBoard/ChessBoard";
import style from "./index.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="wrapper">
      <TopBar />
      <div className={"board"}>
        <ChessBoard />
      </div>
      <BottomBar />
    </div>
  );
}
