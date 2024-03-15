import React, { useEffect, useState } from "react";
import Image from "next/image";
interface ImageBlobConProps {
  quoteReceived: string | null;
  blobUrl?: string | null;
}
const ImageBlob = ({
  quoteReceived,
}: //blobUrl
ImageBlobConProps) => {
  const [blobUrl, serBlobUrl] = useState<string | null>(null);
  useEffect(() => {
    const response = {
      statusCode: 200,
      headers: {},
    };
  });
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
