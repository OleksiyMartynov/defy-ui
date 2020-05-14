import React from "react";
import "./Home.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Toggle from "../components/Toggle";
import Dropdown from "../components/Dropdown";
import DebateCard from "../components/DebateCard";
import DebateList from "../components/DebateList";
import FloatingButton from "../components/FloatingButton";
import { openCreateDebateDialog } from "../actions/ui";

class Home extends React.Component {
  onCreateDebate = () => {
    this.props.openCreateDebateDialog();
  };

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
          <DebateList />
          {/* <FloatingButton onClick={this.onCreateDebate}>
            Create Debate
          </FloatingButton> */}
        </div>
      </div>
    );
  }
}
Home.propTypes = {
  openCreateDebateDialog: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  openCreateDebateDialog: () => dispatch(openCreateDebateDialog()),
});

export default connect(null, mapDispatchToProps)(Home);
