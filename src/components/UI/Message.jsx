import React from "react";

const Message = ({ text }) => {
  return (
    <div className="message">
      <p className="text">{text}</p>
    </div>
  );
};

export default Message;
