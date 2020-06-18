import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import { fetchDebateDetails } from "../actions/debates";
import "./DebateDetails.scss";
import DebateProgress from "../components/DebateProgress";
import DebateChart from "../components/DebateChart";
const CHART_TEST_DATA = [
  {
    "Pro": 0,
    "Con": 0,
  },
  {
    "Pro": 500,
    "Con": 500,
  },
  {
    "Pro": 1000,
    "Con": 700,
  },
  {
    "Pro": 1300,
    "Con": 1600,
  },
  {
    "Pro": 5000,
    "Con": 3500,
  },
  {
    "Pro": 15500,
    "Con": 4500,
  },
  {
    "Pro": 15500,
    "Con": 5900,
  }
]
class DebateDetail extends PureComponent {
  constructor(props) {
    super(props);
    const { match, fetchDebateDetails } = this.props;
    fetchDebateDetails(match.params.slug);
  }

  render() {
    const { debateDetails } = this.props;
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
});
const mapStateToProps = (state) => ({
  debateDetails: state.debates.debateDetails,
  ui: state.ui,
});
export default connect(mapStateToProps, mapDispatchToProps)(DebateDetail);
