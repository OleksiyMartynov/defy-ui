import React from "react";
import DebateTime from "./DebateTime";
import Formatter from "../utils/Formatter";
import DropdownShare from "./DropdownShare";
import { Link } from "react-router-dom";
import FloatingButton from "./FloatingButton";
import { ToastDAO } from "../constants";

const DebateDetailsTitle = ({ debateDetails, onBlack }) => {
  return (
    <div>
      <div className="DebateDetails__head-content">
        <button className="DebateDetails__head-content__back" onClick={onBlack}>
          <i
            style={{ fontSize: "25px" }}
            className="fas fa-chevron-left fa-2x"
          />
        </button>
        <div className="DebateDetails__head-content__title">
          <div className="DebateDetails__title">
            {debateDetails.data.debate.title}
          </div>
          <DebateTime
            finished={debateDetails.data.debate.finished}
            dateCreated={debateDetails.data.debate.created}
            dateUpdated={debateDetails.data.debate.updated}
            durationMilli={debateDetails.data.debate.duration}
          />
        </div>
        <div className="DebateDetails__stake">
          <i className="fa fa-bolt" />
          {Formatter.kFormatter(
            debateDetails.data.debate.stake +
              debateDetails.data.debate.totalPro +
              debateDetails.data.debate.totalCon
          )}
        </div>
        <ToastDAO.Producer>
          {(updateModal) => (
            <DropdownShare
              mobileTitle={debateDetails.data.debate.title}
              mobileDescription="Put your ₿ where your mouth is."
              toggleModal={updateModal.toggleToast}
            />
          )}
        </ToastDAO.Producer>
      </div>
      <div className="DebateDetails__tags">
        {debateDetails.data.debate.tags.map((tag) => (
          <div className="DebateDetails__tags__tag">
            <Link
              to={{
                pathname: `/debates/${tag.name}`,
                state: { from: "/debate" },
              }}
            >
              <FloatingButton>
                <i className="fas fa-hashtag" />
                <span>
                  &nbsp;
                  {tag.name}
                </span>
              </FloatingButton>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DebateDetailsTitle;
