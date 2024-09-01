import React from "react";
import ReactModal from "react-modal";
import styles from "./ImageModal.module.css";

ReactModal.setAppElement("#root");

const ImageModal = ({ isOpen, onRequestClose, image }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onRequestClose();
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      onRequestClose={onRequestClose}>
      <img
        src={image.urls.regular}
        alt={image.alt_description}
        className={styles.image}
      />
    </ReactModal>
  );
};

export default ImageModal;
