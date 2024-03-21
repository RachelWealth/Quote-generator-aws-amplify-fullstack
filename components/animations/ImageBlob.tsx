import React, { useEffect, useState } from "react";
import Image from "next/image";
interface ImageBlobConProps {
  blobUrl: string | null;
}
const ImageBlob = ({
  blobUrl
}: //blobUrl
ImageBlobConProps) => {

  if (!blobUrl) {
    return null;
  }
  return (
    <div>
      {" "}
      <Image
        src={blobUrl}
        alt="Generated quote card"
        width={150}
        height={100}
      />
    </div>
  );
};

export default ImageBlob;
