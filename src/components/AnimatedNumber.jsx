import React from "react";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";
import { usePrevious } from "../utils/Hooks";
import Formatter from "../utils/Formatter";

const AnimatedNumber = ({ value }) => {
  const spring = useSpring({
    from: usePrevious(value),
    to: { val: value },
  });
  return (
    <animated.span>
      {spring.val.interpolate((val) => Formatter.addCommas(Math.floor(val)))}
    </animated.span>
  );
};
AnimatedNumber.propTypes = {
  value: PropTypes.number.isRequired,
};
export default AnimatedNumber;
