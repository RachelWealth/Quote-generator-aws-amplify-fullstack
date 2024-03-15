import { Backdrop, CircularProgress, Fade, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  MpdalCircularProgress,
  QuoteGeneratorModalCon,
  QuoteGeneratorModalInnerCon,
  QuoteGeneratorSubTitle,
  QuoteGeneratorTitle,
} from "./QuoteFeneratorElements";
import { ImageBlobCon } from "../animations/AnimationElements";
import ImageBlob from "../animations/ImageBlob";
import AnimatedDownloadButton from "../animations/AnimatedDownloadButton";

interface QuoteGeneratorProps {
  open: boolean;
  close: () => void;
  processingQuote: boolean;
  setProcessingQupte: React.Dispatch<React.SetStateAction<boolean>>;
  quoteReceived: string | null;
  setQuoteReceived: React.Dispatch<React.SetStateAction<string | null>>;
}

const style = {};

const QuoteGeneratorModal = ({
  open,
  close,
  processingQuote,
  setProcessingQupte,
  quoteReceived,
  setQuoteReceived,
}: QuoteGeneratorProps) => {
  const wiseDevQuote = "123";
  const wiseDevQuoteAuthor = "author";
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  // handle downloading the quote card
  const handleDownload = () => {
    const link = document.createElement("a");
    if (typeof blobUrl === "string") {
      link.href = blobUrl;
      link.download = "quote.png";
      link.click();
    }
  };

  //handl hte receiving quote card
  useEffect(() => {
    if (quoteReceived) {
      const binaryData = Buffer.from(quoteReceived, "base64");
      const blob = new Blob([binaryData], { type: "image/png" });
      const blobUrlGenerated = URL.createObjectURL(blob);
      console.log(blobUrlGenerated);
      setBlobUrl(blobUrlGenerated);
      return () => {
        URL.revokeObjectURL(blobUrlGenerated);
      };
    }
  }, [quoteReceived]);

  return (
    <>
      <Modal
        id="QuoteGeneratorModal"
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-quotegeneratormodal"
        aria-describedby="modal-modal-quotegeneratormodal"
        slotProps={{
          backdrop: { style: { backgroundColor: "rgba(255,255,255,0.2)" } },
        }}
      >
        <Fade in={open}>
          <QuoteGeneratorModalCon>
            <QuoteGeneratorModalInnerCon>
              {/**State 1: processing rrequest of quote + quote state is empty */}
              {processingQuote === true && quoteReceived === null && (
                <>
                  <MpdalCircularProgress
                    size={"8rem"}
                    thickness={2.5}
                  ></MpdalCircularProgress>
                  <QuoteGeneratorTitle>Creating...</QuoteGeneratorTitle>
                  <QuoteGeneratorSubTitle style={{ marginTop: "20px" }}>
                    {wiseDevQuote}
                    <br />
                    <span style={{ fontSize: 26 }}>{wiseDevQuoteAuthor}</span>
                  </QuoteGeneratorSubTitle>
                </>
              )}
              {/**State 2: Quote state fulfilled */}{" "}
              {quoteReceived !== null && (
                <>
                  <QuoteGeneratorTitle>Download your quote</QuoteGeneratorTitle>
                  <QuoteGeneratorSubTitle>See a preview</QuoteGeneratorSubTitle>
                  <ImageBlobCon>
                    <ImageBlob
                      quoteReceived={quoteReceived}
                      blobUrl={blobUrl}
                    ></ImageBlob>
                  </ImageBlobCon>
                  <AnimatedDownloadButton
                    handleDownload={handleDownload}
                  ></AnimatedDownloadButton>
                </>
              )}
            </QuoteGeneratorModalInnerCon>
          </QuoteGeneratorModalCon>
        </Fade>
      </Modal>
    </>
  );
};

export default QuoteGeneratorModal;
