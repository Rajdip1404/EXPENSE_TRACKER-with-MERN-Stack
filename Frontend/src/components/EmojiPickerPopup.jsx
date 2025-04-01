import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      {/* Icon Button */}
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-12 h-12 flex items-center justify-center text2xl bg-purple-50 text-primary rounded-lg">
          {icon ? (
          <img src={icon} alt="icon" className="w-12 h-12" />
          ) : (
          <LuImage size={28} className="text-primary" />
          )}
        </div>

        <p className="text-xs text-gray-500 mt-2">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {/* Text Label */}

      {/* Emoji Picker Popup */}
      {isOpen && (
        <div className="relative">
          {/* Close Button */}
          <button
            className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <LuX size={20} />
          </button>

          {/* Emoji Picker */}
          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emoji) => {
              onSelect(emoji?.imageUrl || "");
              setIsOpen(false);
            }}
            className=""
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
