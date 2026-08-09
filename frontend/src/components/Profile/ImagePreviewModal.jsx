import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

function ImagePreviewModal({ image, isOpen, onClose }) {

  useEffect(() => {

    const handleKey = (e) => {

      if (e.key === "Escape") {
        onClose();
      }

    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };

  }, [onClose]);

  if (!isOpen) return null;

  return (

    <div
      onClick={onClose}
      className="fixed inset-0 z-[99999] bg-black/80 flex items-center justify-center p-5"
    >

      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-3xl hover:text-red-400 transition"
      >
        <FaTimes />
      </button>

      <img
        src={image}
        alt="Preview"
        onClick={(e) => e.stopPropagation()}
        className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-2xl animate-[zoom_.25s_ease]"
      />

    </div>

  );

}

export default ImagePreviewModal;