import React from "react";
import "./DebateList.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DebateCard from "./DebateCard";
import EmptyState from "./EmptyState";
import PuzzleIcon from "../assets/images/puzzle-large.svg";
import Button from "./Button";
import { fetchDebates } from "../actions/debates";

class DebateList extends React.PureComponent {
  render() {
    const { debates } = this.props;
    console.log(debates);
    return (
      <div className="DebateList">
        {debates.data &&
        debates.data.debates &&
        debates.data.debates.length > 0 ? (
          <>
            {debates.data.debates.map((debate) => (
              <DebateCard
                key={debate["_id"]}
                id={debate["_id"]}
                title={debate.title}
                description={debate.description}
                finished={debate.finished}
                dateCreated={debate.created}
                dateUpdated={debate.updated}
                durationMilli={debate.duration}
                stake={debate.stake}
                totalPro={debate.totalPro}
                totalCon={debate.totalCon}
                totalLocked={debate.totalLocked}
                tags={debate.tags}
              />
            ))}
            {debates.data.page + 1 < debates.data.pages && (
              <Button onClick={() => this.props.fetchDebates(true)}>
                {" "}
                Load more
              </Button>
            )}
          </>
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
const mapDispatchToProps = (dispatch) => ({
  fetchDebates: (loadNextPage) => dispatch(fetchDebates(loadNextPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DebateList);
