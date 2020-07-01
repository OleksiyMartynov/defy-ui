import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchDebateDetails } from "../actions/debates";
import { fetchCreateOpinion } from "../actions/opinions";
import "./DebateDetails.scss";
import DebateChart from "../components/DebateChart";
import VerticalDebateProgress from "../components/VerticalDebateProgress";
import OpinionList from "../components/OpinionList";
import Toggle from "../components/Toggle";
import CreateOpinionCard from "../components/CreateOpinionCard";
import Formatter from "../utils/Formatter";
import DebateTime from "../components/DebateTime";
import WinnerBadge from "../components/WinnerBadge";

class DebateDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { showSection: false }; // 0 for pro, 1 for con
    const { match, fetchDebateDetails } = this.props;
    const debateId = match.params.slug;
    // todo validate debateId
    fetchDebateDetails(debateId);
  }

  render() {
    const { match, debateDetails } = this.props;
    const { showSection } = this.state;
    const debateId = match.params.slug;

    return (
      <div>
        {debateDetails.data ? (
          <div className="DebateDetails">
            <div className="DebateDetails__head-content">
              <div>
                <div className="DebateDetails__title">
                  {debateDetails.data.debate.title}
                </div>
                <DebateTime
                  finished={debateDetails.data.debate.finished}
                  dateCreated={debateDetails.data.debate.created}
                  dateUpdated={debateDetails.data.debate.updated}
                  durationMilli={debateDetails.data.debate.duration}
                />
              </div>
              <div className="DebateDetails__stake">
                <i className="fa fa-bolt" />
                {Formatter.kFormatter(
                  debateDetails.data.debate.stake +
                    debateDetails.data.debate.totalPro +
                    debateDetails.data.debate.totalCon
                )}
              </div>
            </div>
            <br />
            todo: show tags
            <br />
            todo: show "creator stake"
            <br />
            todo: show pro/con totals for ongoing
            <div className="DebateDetails__chart">
              <DebateChart
                data={debateDetails.data.history.map((item) => ({
                  Pro: item.totalPro,
                  Con: item.totalCon,
                }))}
              />
              <div className="DebateDetails__chart__progress">
                <VerticalDebateProgress
                  pro={debateDetails.data.debate.totalPro}
                  total={
                    debateDetails.data.debate.totalPro +
                    debateDetails.data.debate.totalCon
                  }
                />
              </div>
            </div>
            <div className="DebateDetails__description">
              {debateDetails.data.debate.description}
            </div>
            <div className="DebateDetails__opinions-container">
              <div className="DebateDetails__opinions-container__controls">
                <div className="DebateDetails__opinions-container__controls__column">
                  {!debateDetails.data.debate.finished ? (
                    <Toggle
                      left={showSection === 0}
                      leftText="Pro"
                      leftIcon={<i className="fa fa-arrow-circle-up" />}
                      onChange={(toggle) =>
                        this.setState({ showSection: toggle ? 0 : null })
                      }
                    />
                  ) : (
                    <WinnerBadge
                      heading="Pro"
                      winner={
                        debateDetails.data.debate.totalPro >
                        debateDetails.data.debate.totalCon
                      }
                      amount={debateDetails.data.debate.totalPro}
                    />
                  )}
                </div>
                <div className="DebateDetails__opinions-container__controls__spacer" />
                <div className="DebateDetails__opinions-container__controls__column">
                  {!debateDetails.data.debate.finished ? (
                    <Toggle
                      left={showSection === 1}
                      leftText="Con"
                      leftIcon={<i className="fa fa-arrow-circle-down" />}
                      onChange={(toggle) =>
                        this.setState({ showSection: toggle ? 1 : null })
                      }
                    />
                  ) : (
                    <WinnerBadge
                      heading="Con"
                      winner={
                        debateDetails.data.debate.totalPro <
                        debateDetails.data.debate.totalCon
                      }
                      amount={debateDetails.data.debate.totalCon}
                    />
                  )}
                </div>
              </div>
              <div className="DebateDetails__opinions-container__new-opinion-container">
                <div className="DebateDetails__opinions-container__new-opinion-container__card-wrapper">
                  {showSection === 0 && (
                    <CreateOpinionCard
                      debateId={debateId}
                      pro
                      minOpinionStake={
                        debateDetails.data.rules.minOpinionCreationStake
                      }
                      minVoteStake={
                        debateDetails.data.rules.minVoteCreationStake
                      }
                    />
                  )}
                </div>
                <div className="DebateDetails__opinions-container__new-opinion-container__card-wrapper DebateDetails__opinions-container__new-opinion-container__card-wrapper--right">
                  {showSection === 1 && (
                    <CreateOpinionCard
                      debateId={debateId}
                      pro={false}
                      minOpinionStake={
                        debateDetails.data.rules.minOpinionCreationStake
                      }
                      minVoteStake={
                        debateDetails.data.rules.minVoteCreationStake
                      }
                    />
                  )}
                </div>
              </div>
              <OpinionList debateId={debateId} />
            </div>
          </div>
        ) : (
          "loading"
        )}
      </div>
    );
  }
}
DebateDetails.propTypes = {
  debateDetails: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchDebateDetails: (debateId) => dispatch(fetchDebateDetails(debateId)),
  fetchCreateOpinion: (debateId, content, contentType, stake, pro) =>
    dispatch(fetchCreateOpinion(debateId, content, contentType, stake, pro)),
});
const mapStateToProps = (state) => ({
  debateDetails: state.debates.debateDetails,
  ui: state.ui,
});
export default connect(mapStateToProps, mapDispatchToProps)(DebateDetails);
