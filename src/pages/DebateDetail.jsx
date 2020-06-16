import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchDebateDetails } from "../actions/debates";

class DebateDetail extends PureComponent {
  constructor(props) {
    super(props);
    console.log(this.props);
    const { match, fetchDebateDetails } = this.props;
    fetchDebateDetails(match.params.slug);
  }

  render() {
    console.log(this.props);
  return <div>Detail:{this.props.debateDetails&&this.props.debateDetails.data  ?this.props.debateDetails.data.debate.title :null}</div>;
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
