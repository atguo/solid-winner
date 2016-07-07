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
    constructor(props) {
        super(props);
        this.handleChange= (e) => {
            switch (e.currentTarget.id) {
                case "username": {
                        let username = e.currentTarget.value;
                        this.props.onChangeRegister({username});
                        break;
                    }
                case "password": {
                        let password = e.currentTarget.value;
                        this.props.onChangeRegister({password});
                        break;
                }
                case "confirm": {
                        let confirm = e.currentTarget.value;
                        this.props.onChangeRegister({confirm});
                        break;
                }
                case "email": {
                        let email = e.currentTarget.value;
                        this.props.onChangeRegister({email});
                        break;
                }
            }
        }
    }
    
    render() {
        return(
            <Card >
                <CardHeader title="register" />
                <CardText>
                    username: <TextField hintText="username"
                                         id="username"
                                         onChange={this.handleChange}
                              />
                </CardText>
                <CardText>
                    password: <TextField hintText="password"
                                         id="password"
                                         onChange={this.handleChange}
                              />
                </CardText>
                <CardText>
                    confirm password: <TextField hintText="confirm password" 
                                                 id="confirm"
                                                 onChange={this.handleChange}
                                      />
                </CardText>
                <CardText>
                    e-mail: <TextField hintText="e-mail" 
                                       id="email"
                                       onChange={this.handleChange}
                            />
                </CardText>
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
            canNext: false,
            username: null,
            password:,
            }
        
        this.handleNext = () => {
            const {stepIndex} = this.state;
            if (stepIndex ==1){
                
            }
            this.setState({
                stepIndex: stepIndex + 1,
                finished: stepIndex >=2,
            });
        };



        this.handlePrev = () => {
            const {stepIndex} = this.state;

            if (stepIndex > 0) {
                this.setState({
                    stepIndex: stepIndex - 1,
                });
            }
            else {
                window.location.replace('/#/Home');
                this.setState({
                    stepIndex: 0,
                    finished: false,
                });
            }
        };

        this.handleChangeRegister = (v) => {
            this.setState(v);
            console.log(this.state);
        }

        this.handleButtonDisabled = () => {
             const rgst = this.state.registerInput;
             let disabled = (this.state.stepIndex == 1) ?
                            ((rgst.username && rgst.email && rgst.password &&
                            rgst.confirm && (rgst.password == rgst.confirm)) ?
                            false:true
                        ): false;
            return disabled;
        }

        this.getStepContent = (stepIndex) => {
            switch  (stepIndex) {
                case 0:
                    return "注册协议";
                case 1:
                    return <InfoCard onChangeRegister={this.handleChangeRegister}/> ;
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
                                        finished: false,
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
                                    onTouchTap={this.handlePrev}
                                    style={{marginRight: 12}}
                                    prinmary={true}
                                />
                                <RaisedButton
                                    label={this.state.stepIndex === 2 ? 'Finish' : 'Next'}
                                    disabled={this.handleButtonDisabled()}
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
