import React, {Component} from 'react';
import PropTypes from "prop-types";
import './Button.scss';

class Button extends Component {
    render() {
        const {children, secondary, selected, ...nativeProps} = this.props;
        let classes = "Button";
        if(secondary){
            classes+="--secondary";
            if(selected){
                classes+=" Button--secondary--selected";
            }
        }else{
            classes+="--primary";
            if(selected){
                classes+=" Button--primary--selected";
            }
        }
        return (
            <button selected className={classes} {...nativeProps} >
                {children}
            </button>
        );
    }
}

Button.propTypes = {
    secondary : PropTypes.bool,
    selected : PropTypes.bool
};

export default Button;
