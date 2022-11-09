import React, { useState, useEffect } from "react";
import "./style.css";
import { Badge, CloseButton } from "react-bootstrap";
export default function BadgeValue({ tag, onRemove }) {
  const [value, setValue] = useState(tag.value);
  useEffect(() => {
    setValue(tag.value);
  }, [tag]);

  const removeBadge = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRemove) {
      onRemove({ ...tag, value });
    }
  };

  return (
    <Badge style={{fontSize: "1.1em"} } className="category-badge" bg="" pill>
      {value} <CloseButton className="category-delete" onClick={removeBadge} />
    </Badge>
  );
}
