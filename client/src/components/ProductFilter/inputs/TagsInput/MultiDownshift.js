import React, { useState, useEffect } from "react";
import Downshift from "downshift";
import { Menu, Item, BadgeValue } from "./index.js";
import { Button, Form, InputGroup, Container, Row, Col } from "react-bootstrap";
import { IoMdList } from "react-icons/io/index.esm.js";
import "./style.css";
function MultiDownshift({
  onChangedState,
  onItemChanged,
  onRemoveItem,
  items,
  selectedItems,
  onChange,
  itemToString,
}) {
  // state = { inputValue: "" };
  const [inputValue, setInputValue] = useState("");
  const [input, setInput] = useState("");
  const [inputWrapper, setInputWrapper] = useState("");

  const handleStateChange = (changes, downshiftStateAndHelpers) => {
    // console.log("changes", changes);
    if (!downshiftStateAndHelpers.isOpen) {
      // this.setState({ inputValue: "" });
      setInputValue("");
    }

    if (onChangedState) {
      // console.log("onChangedState");
      onChangedState(changes, downshiftStateAndHelpers);
    }
  };

  const onInputChange = (event) => {
    // console.log("onInputChange", event.target.value);
    setInputValue(event.target.value);
    // this.setState({ inputValue: event.target.value });
  };

  const onBadgeBlur = (e, item) => {
    // const { onItemChanged } = this.props;
    // console.log("badge blur", e.target.value, item);
    if (onItemChanged) {
      onItemChanged(item);
    }
  };

  const onRemoveBadge = (item) => {
    onRemoveItem(item);
  };

  const onInputKeyDown = (event) => {
    const currentValue = event.target.value;
    switch (event.keyCode) {
      case 8: // backspace
        if (!currentValue) {
          event.preventDefault();
          popValue();
        }
        return;
      case 9: // tab
        if (inputValue) {
          onChange(inputValue);
          setInputValue("");
          // this.setState({ inputValue: "" });
        }

        event.preventDefault();
        event.stopPropagation();
        return;
      case 46: // backspace
        if (!inputValue) {
          event.preventDefault();
          popValue();
        }
        return;
      case 188: // comma
        if (!inputValue) {
          event.preventDefault();
        } else {
          onChange(inputValue);
          setInputValue("");
          // this.setState({ inputValue: "" });
        }
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  const popValue = () => {
    // const { selectedItem, onRemoveItem } = this.props;
    if (onRemoveItem) {
      onRemoveItem({
        value: selectedItems[selectedItems.length - 1],
        index: selectedItems.length - 1,
      });
    }
  };

  const onWrapperClick = (e) => {
    // console.log("> wrapperclick inputWrapper", inputWrapper);
    if (inputWrapper === e.target || input === e.target) {
      focusOnInput();
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const focusOnInput = () => {
    input.focus();
    if (typeof input.getInput === "function") {
      input.getInput().focus();
    }
  };

  // const [inputRef, setInputRef] = useState(null);

  const inputRef = (c) => {
    setInput(c);
    setInputWrapper(c);
  };
  useEffect(() => {
    // console.log("input", input);
  }, [input]);

  // const inputWrapperRef = (c) => {
  //   setInputWrapper(c);
  // };
  useEffect(() => {
    // console.log("inputWrapper", inputWrapper);
  }, [inputWrapper]);

  // const { itemToString, items, ...rest } = this.props;
  return (
    <Downshift
      onStateChange={handleStateChange}
      itemToString={itemToString}

      // {...rest}
    >
      {({
        getLabelProps,
        getInputProps,
        getItemProps,
        getToggleButtonProps,
        isOpen,
        toggleMenu,
        clearSelection,
        selectedItem,
        highlightedIndex,
      }) => {
        const inputProps = getInputProps({
          value: inputValue,
          ref: inputRef,
          onChange: onInputChange,
          onKeyDown: onInputKeyDown,
          placeholder: "Select Tag(s)",
        });
        const tagItems = selectedItems?.map((item, index) => {
          return { value: item, index };
        });

        return (
          <div>
            <Row className="flex-column">
              <Col id="tags-col">
                <InputGroup id="tags-select" className="shadow">
                  <InputGroup.Text id="tags-label" className="outline">
                    Tags:
                  </InputGroup.Text>
                  <Form.Control {...inputProps} />
                  <Button className="btn-success" {...getToggleButtonProps()}>
                    <IoMdList
                      id="tags-expand"
                      color="white"
                      size="1em"
                      className="tags-expand"
                    ></IoMdList>
                  </Button>
                </InputGroup>
                {!isOpen ? null : (
                  <Menu>
                    {items?.map((item, index) => (
                      <Item
                        key={`item-${index}`}
                        {...getItemProps({
                          item,
                          index,
                          isActive: highlightedIndex === index,
                          isSelected: selectedItem === item,
                        })}
                      >
                        {item}
                      </Item>
                    ))}
                  </Menu>
                )}
              </Col>
              <Col id="badge-col">
                <Container
                  fluid
                  id={"input-wrapper"}
                  innerref={inputWrapper}
                  onClick={onWrapperClick}
                  tabIndex="-1"
                >
                  {tagItems?.map((tag) => (
                    <BadgeValue
                      key={`Badge-${tag.index}`}
                      onBlur={onBadgeBlur}
                      onRemove={onRemoveBadge}
                      tag={tag}
                    />
                  ))}
                </Container>
              </Col>
            </Row>
          </div>
        );
      }}
    </Downshift>
  );
}

export default MultiDownshift;
