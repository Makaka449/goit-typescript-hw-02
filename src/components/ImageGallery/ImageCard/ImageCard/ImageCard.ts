import React from 'react';
import css from './ImageCard.module.css';

type Image = {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string;
  
};

type ImageCardProps = {
  image: Image;
  onClick: (image: Image) => void;
};

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <div>
      <img
        onClick={() => onClick(image)}
        src={image.urls.small}
        alt={image.alt_description}
        width={400}
        height={300}
        className={css.cardsImage}
      />
    </div>
  );
};

export default ImageCard;
