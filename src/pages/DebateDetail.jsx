import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import { fetchDebateDetails } from "../actions/debates";
import { fetchOpinions, fetchCreateOpinion } from "../actions/opinions";
import "./DebateDetails.scss";
import DebateProgress from "../components/DebateProgress";
import DebateChart from "../components/DebateChart";
import Button from "../components/Button";
const CHART_TEST_DATA = [
  {
    Pro: 0,
    Con: 0,
  },
  {
    Pro: 500,
    Con: 500,
  },
  {
    Pro: 1000,
    Con: 700,
  },
  {
    Pro: 1300,
    Con: 1600,
  },
  {
    Pro: 5000,
    Con: 3500,
  },
  {
    Pro: 15500,
    Con: 4500,
  },
  {
    Pro: 15500,
    Con: 5900,
  },
];
class DebateDetail extends PureComponent {
  constructor(props) {
    super(props);
    const { match, fetchDebateDetails, fetchOpinions } = this.props;
    const drawId = match.params.slug;
    // todo validate drawId
    fetchDebateDetails(drawId);
    fetchOpinions(drawId, false);
  }

  onStake = (pro) => {
    const { match, fetchCreateOpinion } = this.props;
    const drawId = match.params.slug;
    fetchCreateOpinion(drawId, "http://www.example.com", "link", 100, pro);
  };

  render() {
    const { debateDetails, opinions, blah } = this.props;
    console.log(blah);
    return (
      <div>
        {debateDetails.data ? (
          <div className="DebateDetails">
            <div className="DebateDetails__title">
              {debateDetails.data.debate.title}
            </div>
            <DebateProgress />
            <div className="DebateDetails__chart">
              <DebateChart data={CHART_TEST_DATA} />
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
                <div className="DebateDetails__opinions-container__controls__column">
                  <Button onClick={() => this.onStake(false)}>
                    <i className="fa fa-arrow-circle-down" />
                    <span>&nbsp;Con</span>
                  </Button>
                </div>
              </div>
              <div className="DebateDetails__opinions-container__list">
                {opinions.data &&
                  opinions.data.opinions.map((opinion) => (
                    <div className="DebateDetails__opinions-container__list__item">
                      Stake Vote:{opinion.stake}
                    </div>
                  ))}
              </div>
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
  fetchOpinions: (debateId, loadNextPage) =>
    dispatch(fetchOpinions(debateId, loadNextPage)),
  fetchCreateOpinion: (debateId, content, contentType, stake, pro) =>
    dispatch(fetchCreateOpinion(debateId, content, contentType, stake, pro)),
});
const mapStateToProps = (state) => ({
  debateDetails: state.debates.debateDetails,
  opinions: state.opinionList,
  ui: state.ui,
  blah: state,
});
export default connect(mapStateToProps, mapDispatchToProps)(DebateDetail);
