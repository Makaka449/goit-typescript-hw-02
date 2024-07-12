import React from 'react';
import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement("#root");

type Image = {
  urls: {
    small: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
  likes: number;
 
};

type ImageModalProps = {
  image: Image;
  onClose: () => void;
};

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  return (
    <div>
      <Modal isOpen={true} onRequestClose={onClose} className={css.modalWindow}>
        <button onClick={onClose} className={css.modalBtn}>X</button>
        <img src={image.urls.small} alt={image.alt_description} className={css.modalImage} />
        <p>{image.alt_description}</p>
        <p>Author: {image.user.name}</p>
        <p>Likes: {image.likes}</p>
      </Modal>
    </div>
  );
};

export default ImageModal;
