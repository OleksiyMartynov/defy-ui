import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import { fetchDebateDetails } from "../actions/debates";
import { fetchOpinions, fetchCreateOpinion } from "../actions/opinions";
import "./DebateDetails.scss";
import DebateChart from "../components/DebateChart";
import Button from "../components/Button";
import VerticalDebateProgress from "../components/VerticalDebateProgress";
import OpinionList from "../components/OpinionList";
import Toggle from "../components/Toggle";

class DebateDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { showSection: false }; // 0 for pro, 1 for con
    const { match, fetchDebateDetails, fetchOpinions } = this.props;
    const debateId = match.params.slug;
    // todo validate debateId
    fetchDebateDetails(debateId);
  }

  onStakeSelected = (pro) => {
    // const { match, fetchCreateOpinion } = this.props;
    // const debateId = match.params.slug;
    // fetchCreateOpinion(drawId, "http://www.example.com", "link", 550, pro);
    // fetchCreateOpinion(debateId, null, "vote", 500, pro);

    //this.setState({ showSection: pro ? 0 : 1 });
  };

  render() {
    const { match, debateDetails } = this.props;
    const { showSection } = this.state;
    const debateId = match.params.slug;
    console.log(debateDetails);
    return (
      <div>
        {debateDetails.data ? (
          <div className="DebateDetails">
            <div className="DebateDetails__title">
              {debateDetails.data.debate.title}
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
            <div>
              {moment(
                debateDetails.data.debate.duration +
                  moment(debateDetails.data.debate.created).unix() * 1000
              ).fromNow()}
            </div>
            <div>{debateDetails.data.debate.stake}</div>
            <div className="DebateDetails__opinions-container">
              <div className="DebateDetails__opinions-container__controls">
                <div className="DebateDetails__opinions-container__controls__column">
                  <div className="DebateDetails__opinions-container__controls__column__exanded">
                    <Toggle
                      left={showSection === 0}
                      leftText="Pro"
                      leftIcon={<i className="fa fa-arrow-circle-up" />}
                      onChange={(toggle) => this.setState({ showSection: toggle ? 0 : null })}
                    />
                    {showSection === 0 && (
                      <div className="todo">
                        <textarea value="sup" disabled />
                      </div>
                    )}
                  </div>
                </div>
                <div className="DebateDetails__opinions-container__controls__spacer" />
                <div className="DebateDetails__opinions-container__controls__column">
                  <div className="DebateDetails__opinions-container__controls__column__exanded">
                    <Toggle
                      left={showSection === 1}
                      leftText="Con"
                      leftIcon={<i className="fa fa-arrow-circle-down" />}
                      onChange={(toggle) => this.setState({ showSection: toggle ? 1 : null })}
                    />
                    {showSection === 1 && (
                      <div className="todo">
                        <textarea value="sup" disabled />
                      </div>
                    )}
                  </div>
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
