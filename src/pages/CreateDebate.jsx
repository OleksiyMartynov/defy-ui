import React from "react";
import "./CreateDebate.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import Button from "../components/Button";
import { fetchCreateDebate } from "../actions/debates";
import { closeCreateDebateDialog, toggleToast } from "../actions/ui";
import { fetchAccountInfo } from "../actions/account";
import Tooltip from "../components/Tooltip";

class CreateDebate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      tag: "",
      tags: [],
      tagError: false,
      error: false,
      loading: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onCreateClicked = async () => {
    const { title, description, stake, tags } = this.state;
    const {
      closeCreateDebateDialog,
      toggleToast,
      fetchAccountInfo,
    } = this.props;
    if (this.isFormValid()) {
      this.setState({
        loading: true,
      });
      const resp = await this.props.fetchCreateDebate(
        title,
        description,
        stake,
        tags
      );
      if (resp.error) {
        this.setState({
          error: resp.error.message
            ? resp.error.message
            : "Failed creating debate. Check the form and try again.",
          loading: false,
        });
      } else {
        this.setState({ redirect: `/debate/${resp.data.debate._id}` });
        closeCreateDebateDialog();
        fetchAccountInfo();
        toggleToast("Debate created");
      }
    }
  };

  onTagSubmit = (event) => {
    event.preventDefault();
    const { tag, tags } = this.state;
    if (this.isTagValid(tag, tags)) {
      tags.push(tag);
      this.setState({ tag: "", tags, tagError: false });
    } else {
      this.setState({
        tagError: "Tags can only contain alphanumeric characters (a-z and 0-9)",
      });
    }
  };

  isFormValid = () => {
    const { title, description, stake } = this.state;
    if (!title || title.length < 3) {
      this.setState({ error: "Title too short or missing" });
      return false;
    }
    if (!description || description.length < 3) {
      this.setState({ error: "Description too short or missing" });
      return false;
    }
    if (isNaN(stake) || stake < 100) {
      this.setState({ error: "Stake amount must be greater than 100" });
      return false;
    }
    this.setState({ error: false });
    return true;
  };

  isTagValid(tag, tags) {
    return /^[a-zA-Z0-9_]{2,40}$/.test(tag) && tags.indexOf(tag) === -1;
  }

  removeTag = (tag) => {
    const { tags } = this.state;
    this.setState({ tags: tags.filter((t) => t !== tag) });
  };

  render() {
    const {
      title,
      description,
      stake,
      tag,
      tags,
      tagError,
      error,
      loading,
      redirect,
    } = this.state;
    if (redirect) {
      return <Redirect to={redirect} />;
    }
    return (
      <div className="CreateDebate">
        <div className="CreateDebate__content">
          <div className="CreateDebate__heading">Create Debate</div>
          <div className="CreateDebate__banner">
            <div className="CreateDebate__banner__inner">
              <p>
                Create debate topic by locking up stake then providing a title
                and description of the debate. Description text supports&nbsp;
                <a
                  href="https://guides.github.com/features/mastering-markdown/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  &nbsp;markdown
                </a>
                .
              </p>
              <ul>
                <li>
                  Debate results are concluded after 24hrs of inactivity (no new
                  evidence)
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

          <div className="CreateDebate__label">
            <Tooltip text="Title should capture users's attention">
              Title:
            </Tooltip>
          </div>
          <div className="CreateDebate__input-wrapper">
            <input
              autoComplete="off"
              name="title"
              id="title"
              type="text"
              value={title}
              onChange={this.handleChange}
            />
          </div>

          <div className="CreateDebate__label">
            <Tooltip text="High starting stake signals importance and increases visibility">
              Stake (100 min):
            </Tooltip>
          </div>
          <div className="CreateDebate__input-wrapper">
            <input
              autoComplete="off"
              name="stake"
              id="stake"
              type="number"
              value={stake}
              onChange={this.handleChange}
            />
          </div>
          <div className="CreateDebate__label">
            <Tooltip text="Help users find your debate">Tags:</Tooltip>
            {tags.map((t) => (
              <span key={t} className="CreateDebate__label__tag">
                {t}
                <i className="fa fa-times" onClick={() => this.removeTag(t)} />
              </span>
            ))}
          </div>
          <form onSubmit={this.onTagSubmit}>
            <div className="CreateDebate__input-wrapper">
              <input
                autoComplete="off"
                id="tag"
                name="tag"
                type="text"
                value={tag}
                onChange={this.handleChange}
              />
              <Button secondary disabled={loading}>
                <i className="fa fa-plus" aria-hidden="true" />
              </Button>
            </div>
          </form>
          {tagError && (
            <div className="CreateDebate__content__error">{tagError}</div>
          )}

          <div className="CreateDebate__label">
            <Tooltip text="Helps users understand the debate topic">
              Description:
            </Tooltip>
          </div>
          <div className="CreateDebate__input-wrapper">
            <textarea
              autoComplete="off"
              rows="5"
              id="description"
              name="description"
              value={description}
              onChange={this.handleChange}
            />
          </div>
          <br />
          {error && (
            <>
              <div className="CreateDebate__content__error">{error}</div>
              <br />
            </>
          )}
          <Button disabled={loading} accent onClick={this.onCreateClicked}>
            {loading ? (
              <>
                <i className="fas fa-spinner" aria-hidden="true" />
                <span>&nbsp;Creating</span>
              </>
            ) : (
              <>
                <i className="fa fa-paper-plane" />
                <span>&nbsp;Create</span>
              </>
            )}
          </Button>
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
  closeCreateDebateDialog: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCreateDebate: (title, description, stake, tags) =>
    dispatch(fetchCreateDebate(title, description, stake, tags)),
  fetchAccountInfo: () => dispatch(fetchAccountInfo()),
  closeCreateDebateDialog: () => dispatch(closeCreateDebateDialog()),
  toggleToast: (text) => dispatch(toggleToast(text)),
});

const mapStateToProps = (state) => ({
  account: state.account,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateDebate);
