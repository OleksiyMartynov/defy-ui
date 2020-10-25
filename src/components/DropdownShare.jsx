import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import "./DropdownShare.scss";
import PropTypes from "prop-types";

const DropdownShare = ({ mobileTitle = "", mobileDescription = "", toggleModal }) => {
  const onCopy = () => {
    toggleModal("Link coppied");
  };

  const mobileShare = () => {
    if (navigator.share) {
      navigator.share({
        text: mobileTitle,
        title: mobileDescription,
        url: window.location,
      });
    }
  };

  return (
    <div className="DropdownShare">
      <i className="fas fa-share-alt" />
      <div className="DropdownShare__dropdown">
        <div className="DropdownShare__dropdown__content">
          <CopyToClipboard text={window.location} onCopy={onCopy}>
            <div
              className="DropdownShare__dropdown__content__item"
              onClick={mobileShare}
            >
              <i className="fas fa-link" />
              Copy link to Debate
            </div>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
};
DropdownShare.propTypes = {
  mobileTitle: PropTypes.string.isRequired,
  mobileDescription: PropTypes.string.isRequired,
};

export default DropdownShare;
