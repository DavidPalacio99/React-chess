import { Inter } from "@next/font/google";
import TopBar from "@/Components/Topbar/TopBar";
import BottomBar from "@/Components/BottomBar/BottomBar";
import ChessBoard from "@/Components/ChessBoard/ChessBoard";
import style from "./index.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <TopBar />
      <div className={"board"}>
        <ChessBoard />
      </div>
      <BottomBar />
    </>
  );
}
