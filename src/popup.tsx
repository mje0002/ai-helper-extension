import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const Popup = () => {
  const [text, setText] = useState('');

  chrome.storage.sync.get(['inputtext'], function (data) {
    setText(data.inputtext ?? '');
  });

  return (
    <>
      <div style={{ minWidth: "350px" }}>
        <img src="./icons8-ai-96.png"></img>
        <span>{text}</span>
      </div>
    </>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
