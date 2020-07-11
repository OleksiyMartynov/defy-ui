import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

class CountdownCounter extends Component {
  timerId;

  constructor(props) {
    super(props);
    this.state = { endTime: props.endTime };
  }

  componentDidMount() {
    const { interval } = this.props;
    this.doCalc();
    this.timerId = setInterval(
      () => {
        this.doCalc();
      },
      interval ? interval : 1000 * 60
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  doCalc() {
    const { endTime } = this.state;
    const endTimeFromNow = moment.unix(endTime).fromNow();
    const currentTime = moment().unix();
    const diffTime = Math.max(endTime - currentTime, 0);
    const duration = moment.duration(diffTime * 1000, "milliseconds");
    this.setState({ endTimeFromNow, duration });
  }

  formatNumber(n) {
    return n < 10 ? "0" + n : n;
  }

  render() {
    const { endTimeFromNow, duration } = this.state;
    const { format } = this.props;

    return (
      <>
        {format && duration
          ? `${this.formatNumber(duration.hours())}:${this.formatNumber(
              duration.minutes()
            )}:${this.formatNumber(duration.seconds())}`
          : endTimeFromNow}
      </>
    );
  }
}

export default CountdownCounter;

CountdownCounter.propTypes = {
  endTime: PropTypes.number.isRequired,
  format: PropTypes.bool,
  interval: PropTypes.number,
};
