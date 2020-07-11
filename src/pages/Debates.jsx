import React from "react";
import "./Debates.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Toggle from "../components/Toggle";
import Dropdown from "../components/Dropdown";
import DebateList from "../components/DebateList";
import { openCreateDebateDialog } from "../actions/ui";
import { fetchDebatesWithFilter } from "../actions/debates";
import DebateFilter from "../models/DebateFilter";
import AccountModel from "../models/Account";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showActive: true };
    const accountObject = new AccountModel(props.account.mnemonic);
    props.fetchDebatesWithFilter(
      new DebateFilter(true, true, accountObject.getAddress())
    );
  }
  onCreateDebate = () => {
    this.props.openCreateDebateDialog();
  };

  onActiveToggled = (finished) => {
    this.setState({ showActive: finished });
    this.props.fetchDebatesWithFilter(new DebateFilter(finished));
  };

  itemSelectedListener = (index) => {
    const { showActive } = this.state;
    const { fetchDebatesWithFilter, account } = this.props;
    const accountObject = new AccountModel(account.mnemonic);
    fetchDebatesWithFilter(
      new DebateFilter(!showActive, index === 0, accountObject.getAddress())
    );
  };

  render() {
    const { showActive } = this.state;
    return (
      <div className="Home">
        <div className="Home__content">
          <span className="Home__content__heading">Debates</span>
          <div className="Home__content__controls">
            <Toggle
              left={showActive}
              leftText="Active"
              rightText="Closed"
              onChange={this.onActiveToggled}
            />
            &nbsp;&nbsp;&nbsp;
            <Dropdown
              items={["Stake", "Newest"]}
              itemSelectedListener={this.itemSelectedListener}
            />
          </div>
          todo: add filter option for user. "created by me", "participated by
          me"
          <br />
          todo: update nav
          <br />
          todo: add information tool tip
          <br />
          todo: add tag/title search
          <br />
          todo: add total opinions, con/pro ratio, time remaining to bottom of
          card
          <DebateList />
        </div>
      </div>
    );
  }
}
Home.propTypes = {
  openCreateDebateDialog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  account: state.account,
});

const mapDispatchToProps = (dispatch) => ({
  openCreateDebateDialog: () => dispatch(openCreateDebateDialog()),
  fetchDebatesWithFilter: (newFilter) =>
    dispatch(fetchDebatesWithFilter(newFilter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
