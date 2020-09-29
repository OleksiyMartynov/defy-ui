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
// import AccountModel from "../models/Account";
import Button from "../components/Button";
import LoginTest from '../components/LoginTest';

class Debates extends React.Component {
  constructor(props) {
    super(props);
    const { match } = props;
    const tag = match.params.tag;
    this.state = { showActive: true, value: "", selectedIndex: 0, tag };
    this.doSearch(true, true, false, false, tag);
  }

  componentDidUpdate() {
    if (this.state.tag !== this.props.match.params.tag) {
      const { showActive, value, selectedIndex } = this.state;
      const { match } = this.props;
      const tag = match.params.tag;
      this.doSearch(showActive, selectedIndex === 0, false, value, tag);
    }
  }

  onActiveToggled = (finished) => {
    this.setState({ showActive: finished });
    const { value, selectedIndex } = this.state;
    const { match } = this.props;
    const tag = match.params.tag;
    this.doSearch(finished, selectedIndex === 0, false, value, tag);
  };

  itemSelectedListener = (index) => {
    const { showActive, value } = this.state;
    const { match } = this.props;
    const tag = match.params.tag;
    this.doSearch(showActive, index === 0, false, value, tag);
    this.setState({ selectedIndex: index });
  };

  onCreateDebate = () => {
    this.props.openCreateDebateDialog();
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    if (event.target.value === "") {
      const { showActive, selectedIndex } = this.state;
      const { match } = this.props;
      const tag = match.params.tag;
      this.doSearch(showActive, selectedIndex === 0, false, "", tag);
    }
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const { showActive, value, selectedIndex } = this.state;
      const { match } = this.props;
      const tag = match.params.tag;
      this.doSearch(showActive, selectedIndex === 0, false, value, tag);
    }
  };

  removeTag = () => {
    this.props.history.push("/debates");
  };

  doSearch(showActive, byStake, address, searchText, tag) {
    const { fetchDebatesWithFilter } = this.props; //account object is also in props
    // const accountObject = new AccountModel(account.mnemonic);
    this.setState({ tag });
    fetchDebatesWithFilter(
      new DebateFilter(showActive, byStake, address, searchText, tag)
    );
  }

  render() {
    const { showActive, value, selectedIndex, tag } = this.state;

    return (
      <div className="Debates">
        <div>
          Testing login
          <LoginTest />
        </div>
        <div className="Debates__content">
          <div className="Debates__content__heading">
            <div className="Debates__content__heading__text">Debates</div>
            {tag && (
              <div className="Debates__content__heading__tag">
                #{tag}
                <i className="fa fa-times" onClick={this.removeTag} />
              </div>
            )}
          </div>
          <div className="Debates__content__controls">
            <div className="Debates__content__controls__search-wrapper">
              <input
                type="text"
                value={value}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyDown}
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
Debates.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Debates);
