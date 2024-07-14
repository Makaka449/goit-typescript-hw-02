// ImageCard.tsx

import React from "react";
import css from "./ImageCard.module.css";
import { Image } from "../../../App.types";

interface ImageCardProps {
  image: Image;
  openModal: (image: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, openModal }) => {
  const handleClick = () => {
    openModal(image);
  };

  return (
    <div>
      <img
        src={image.urls.small}
        alt={image.alt_description || image.title}
        className={css.imageContainer}
        onClick={handleClick}
      />
    </div>
  );
};

export default ImageCard;
