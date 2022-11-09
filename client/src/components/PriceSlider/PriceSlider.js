import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import { handleRender } from "./TooltipSlider.js";
import "rc-slider/assets/index.css";
// import { Howler, Howl } from "howler";
// import { added } from "../../assets/sounds/sounds.js";

// const alert = new Howl({
//   src: added,
//   html5: true,
// });

export default function PriceSlider() {
  // eslint-disable-next-line no-unused-vars
  const [price, setPrice] = useState(100);
  // const [icon, setIcon] = useState(
  //   <i
  //     className="bi bi-volume-up-fill volume"
  //     onClick={() => setMuted(!muted)}
  //   ></i>
  // );

  // const pickIcon = () => {
  //   if (price > 50 && price <= 100) {
  //     setIcon(
  //       <i
  //         className="bi bi-volume-up-fill volume"
  //         onClick={() => setMuted(!muted)}
  //       ></i>
  //     );
  //   } else if (price > 0) {
  //     setIcon(
  //       <i
  //         className="bi bi-volume-down-fill volume"
  //         onClick={() => setMuted(!muted)}
  //       ></i>
  //     );
  //   } else {
  //     setIcon(
  //       <i
  //         className="bi bi-volume-off-fill volume"
  //         onClick={() => setMuted(!muted)}
  //       ></i>
  //     );
  //   }
  // };

  useEffect(() => {
    console.log("Price Slider Mounted");
  }, []);

  // useEffect(() => {
  //   if (muted) {
  //     Howler.mute(true);
  //     setIcon(
  //       <i
  //         className="bi bi-volume-mute-fill volume"
  //         onClick={() => setMuted(!muted)}
  //       ></i>
  //     );
  //   } else if (!muted) {
  //     Howler.mute(false);
  //     pickIcon();
  //   }
  //   console.log({ muted }, Howler);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [muted]);

  // useEffect(
  //   () => {
  //     Howler.volume(volume / 100);
  //     if (muted) return;
  //     if(volume % 20 === 0) alert.play()
  //     pickIcon();
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [volume]
  // );

  return (
    <div id="volume-container">
      <Slider
        min={0}
        max={200}
        defaultValue={100}
        handleRender={handleRender}
        onChange={(value) => setPrice(value)}
        onClick={() => { }}
      />
      {/* <div id="volume-icon">{icon}</div> */}
    </div>
  );
}
