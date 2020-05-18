import React from "react";
import "./DebateList.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DebateCard from "./DebateCard";
import EmptyState from "./EmptyState";
import PuzzleIcon from "../assets/images/puzzle-large.svg";

class DebateList extends React.PureComponent {
  render() {
    const { debates } = this.props;
    console.log(debates);
    return (
      <div className="DebateList">
        {debates.data &&
        debates.data.debates &&
        debates.data.debates.length > 0 ? (
          debates.data.debates.map((debate) => (
            <DebateCard key={debate} title={debate.title} description={debate.description} />
          ))
        ) : (
          <EmptyState icon={PuzzleIcon} message="No debates" />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  debates: state.debateList,
});

DebateList.propTypes = {
  debates: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(DebateList);
