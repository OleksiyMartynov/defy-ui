import React from "react";
import "./DebateList.scss";
import DebateCard from "../components/DebateCard";
import EmptyState from "./EmptyState";
import PuzzleIcon from "../assets/images/puzzle-large.svg";
import { connect } from "react-redux";

class DebateList extends React.PureComponent {
  render() {
    const { debates } = this.props;
    return (
      <div className="DebateList">
        {debates && debates.length > 0 ? (
          <div>todo list here</div>
        ) : (
          <EmptyState icon={PuzzleIcon} message="No debates" />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  debates: state.debates,
});

export default connect(mapStateToProps)(DebateList);
