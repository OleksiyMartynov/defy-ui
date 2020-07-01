import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchOpinions, fetchCreateOpinion } from "../actions/opinions";
import "./OpinionList.scss";
import Button from "../components/Button";
import OpinionCard from "../components/OpinionCard";

class OpinionList extends PureComponent {
  constructor(props) {
    super(props);
    const { debateId, fetchOpinions } = this.props;
    // todo validate debateId
    // todo add loading state
    fetchOpinions(debateId, false);
  }

  render() {
    const { debateId, opinions } = this.props;
    return (
      <div>
        {opinions.data ? (
          <div className="DebateDetails">
            <div className="OpinionList__opinions-container">
              {opinions.data && (
                <div className="OpinionList__opinions-container__list">
                  {opinions.data.opinions.map((opinion, i) => (
                    <div
                      key={i}
                      className="OpinionList__opinions-container__list__item"
                    >
                      <OpinionCard
                        content={opinion.content}
                        contentType={opinion.contentType}
                        created={opinion.created}
                        pro={opinion.pro}
                        stake={opinion.stake}
                      />
                    </div>
                  ))}
                  <div className="OpinionList__opinions-container__list__end">
                    {opinions.data.page + 1 < opinions.data.pages && (
                      <Button
                        onClick={() => this.props.fetchOpinions(debateId, true)}
                      >
                        {" "}
                        Load more
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          "loading"
        )}
      </div>
    );
  }
}
OpinionList.propTypes = {
  debateId: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchOpinions: (debateId, loadNextPage) =>
    dispatch(fetchOpinions(debateId, loadNextPage)),
  fetchCreateOpinion: (debateId, content, contentType, stake, pro) =>
    dispatch(fetchCreateOpinion(debateId, content, contentType, stake, pro)),
});
const mapStateToProps = (state) => ({
  opinions: state.opinionList,
});
export default connect(mapStateToProps, mapDispatchToProps)(OpinionList);
