import React from "react";
import "./Dropdown.scss";
import Button from "./Button";
class Dropdown extends React.Component {
  state = { left: true, selectedIndex: 0 };
  handleToggleChange = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  onItemClick = (index) => {
    this.setState({ selectedIndex: index });
  };
  render() {
    const { open, selectedIndex } = this.state;
    const items = ["Newest", "Oldest", "Stake"];
    const content = items.map((item, index) => (
      <div
        key={index}
        onClick={() => this.onItemClick(index)}
        className={
          selectedIndex === index
            ? "Dropdown__content__item--selected"
            : "Dropdown__content__item"
        }
      >
        {item}
      </div>
    ));
    return (
      <div className="Dropdown">
        <Button selected={open} onClick={this.handleToggleChange}>
          {items[selectedIndex]}&nbsp;&nbsp;
          <i className={"fa fa-chevron-down"+(open?" selected":"")}></i>
          {open && <div className="Dropdown__content">{content}</div>}
        </Button>
      </div>
    );
  }
}
export default Dropdown;
