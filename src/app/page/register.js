/**
 * Created by luoop on 16-7-3.
 */
import React, {Component} from 'react';
import {Stepper,
        StepLabel,
        Step,
} from 'material-ui/Stepper';
import TextField from 'material-ui/TextField'
import {
    Card,
    CardText,
    CardHeader,
    CardActions,
} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
    step: {
        width: "100%",
        height: "100%",
    }
}


class InfoCard extends Component{
    render() {
        return(
            <Card >
                <CardHeader title="register" />
                <CardText>
                    username: <TextField value="asdsad" />
                </CardText>
                <CardText>
                    password: <TextField defauleValue="password" />
                </CardText>
                <CardText>
                    confirm password: <TextField defauleValue="confirm password" />
                </CardText>
                <CardText>
                    e-mail: <TextField defauleValue="e-mail" />
                </CardText>
                <CardActions>

                </CardActions>
            </Card>
        );
    }
}

class Register extends Component{

    constructor (props) {
        super(props);
        this.state = {
            stepIndex: 0,
            finished: false,
        }
        
        this.handleNext = () => {
            const {stepIndex} = this.state;
            this.setState({
                stepIndex: stepIndex + 1,
                finished: stepIndex >=2,
            });
        };

        this.handlePrev = () => {
            const {stepIndex} = this.state;
            if (stepIndex > 0) {
                this.setState({
                    stepIndex: StepIndex - 1,
                });
            }
        };

        this.getStepContent = (stepIndex) => {
            switch  (stepIndex) {
                case 0:
                    return "注册协议";
                case 1:
                    return <InfoCard /> ;
                case 2:
                    return "set payment way";
                default:
                    return "xxxxx";
            };
        }
    }

    render() {
        const contentStyle = {margin: '0 16px'};
        return (
        <div style={{width: '100%', margin: 'auto'}}>
            <Stepper activeStep={this.state.stepIndex}>
                <Step style={styles.card}>
                    <StepLabel>xxxxxx</StepLabel>
                </Step>
                <Step>
                    <StepLabel>xxxxxx</StepLabel>
                </Step>
                <Step>
                    <StepLabel>xxxxxx</StepLabel>
                </Step>
            </Stepper>
            <div style={contentStyle}>
                {
                    this.state.finished?(
                        <p>
                            <a
                                href="#"
                                onClick = {(event) => {
                                    event.preventDefault();
                                    this.setState({
                                        stepIndex: 0,
                                        finished: false
                                    });
                                }}
                            >
                                Click here
                            </a> to reset the Stepper
                        </p>
                    ):(
                        <div>
                            <p>{this.getStepContent(this.state.stepIndex)}</p>
                            <div style={{marginTop: 12}}>
                                <FlatButton
                                    label="Back"
                                    disabled={this.state.stepIndex ===2}
                                    onTouchTap={this.handlePrev}
                                    style={{marginRight: 12}}
                                />
                                <RaisedButton
                                    label={this.state.stepIndex === 2 ? 'Finish' : 'Next'}
                                    prinmary={true}
                                    onTouchTap={this.handleNext}
                                />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
        );
    }
}
;
export default Register
