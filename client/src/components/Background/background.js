import React from 'react';
import matrix from "./Matrix.mp4";

const background = () => {
    return (
        <video autoplay loop muted
            style={{
                position: "absolute",
                width: "100%",
                left: "50%",
                top: "50%",
                height: "100%",
                objectFit: "cover",
                transform: "translate(-50%, -50%",
                zIndex: "-1"
            }}
        >
            <source src={matrix} type="video/mp4" />
        </video>
    )
}

export { background };