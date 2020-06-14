import React from "react";
import "./Dropdown.scss";
import PropTypes from "prop-types";
import Button from "./Button";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedIndex: 0 };
  }

  handleToggleChange = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  onItemClick = (index) => {
    this.setState({ selectedIndex: index });
    const { itemSelectedListener } = this.props;
    itemSelectedListener(index);
  };

  render() {
    const { open, selectedIndex } = this.state;
    const {items} = this.props;
    //const items = ["Newest", "Oldest", "Stake"];
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
          {items[selectedIndex]}
          <i className={`fa fa-chevron-down${open ? " selected" : ""}`} />
          {open && <div className="Dropdown__content">{content}</div>}
        </Button>
      </div>
    );
  }
}
Dropdown.propTypes = {
  items: PropTypes.array.isRequired,
  itemSelectedListener: PropTypes.func.isRequired
};
export default Dropdown;
