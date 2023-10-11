import React from "react";
import { createRoot } from "react-dom/client";

const Popup = () => {
  return (
    <>
      <div style={{ minWidth: "350px" }}>
        <img src="./icons8-ai-96.png"></img>
        <span>Under Construction</span>
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
