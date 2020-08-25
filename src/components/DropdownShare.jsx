import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toggleToast } from "../actions/ui";
import "./DropdownShare.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class DropdownShare extends React.PureComponent {
  onCopy = (text) => {
    const { toggleToast } = this.props;
    toggleToast("Link coppied");
  };

  mobileShare = () => {
    const { mobileTitle, mobileDescription } = this.props;
    if (navigator.share) {
      navigator.share({
        text: mobileTitle,
        title: mobileDescription,
        url: window.location,
      });
    }
  };

  render() {
    return (
      <div className="DropdownShare">
        <i className="fas fa-share-alt" />
        <div className="DropdownShare__dropdown">
          <div className="DropdownShare__dropdown__content">
            <CopyToClipboard text={window.location} onCopy={this.onCopy}>
              <div
                className="DropdownShare__dropdown__content__item"
                onClick={this.mobileShare}
              >
                <i className="fas fa-link" /> Copy link to Debate
              </div>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    );
  }
}
DropdownShare.propTypes = {
  mobileTitle: PropTypes.string.isRequired,
  mobileDescription: PropTypes.string.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  toggleToast: (text) => dispatch(toggleToast(text)),
});
export default connect(null, mapDispatchToProps)(DropdownShare);
