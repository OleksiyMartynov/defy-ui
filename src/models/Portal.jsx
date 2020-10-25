import React from "react";
import PropTypes from "prop-types";
import Button from "../components/Button";
import Withdraw from "../pages/Withdraw";
import Deposit from "../pages/Deposit";
import CreateDebate from "../pages/CreateDebate";
import Welcome from "../pages/Welcome";
import { MODAL_IDS } from "./UserInterface";

const Portal = ({ showDialogID, closeDialog }) => {
  const dialogData = {};
  switch (showDialogID) {
    case MODAL_IDS.DEPOSIT:
      dialogData.onClose = closeDialog;
      dialogData.content = Deposit;
      break;
    case MODAL_IDS.WITHDRAWAL:
      dialogData.onClose = closeDialog;
      dialogData.content = Withdraw;
      break;
    case MODAL_IDS.CREATE_DEBATE:
      dialogData.onClose = closeDialog;
      dialogData.content = CreateDebate;
      break;
    case MODAL_IDS.WELCOME:
      dialogData.onClose = closeDialog;
      dialogData.content = Welcome;
      dialogData.extraStyle = " App__dialog-wrapper--small";
      break;

    default:
      return null;
  }

  return (
    <div className={`App__dialog-wrapper${dialogData?.extraStyle ?? ""}`}>
      <div className="App__dialog">
        <div className="App__dialog__nav">
          <Button accent onClick={dialogData.onClose}>
            <i className="fa fa-times" />
          </Button>
        </div>
        <div className="App__dialog__content">
          <dialogData.content />
        </div>
      </div>
    </div>
  );
};

Portal.propTypes = {
  showDialogID: PropTypes.number.isRequired,
  closeDialog: PropTypes.func.isRequired,
};

export default Portal;
