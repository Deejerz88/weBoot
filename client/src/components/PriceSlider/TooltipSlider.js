import React from "react";
import "rc-tooltip/assets/bootstrap.css";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";

const HandleTooltip = (props) => {
  const {
    value,
    children,
    visible,
    tipFormatter = (val) => `$${val}`,
  } = props;

  const tooltipRef = React.useRef(null);

  function keepAlign() {
    if (tooltipRef.current) {
      tooltipRef.current.forcePopupAlign();
    }
  }

  React.useEffect(() => {
    keepAlign();
  }, [value]);

  return (
    <Tooltip
      placement="top"
      overlay={tipFormatter(value)}
      overlayInnerStyle={{ minHeight: "auto" }}
      visible={visible}
      ref={tooltipRef}
      {...props}
    >
      {children}
    </Tooltip>
  );
};

export const handleRender = (node, props) => {
  return (
    <HandleTooltip value={props.value} visible={props.dragging}>
      {node}
    </HandleTooltip>
  );
};

const TooltipSlider = ({ tipFormatter, tipProps, ...props }) => {
  const tipHandleRender = (node, handleProps) => {
    return (
      <HandleTooltip
        value={handleProps.value}
        visible={handleProps.dragging}
        tipFormatter={tipFormatter}
        {...tipProps}
      >
        {node}
      </HandleTooltip>
    );
  };

  return <Slider {...props} handle={tipHandleRender} />;
};

export default TooltipSlider;
