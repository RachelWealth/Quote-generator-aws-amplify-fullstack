import React from "react";
import pikachuJson from "@/assets/Pikachu.json";
import {
  CenteredLottie,
  DownloadQuoteCardCon,
  DownloadQuoteCardContext,
} from "./AnimationElements";
interface AnimatedDownloadButtonProps{
    handleDownload:()=>void
}
const AnimatedDownloadButton = ({handleDownload}:AnimatedDownloadButtonProps) => {
  return (
    <div>
      <DownloadQuoteCardCon>
        <CenteredLottie
          loop
          animationData={pikachuJson}
          play
          style={{ height: "300px", width: "300px" }}
        ></CenteredLottie>
        <DownloadQuoteCardContext>
          Download your quote card
        </DownloadQuoteCardContext>
      </DownloadQuoteCardCon>
    </div>
  );
};

export default AnimatedDownloadButton;
