import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import "./DropdownShare.scss";
import { MODELS } from '../constants';

export default ({ mobileTitle, mobileDescription }) => {
  const [_, toggleToast] = MODELS.TOAST.useToastModel();
  const onCopy = () => {
    toggleToast("Link coppied");
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
