import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import "bootstrap";
import * as serviceWorker from "./serviceWorkerRegistration.js";

serviceWorker.register({
  onUpdate: (registration) => {
    console.log("registration", registration, registration.waiting);
    alert("New version available, confirm to update");
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }
    window.location.reload();
  },
});


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
  </>
);