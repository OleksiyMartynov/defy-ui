import React from "react";
import "./CreateDebate.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "../components/Button";
import { fetchCreateDebate } from "../actions/debates";
import { closeCreateDebateDialog } from "../actions/ui";

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
        this.props.closeCreateDebateDialog();
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
    } = this.state;
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

          <div className="CreateDebate__label">Title:</div>
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

          <div className="CreateDebate__label">Stake:</div>
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
            Tags:
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
                {loading ? (
                  <i className="fa fa-spinner" aria-hidden="true"></i>
                ) : (
                  <i className="fa fa-plus" aria-hidden="true"></i>
                )}
              </Button>
            </div>
          </form>
          {tagError && (
            <div className="CreateDebate__content__error">{tagError}</div>
          )}

          <div className="CreateDebate__label">Description:</div>
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
          <Button accent onClick={this.onCreateClicked}>
            <i className="fa fa-paper-plane" />
            <span>&nbsp;Create</span>
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
  createDebate: PropTypes.object.isRequired,
  closeCreateDebateDialog: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCreateDebate: (title, description, stake) =>
    dispatch(fetchCreateDebate(title, description, stake)),
  closeCreateDebateDialog: () => dispatch(closeCreateDebateDialog()),
});

const mapStateToProps = (state) => ({
  account: state.account,
  createDebate: state.debates.createDebate,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateDebate);
