import React from "react";
import "./History.scss";
import { connect } from "react-redux";
import { fetchHistory } from "../actions/history";
import Button from "../components/Button";
import Formatter from "../utils/Formatter";
import moment from "moment";
import { Link } from "react-router-dom";

class History extends React.Component {
  constructor(props) {
    super(props);
    const { fetchHistory } = this.props;
    fetchHistory(false);
  }

  render() {
    const { history, fetchHistory } = this.props;
    return (
      <div className="History">
        <span className="History__heading">History</span>
        {history.loading && <div>loading</div>}
        {history.error && <div>error</div>}
        {history.data && (
          <>
            <div className="History__list">
              {history.data.history.map((item, i) => {
                let text = "";
                let link = false;
                let iconClass = false;
                switch (item.action) {
                  case "deposit":
                    text = "Funds deposited";
                    iconClass = "fas fa-piggy-bank";
                    break;
                  case "withdrawal":
                    text = "Funds withdrawn";
                    iconClass = "fas fa-wallet";
                    break;
                  case "debate_created":
                    text = "Created debate";
                    link = `/debate/${item?.schemaId?._id}`;
                    iconClass = "fas fa-lock";
                    break;
                  case "debate_finished":
                    text = "Debate finished";
                    link = `/debate/${item?.schemaId?._id}`;
                    iconClass = "fas fa-lock-open";
                    break;
                  case "opinion_created":
                    text = "Created opinion";
                    link = `/debate/${item?.schemaId?.debate}`;
                    iconClass = "fas fa-lock";
                    break;
                  case "opinion_finished":
                    text = "Opinion result";
                    link = `/debate/${item?.schemaId?.debate}`;
                    iconClass = "fas fa-lock-open";
                    break;
                  case "vote_created":
                    text = "Created opinion";
                    link = `/debate/${item?.schemaId?.debate}`;
                    iconClass = "fas fa-lock";
                    break;
                  case "vote_finished":
                    text = "Vote result";
                    link = `/debate/${item?.schemaId?.debate}`;
                    iconClass = "fas fa-lock-open";
                    break;

                  default:
                    text = "Unknown history item";
                    break;
                }
                return (
                  <Link
                    to={link}
                    style={{ pointerEvents: link ? "auto" : "none" }}
                  >
                    <div className="History__item" key={i}>
                      <div className="History__item__info">
                        <div>
                          {iconClass && (
                            <>
                              <i className={iconClass} />{" "}
                            </>
                          )}
                        </div>
                        <div className="History__item__amount">
                          <div>
                            <i className="fa fa-bolt" />
                            {Formatter.kFormatter(item.amount)}
                          </div>
                        </div>
                        <div className="History__item__text">{text}</div>

                        <i
                          style={{ fontSize: "25px" }}
                          className="fas fa-chevron-right fa-2x"
                        />
                      </div>
                      <div className="History__item__date">
                        {moment(item.timestamp).format("MMMM Do YYYY, h:mm a")}
                      </div>
                    </div>
                  </Link>
                );
              })}
              <div>
                <br />
                <br />
                {history.data.page + 1 < history.data.pages ? (
                  <Button onClick={() => fetchHistory(true)}> Load more</Button>
                ) : (
                  <div>
                    <i className="fas fa-seedling" /> No history
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchHistory: (loadNextPage) => dispatch(fetchHistory(loadNextPage)),
});
const mapStateToProps = (state) => ({
  history: state.history,
});
export default connect(mapStateToProps, mapDispatchToProps)(History);
