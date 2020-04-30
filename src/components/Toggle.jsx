import React from 'react';
import './Toggle.scss';
import Button from './Button';
class Toggle extends React.Component {
    state = {left:true};
    handleToggleChange = () =>{
        this.setState({
            left:!this.state.left
          });
    }
    render () {
        const {left} = this.state;
        return(<div className="Toggle">
        <Button 
            secondary 
            selected={left}
            onClick={this.handleToggleChange}>Active</Button>
        <Button 
            secondary 
            selected={!left}
            onClick={this.handleToggleChange}>Closed</Button>
      </div>);
    }
}
export default Toggle;