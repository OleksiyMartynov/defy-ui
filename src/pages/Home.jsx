import React from "react";
import "./Home.scss";
import Toggle from "../components/Toggle";
import Dropdown from "../components/Dropdown";
import DebateCard from "../components/DebateCard";

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <div className="Home__content">

          <span className="Home__content__heading">Your Debates</span>
          <div className="Home__content__controls">
            <Toggle />
            &nbsp;&nbsp;&nbsp;
            <Dropdown />
          </div>
          <div className="Home__content__cards">
          <DebateCard />
          <DebateCard />
          <DebateCard />
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
