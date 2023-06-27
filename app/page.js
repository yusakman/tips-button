import { ConnectButton } from "@rainbow-me/rainbowkit";
import TipsButton from "./components/TipsButton/tipsbutton";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 12,
      }}
    >
      <ConnectButton />
      <TipsButton />
    </div>
  );
}
