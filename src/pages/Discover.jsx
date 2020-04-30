import React from "react";
import Button from "../components/Button";
import "./Discover.scss";

class Discover extends React.Component {
  state = { value: "" };
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };
  render() {
    const { value } = this.state;
    return (
      <div className="Discover">
        <span className="Discover__heading">Discover</span>
        <div className="Discover__search-wrapper">
          <input
            type="text"
            value={value}
            onChange={this.handleChange}
            placeholder="Search"
          />
          <Button secondary>
            <i className="fa fa-search" aria-hidden="true"></i>
          </Button>
        </div>
      </div>
    );
  }
}
export default Discover;
