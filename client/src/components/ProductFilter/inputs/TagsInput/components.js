import styled from "@emotion/styled";

const Item = styled.div(
  {
    position: "relative",
    cursor: "pointer",
    display: "block",
    border: "none",
    height: "auto",
    textAlign: "left",
    borderTop: "none",
    lineHeight: "1em",
    color: "rgba(0,0,0,.87)",
    fontSize: "1rem",
    textTransform: "none",
    fontWeight: "400",
    boxShadow: "none",
    padding: ".8rem 1.1rem",
    whiteSpace: "normal",
    wordWrap: "normal",
  },
  ({ isActive, isSelected }) => {
    const styles = [];
    if (isActive) {
      styles.push({
        color: "rgba(0,0,0,.95)",
        background: "rgba(0,0,0,.03)",
      });
    }
    if (isSelected) {
      styles.push({
        color: "rgba(0,0,0,.95)",
        fontWeight: "700",
      });
    }
    return styles;
  }
);

const Menu = styled.div({
  zIndex: 100,
  position: "absolute",
  maxHeight: "20rem",
  overflowY: "auto",
  overflowX: "hidden",
  borderTopWidth: "0",
  outline: "0",
  borderRadius: "0 0 3px 3px",
  transition: "opacity .1s ease",
  boxShadow: "0 2px 3px 2px rgba(34,36,38,.15)",
  borderColor: "#f0f0f0",
  borderRightWidth: 1,
  borderBottomWidth: 1,
  borderLeftWidth: 1,
  borderStyle: "solid",
  background: "#fff",
});

export { Menu, Item };
