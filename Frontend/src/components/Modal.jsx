import React from "react";
import { LuX } from "react-icons/lu";

const Modal = ({ children, isOpen, onClose, title }) => {
    if(!isOpen) return null;
  return (
    <div
      className="fixed top-0 right-0 z-50 flex justify-center items-center w-full h-full overflow-auto bg-black/20 transform transition-transform duration-300 opacity-100"
      style={{
        left: isOpen ? "0" : "-100vw",
        top: isOpen ? "0" : "-100vh",
      }}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full rounded-lg shadow-lg bg-white">
        <div className="relative rounded-lg">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-900"
              onClick={onClose}
            >
              <LuX size={25} />
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
