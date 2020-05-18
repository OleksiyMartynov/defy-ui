import React from "react";
import PropTypes from "prop-types";
import "./DebateCard.scss";
import DebateProgress from "./DebateProgress";

class DebateCard extends React.PureComponent {
  render() {
    const { title, description } = this.props;
    return (
      <div className="DebateCard">
        <div className="DebateCard__title">{title}</div>
        <div className="DebateCard__description">{description}</div>
        <DebateProgress />
      </div>
    );
  }
}

DebateCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default DebateCard;
