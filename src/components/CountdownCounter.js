import React, { Component } from "react";
import moment from "moment";

const styles = {
  root: {},
};
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
    let endTime = this.state.endTime;
    let endTimeFormatted;
    endTimeFormatted = moment.unix(endTime).fromNow();
    this.setState({ endTimeFormatted: endTimeFormatted });
  }

  render() {
    //const { classes } = this.props;
    const { endTimeFormatted } = this.state;

    return <React.Fragment>{endTimeFormatted}</React.Fragment>;
  }
}

export default CountdownCounter;
