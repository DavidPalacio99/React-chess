import { Inter } from "@next/font/google";
import TopBar from "../Components/TopBar/TopBar";
import BottomBar from "../Components/BottomBar/BottomBar";
import ChessBoard from "../Components/ChessBoard/ChessBoard";

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
