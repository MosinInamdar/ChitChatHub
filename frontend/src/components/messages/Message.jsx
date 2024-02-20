import React from "react";

const Message = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            alt="Avatar"
          />
        </div>
      </div>
      <div className={`chat-bubble text-white bg-blue-500`}>Hi, What's up?</div>
      <div className="chat-footer opacity-50">Seen at 12:46</div>
    </div>
  );
};

export default Message;
