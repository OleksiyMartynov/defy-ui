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

class DebateDetail extends PureComponent {
  constructor(props) {
    super(props);
    const { match, fetchDebateDetails, fetchOpinions } = this.props;
    const debateId = match.params.slug;
    // todo validate debateId
    fetchDebateDetails(debateId);
  }

  onStake = (pro) => {
    const { match, fetchCreateOpinion } = this.props;
    const debateId = match.params.slug;
    // fetchCreateOpinion(drawId, "http://www.example.com", "link", 550, pro);
    fetchCreateOpinion(debateId, null, "vote", 500, pro);
  };

  render() {
    const { match, debateDetails } = this.props;
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
                  <Button onClick={() => this.onStake(true)}>
                    <i className="fa fa-arrow-circle-up" />
                    <span>&nbsp;Pro</span>
                  </Button>
                </div>
                <div className="DebateDetails__opinions-container__controls__spacer" />
                <div className="DebateDetails__opinions-container__controls__column">
                  <Button onClick={() => this.onStake(false)}>
                    <i className="fa fa-arrow-circle-down" />
                    <span>&nbsp;Con</span>
                  </Button>
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
