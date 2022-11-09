import React, { useState } from "react";
import { BsStarFill } from "react-icons/bs/index.esm.js";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";

export default function RatingSearch({ handleChanges }) {
  const [radioValue, setRadioValue] = useState(1);

  const handleChange = (val) => {
    console.log("val changed", radioValue, val);
    setRadioValue(val);
    handleChanges({ rating: val });
  };

  return (
    <ToggleButtonGroup
      id="rating-search"
      value={radioValue}
      defaultValue={1}
      onChange={handleChange}
      type="radio"
      name="rating"
    >
      {[1, 2, 3, 4, 5].map((value) => (
        <ToggleButton
          id={`star-button-${value}`}
          key={value}
          value={value}
          className="star-button"
          bsPrefix="star-button"
          variant={null}
        >
          <BsStarFill className="star" />
          <span className="star-rating">{value}+</span>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
