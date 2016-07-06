/**
 * Created by luoop on 16-7-3.
 */
import React, {Component} from 'react';
import {Stepper} from 'material-ui/Stepper';



class Info

class Register extends Component{

    constructor (props) {
        super(props);
        this.state = {
            stepIndex: 0,
            finished: false,
        }
        
        this.handleNextStep = () => {
            const {stepIndex} = this.state;
            this.setState({
                stepIndex: stepIndex + 1,
                finished: stepIndex >=2,
            });
        }
    }
    
    
    render() {
        return (
            <div>
                <Stepper activeStep={this.state.stepIndex}>
                    
                </Stepper>
            </div>
        );
    }
}
