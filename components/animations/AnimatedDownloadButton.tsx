import React from "react";
import pikachuJson from "@/assets/Pikachu.json";

import {
  CenteredLottie,
  DownloadQuoteCardCon,
  DownloadQuoteCardContext,
} from "./AnimationElements";
import Link from "next/link";
interface AnimatedDownloadButtonProps{
    //handleDownload?:()=>void
    blobUrl: string|null
}
const AnimatedDownloadButton = ({ blobUrl}:AnimatedDownloadButtonProps) => {
  return (
    <div>
      {blobUrl!==null && <Link href={blobUrl} style={{ textDecoration: 'none' }}>
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
      </Link>
      }
      
    </div>
  );
};

export default AnimatedDownloadButton;
