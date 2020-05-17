import React from "react";
import "./CreateDebate.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "../components/Button";
import { fetchCreateDebate } from "../actions/debates";

class CreateDebate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { title: "", description: "" };
    console.log(props);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onCreateClicked = () => {
    this.props.fetchCreateDebate("Test Title", "Test description", 100);
  };

  render() {
    const { title, description, stake } = this.state;
    return (
      <div className="CreateDebate">
        <div className="CreateDebate__content">
          <div className="CreateDebate__heading">Create Debate</div>
          <div className="CreateDebate__banner">
            <div className="CreateDebate__banner__inner">
              <p>
                Create debate topic by locking up stake then providing a
                detailed description and title.
              </p>
              <ul>
                <li>
                  Debate results are concluded after 24hrs of inactivity (no new
                  opinions)
                </li>
                <li>
                  Stake amount will be returned to you after debate conclusion
                </li>
                <li>
                  Debates are sorted by stake, hence higher stake signals topic
                  importance
                </li>
              </ul>
            </div>
          </div>
          <br />
          <div className="CreateDebate__input-wrapper">
            <div className="CreateDebate__input-wrapper__label">Title:</div>
            <input
              name="title"
              id="title"
              type="text"
              value={title}
              onChange={this.handleChange}
            />
          </div>
          <div className="CreateDebate__input-wrapper">
            <div className="CreateDebate__input-wrapper__label">Stake:</div>
            <input
              name="stake"
              id="stake"
              type="number"
              value={stake}
              onChange={this.handleChange}
            />
          </div>
          <div className="CreateDebate__input-wrapper">
            <div className="CreateDebate__input-wrapper__label">
              Description:
            </div>
            <textarea
              rows="5"
              id="description"
              name="description"
              value={description}
              onChange={this.handleChange}
            />
          </div>
          <div className="CreateDebate__input-wrapper">
            <Button accent onClick={this.onCreateClicked}>
              <i className="fa fa-paper-plane" />
              <span>&nbsp;Create</span>
            </Button>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}
CreateDebate.propTypes = {
  fetchCreateDebate: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
  createDebate: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCreateDebate: (title, description, stake) =>
    dispatch(fetchCreateDebate(title, description, stake)),
});

const mapStateToProps = (state) => ({
  account: state.account,
  createDebate: state.debates.createDebate,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateDebate);
