import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import { fetchDebateDetails } from "../actions/debates";
import { fetchCreateOpinion } from "../actions/opinions";
import "./DebateDetails.scss";
import DebateChart from "../components/DebateChart";
import VerticalDebateProgress from "../components/VerticalDebateProgress";
import OpinionList from "../components/OpinionList";
import Toggle from "../components/Toggle";
import CreateOpinionCard from "../components/CreateOpinionCard";
import CountdownCounter from "../components/CountdownCounter";
import Formatter from "../utils/Formatter";

class DebateDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { showSection: false }; // 0 for pro, 1 for con
    const { match, fetchDebateDetails } = this.props;
    const debateId = match.params.slug;
    // todo validate debateId
    fetchDebateDetails(debateId);
  }

  createEmoji(winner, amount) {
    if (winner) {
      return (
        <span className="DebateDetails__opinions-container__controls__column__emoji DebateDetails__opinions-container__controls__column__emoji--winner">
          <i className="fa fa-trophy" />
          <div>
            <i className="fa fa-bolt" />
            {Formatter.kFormatter(amount)}
          </div>
        </span>
      );
    } else {
      return (
        <span className="DebateDetails__opinions-container__controls__column__emoji DebateDetails__opinions-container__controls__column__emoji--loser">
          <i className="fas fa-poo" />
          <div>
            <i className="fa fa-bolt" />
            {Formatter.kFormatter(amount)}
          </div>
        </span>
      );
    }
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
                <div className="DebateDetails__subtitle">
                  {!debateDetails.data.debate.finished ? (
                    <span>
                      Ongoing for{" "}
                      {moment(debateDetails.data.debate.updated).from(
                        debateDetails.data.debate.created,
                        true
                      )}
                    </span>
                  ) : (
                    <span>
                      Finished{" "}
                      <CountdownCounter
                        endTime={
                          moment(debateDetails.data.debate.updated).unix() +
                          debateDetails.data.debate.duration / 1000
                        }
                      />
                    </span>
                  )}
                </div>
              </div>
              <div className="DebateDetails__stake">
                <i className="fa fa-bolt" />
                {debateDetails.data.debate.stake}
              </div>
            </div>
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
                    this.createEmoji(
                      debateDetails.data.debate.totalPro >
                        debateDetails.data.debate.totalCon,
                      debateDetails.data.debate.totalPro
                    )
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
                    this.createEmoji(
                      debateDetails.data.debate.totalPro <
                        debateDetails.data.debate.totalCon,
                      debateDetails.data.debate.totalCon
                    )
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
DebateDetail.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(DebateDetail);
