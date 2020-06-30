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
    this.doCalc();
    this.timerId = setInterval(() => {
      this.doCalc();
    }, 1000 * 60);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  doCalc() {
    const { endTime } = this.state;
    const endTimeFormatted = moment.unix(endTime).fromNow();
    this.setState({ endTimeFormatted });
  }

  render() {
    const { endTimeFormatted } = this.state;

    return <React.Fragment>{endTimeFormatted}</React.Fragment>;
  }
}

export default CountdownCounter;

CountdownCounter.propTypes = {
  endTime: PropTypes.number.isRequired,
};
