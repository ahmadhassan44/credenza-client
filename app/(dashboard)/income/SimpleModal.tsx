import React from "react";

interface SimpleModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SimpleModal: React.FC<SimpleModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#18181b] p-8 rounded-xl w-full max-w-md mx-auto font-['Space_Grotesk'] relative">
        <button
          aria-label="Close"
          className="absolute top-2 right-2 text-white text-2xl font-bold hover:text-gray-400"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default SimpleModal;
