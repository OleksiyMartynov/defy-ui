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
import Button from "../components/Button";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showActive: true, value: "", selectedIndex: 0 };
    this.doSearch(true, true, false, false);
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  onCreateDebate = () => {
    this.props.openCreateDebateDialog();
  };

  onActiveToggled = (finished) => {
    this.setState({ showActive: finished });
    const { value, selectedIndex } = this.state;
    this.doSearch(finished, selectedIndex === 0, false, value);
  };

  itemSelectedListener = (index) => {
    const { showActive, value } = this.state;
    this.doSearch(showActive, index === 0, false, value);
    this.setState({ selectedIndex: index });
  };

  doSearch(showActive, byStake, address, searchText) {
    const { fetchDebatesWithFilter, account } = this.props;
    // const accountObject = new AccountModel(account.mnemonic);
    fetchDebatesWithFilter(
      new DebateFilter(showActive, byStake, address, searchText)
    );
  }

  render() {
    const { showActive, value, selectedIndex } = this.state;
    return (
      <div className="Home">
        <br />
        todo: user history
        <br />
        todo: deposits page
        <br />
        todo: withdrawals page
        <div className="Home__content">
          <span className="Home__content__heading">Debates</span>
          <div className="Home__content__controls">
            <div className="Home__content__controls__search-wrapper">
              <input
                type="text"
                value={value}
                onChange={this.handleChange}
                placeholder="Search"
              />
              <Button
                secondary
                onClick={() =>
                  this.doSearch(showActive, selectedIndex === 0, false, value)
                }
              >
                <i className="fa fa-search" aria-hidden="true"></i>
              </Button>
            </div>
            &nbsp;&nbsp;&nbsp;
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
          <br />
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
