import Image, { StaticImageData } from 'next/image';
import defaultImage from 'public/default-image.png';
import React, { useState } from 'react';

type PropsType = {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
  quality?: number
};

const Img: React.FC<PropsType> = ({ src, width = 100, height = 100, alt = 'product', quality = 75 }: PropsType) => {
  const [image, setImage] = useState<string | StaticImageData>(src);

  const handleError = () => {
    setImage(defaultImage);
  };

  return (
    <Image
      src={image}
      width={width}
      height={height}
      alt={alt}
      onError={handleError}
      style={{objectFit: 'cover'}}
      quality={quality}
    />
  );
};

export default Img;
