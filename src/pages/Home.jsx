import React from "react";
import "./Home.scss";
import Toggle from "../components/Toggle";
import Dropdown from "../components/Dropdown";
import DebateCard from "../components/DebateCard";
import DebateList from "../components/DebateList";

class Home extends React.Component {
  
  render() {
    return (
      <div className="Home">
        <div className="Home__content">

          <span className="Home__content__heading">Your Debates</span>
          <div className="Home__content__controls">
            <Toggle 
              leftText="Active" 
              rightText="Closed"
              onChange={(toggle) => this.setState({ showActive: toggle })}
            />
            &nbsp;&nbsp;&nbsp;
            <Dropdown />
          </div>
          <DebateList/>
        </div>
      </div>
    );
  }
}

export default Home;
