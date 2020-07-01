import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import CountdownCounter from "./CountdownCounter";
import "./DebateTime.scss";

export default class DebateTime extends PureComponent {
  render() {
    const { finished, dateCreated, dateUpdated, durationMilli } = this.props;
    return (
      <div className="DebateTime__time">
        {!finished ? (
          <span>Ongoing for {moment().from(dateCreated, true)}</span>
        ) : (
          <span>
            Finished{" "}
            <CountdownCounter
              endTime={moment(dateUpdated).unix() + durationMilli / 1000}
            />
          </span>
        )}
      </div>
    );
  }
}
DebateTime.propTypes = {
  finished: PropTypes.bool.isRequired,
  dateCreated: PropTypes.string.isRequired,
  dateUpdated: PropTypes.string.isRequired,
  durationMilli: PropTypes.number.isRequired,
};
