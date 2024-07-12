import React from 'react';
import ImageCard from './ImageCard/ImageCard';
import css from './ImageGallery.module.css';

type Image = {
  id: string;
  url: string;
  // Додайте інші властивості, якщо є
};

type ImageGalleryProps = {
  images: Image[];
  onImageClick: (image: Image) => void;
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <ul className={css.styleList}>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard image={image} onClick={() => onImageClick(image)} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
