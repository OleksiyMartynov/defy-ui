/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";

import CodeBlock from "../components/CodeBlock";
import { fetchDebateDetails } from "../actions/debates";
import { fetchCreateOpinion } from "../actions/opinions";
import { toggleToast } from "../actions/ui";
import { fetchAccountInfo } from "../actions/account";
import "./DebateDetails.scss";
import DebateChart from "../components/DebateChart";
import VerticalDebateProgress from "../components/VerticalDebateProgress";
import OpinionList from "../components/OpinionList";
import Toggle from "../components/Toggle";
import CreateOpinionCard from "../components/CreateOpinionCard";
import Formatter from "../utils/Formatter";
import DebateTime from "../components/DebateTime";
import WinnerBadge from "../components/WinnerBadge";
import OpinionCard from "../components/OpinionCard";
import CountdownCounter from "../components/CountdownCounter";
import FloatingButton from "../components/FloatingButton";
import TitleBar from "../components/TitleBar";
import DropdownShare from "../components/DropdownShare";
import { Loader } from "../components/Loader";

class DebateDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSection: false, // 0 for pro, 1 for con
      showChart: false,
      showTitleBar: false,
    };
    const { match, fetchDebateDetails } = this.props;
    const debateId = match.params.slug;
    // todo validate debateId
    fetchDebateDetails(debateId);
  }

  paneDidMount = (node) => {
    if (node) {
      node.addEventListener("scroll", (e) => {
        const { showTitleBar } = this.setState;
        if (!showTitleBar && e.target.scrollTop > 100) {
          this.setState({ showTitleBar: true });
        } else if (e.target.scrollTop <= 100) {
          this.setState({ showTitleBar: false });
        }
      });
    }
  };

  closeSections = () => {
    this.setState({ showSection: false });
    const {
      match,
      fetchDebateDetails,
      fetchAccountInfo,
      toggleToast,
    } = this.props;
    const debateId = match.params.slug;
    fetchDebateDetails(debateId);
    fetchAccountInfo();
    toggleToast("Stake locked");
  };

  createWinningsSection = (totalPro, totalCon, userPro, userCon, finished) => {
    let winnings = 0;
    let losses = 0;
    let stakeBack = 0;
    const proPercent = userPro / totalPro;
    const conPercent = userCon / totalCon;
    let winningSide = "";
    if (totalPro > totalCon) {
      winningSide = "PRO";
      stakeBack = totalPro;
      winnings = totalCon * proPercent;
      losses = userCon;
    } else if (totalPro < totalCon) {
      winningSide = "CON";
      stakeBack = totalCon;
      winnings = totalPro * conPercent;
      losses = userPro;
    } else {
      winningSide = "TIE";
      stakeBack = totalPro + totalCon;
      winnings = 0;
      losses = 0;
    }
    return (
      <div className="DebateDetails__opinions-container__controls__spacer__results">
        <div className="DebateDetails__opinions-container__controls__spacer__results__result-heading">
          Your Activity
        </div>
        <div className="DebateDetails__opinions-container__controls__spacer__results__result-title">
          Stake Pro / Stake Con
        </div>
        <div>
          <i className="fa fa-bolt" />
          {userPro}
          {" / "}
          <i className="fa fa-bolt" />
          {userCon}
        </div>
        <div className="DebateDetails__opinions-container__controls__spacer__results__result-title">
          {finished ? "" : "Potential "}Winnigs / Losses
        </div>
        <div>
          <span className="DebateDetails__opinions-container__controls__spacer DebateDetails__opinions-container__controls__spacer--winnings">
            <i className="fa fa-bolt" />
            {winnings}
          </span>
          {" / "}
          <span className="DebateDetails__opinions-container__controls__spacer DebateDetails__opinions-container__controls__spacer--losses">
            <i className="fa fa-bolt" />
            {losses}
          </span>
        </div>
      </div>
    );
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { match, debateDetails } = this.props;
    const { showSection, showChart, showTitleBar } = this.state;
    const debateId = match.params.slug;
    let winningText = null;
    let winningPercent = 0.0;
    if (debateDetails.data) {
      const total =
        debateDetails.data.debate.totalPro + debateDetails.data.debate.totalCon;
      const percentPro = debateDetails.data.debate.totalPro / total;
      const percentCon = debateDetails.data.debate.totalCon / total;
      if (percentPro > percentCon) {
        winningText = "PRO";
        winningPercent = percentPro - percentCon;
      } else if (percentPro < percentCon) {
        winningText = "CON";
        winningPercent = percentCon - percentPro;
      } else {
        winningText = "TIE";
      }
    }
    return (
      <div className="DebateDetails" ref={this.paneDidMount}>
        {debateDetails.data ? (
          <>
            <Helmet>
              <title>Defy.fyi : {debateDetails.data.debate.title}</title>
              <meta
                name="description"
                content="Debate hot topics and win sats"
              />
              <meta
                name="keywords"
                content={debateDetails.data.debate.tags
                  .map((tag) => tag.name)
                  .join(", ")}
              />
            </Helmet>
            <TitleBar
              title={debateDetails.data.debate.title}
              show={showTitleBar}
              extra={
                <DropdownShare
                  mobileTitle={debateDetails.data.debate.title}
                  mobileDescription="Put your ₿ where your mouth is."
                />
              }
            />
            <div className="DebateDetails__content">
              <div className="DebateDetails__head-content">
                <button
                  className="DebateDetails__head-content__back"
                  onClick={this.goBack}
                >
                  <i
                    style={{ fontSize: "25px" }}
                    className="fas fa-chevron-left fa-2x"
                  />
                </button>
                <div className="DebateDetails__head-content__title">
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
              <div className="DebateDetails__tags">
                {debateDetails.data.debate.tags.map((tag) => (
                  <div className="DebateDetails__tags__tag">
                    <Link to={`/debates/${tag.name}`}>
                      <FloatingButton onClick={this.onCreateDebate}>
                        <i className="fas fa-hashtag" />
                        <span>&nbsp;{tag.name}</span>
                      </FloatingButton>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="DebateDetails__description">
                <ReactMarkdown
                  source={debateDetails.data.debate.description}
                  renderers={{ code: CodeBlock }}
                  plugins={[require("remark-toc")]}
                />

                <div className="DebateDetails__divider" />
                <span className="DebateDetails__description__created">
                  Created&nbsp;
                  {moment(debateDetails.data.debate.created).format(
                    "MMMM Do YYYY, h:mm a"
                  )}
                  &nbsp;with&nbsp;
                  <span className="DebateDetails__description__created__stake">
                    <i className="fa fa-bolt" />
                    {Formatter.kFormatter(debateDetails.data.debate.stake)}
                  </span>
                </span>
                {debateDetails.data.debate.createdByYou && (
                  <div className="DebateDetails__description__created__creator-banner">
                    Created by you
                  </div>
                )}
              </div>
              <br />
              <div className="DebateDetails__controls">
                {!debateDetails.data.debate.finished ? (
                  <div className="DebateDetails__controls__count-down">
                    Ends in{" "}
                    <CountdownCounter
                      format
                      interval={1000}
                      endTime={
                        moment(debateDetails.data.debate.updated).unix() +
                        debateDetails.data.debate.duration / 1000
                      }
                    />
                  </div>
                ) : (
                  <div className="DebateDetails__controls__count-down DebateDetails__controls__count-down--winning">
                    {winningText === "TIE" ? (
                      <span>Result: TIE</span>
                    ) : (
                      <span>
                        {winningText} wins by{" "}
                        {(winningPercent * 100).toFixed(2)}%
                      </span>
                    )}
                  </div>
                )}
                <div>
                  <Toggle
                    left={showChart}
                    leftText="Debate History"
                    leftIcon={<i className="fas fa-chart-area" />}
                    onChange={(toggle) => this.setState({ showChart: toggle })}
                  />
                </div>
              </div>
              {debateDetails.data.history.length > 0 ? (
                <>
                  <div
                    className="DebateDetails__chart"
                    style={{ minHeight: showChart ? "250px" : "0px" }}
                  >
                    <DebateChart
                      data={debateDetails.data.history.map((item) => ({
                        Pro: item.totalPro,
                        Con: item.totalCon,
                      }))}
                    />
                    <div className="DebateDetails__chart__progress">
                      {debateDetails.data.debate.totalPro +
                        debateDetails.data.debate.totalCon >
                        0 &&
                        showChart && (
                          <VerticalDebateProgress
                            pro={debateDetails.data.debate.totalPro}
                            total={
                              debateDetails.data.debate.totalPro +
                              debateDetails.data.debate.totalCon
                            }
                          />
                        )}
                    </div>
                  </div>
                </>
              ) : null}
              <div className="DebateDetails__opinions-container">
                <div className="DebateDetails__opinions-container__controls">
                  <div className="DebateDetails__opinions-container__controls__column DebateDetails__opinions-container__controls__column--left">
                    <WinnerBadge
                      heading="Pro"
                      ongoing={!debateDetails.data.debate.finished}
                      winner={
                        debateDetails.data.debate.totalPro >
                        debateDetails.data.debate.totalCon
                      }
                      amount={debateDetails.data.debate.totalPro}
                    >
                      {!debateDetails.data.debate.finished ? (
                        <Toggle
                          left={showSection === 0}
                          leftText=" Add"
                          leftIcon={<i className="fas fa-plus" />}
                          onChange={(toggle) =>
                            this.setState({ showSection: toggle ? 0 : null })
                          }
                        />
                      ) : null}
                    </WinnerBadge>
                  </div>
                  <div className="DebateDetails__opinions-container__controls__spacer">
                    {this.createWinningsSection(
                      debateDetails.data.debate.totalPro,
                      debateDetails.data.debate.totalCon,
                      debateDetails.data.callerTotals.totalPro,
                      debateDetails.data.callerTotals.totalCon,
                      debateDetails.data.debate.finished
                    )}
                  </div>
                  <div className="DebateDetails__opinions-container__controls__column DebateDetails__opinions-container__controls__column--right">
                    <WinnerBadge
                      heading="Con"
                      ongoing={!debateDetails.data.debate.finished}
                      winner={
                        debateDetails.data.debate.totalPro <
                        debateDetails.data.debate.totalCon
                      }
                      amount={debateDetails.data.debate.totalCon}
                    >
                      {!debateDetails.data.debate.finished ? (
                        <Toggle
                          left={showSection === 1}
                          leftText=" Add"
                          leftIcon={<i className="fas fa-plus" />}
                          onChange={(toggle) =>
                            this.setState({ showSection: toggle ? 1 : null })
                          }
                        />
                      ) : null}
                    </WinnerBadge>
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
                        onNewOpinionCreated={this.closeSections}
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
                        onNewOpinionCreated={this.closeSections}
                      />
                    )}
                  </div>
                </div>
                <OpinionList
                  debateId={debateId}
                  lastItem={
                    <OpinionCard
                      content={null}
                      contentType={"created"}
                      created={debateDetails.data.debate.created}
                      stake={debateDetails.data.debate.stake}
                    />
                  }
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <br />
            <br />
            <Loader />
          </>
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
  fetchAccountInfo: () => dispatch(fetchAccountInfo()),
  toggleToast: (text) => dispatch(toggleToast(text)),
});
const mapStateToProps = (state) => ({
  debateDetails: state.debates.debateDetails,
  ui: state.ui,
});
export default connect(mapStateToProps, mapDispatchToProps)(DebateDetails);
