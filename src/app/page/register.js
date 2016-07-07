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
import Paper from 'material-ui/Paper'

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
      this.props.onChange(e.currentTarget.id, e.currentTarget.value);
    }
  }

  render() {
    return(
      <Card>
        <CardHeader title="register" />
        <CardText>
          <TextField
            id="username"
            floatingLabelText='用户名'
            onChange={this.handleChange}
            errorText={this.props.usernameError}
          />
        </CardText>
        <CardText>
          <TextField
            id="password"
            floatingLabelText='密码'
            onChange={this.handleChange}
            errorText={this.props.passwordError}
          />
        </CardText>
        <CardText>
          <TextField
            id='email'
            floatingLabelText='电子邮箱'
            errorText={this.props.emailError}
            onChange={this.handleChange}
          />
        </CardText>
      </Card>
    );
  }
}

class Register extends Component {

  constructor (props) {
    super(props);
    this.state = {
      stepIndex: 1,
      finished: false,
    }

    this.handleNext = () => {
      const {stepIndex} = this.state;
      if (stepIndex ==1) {

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

    this.handleChildStateChange = (key, value) => {
      let msg = '';
      switch (key) {
        case 'username': {
          let regex = /^[a-zA-Z\-]+$/;
          msg = value.match(regex) == null ? '用户名只能由标准字符组成' : '';
          msg = value.length < 5 ? '用户名最短为 5 位' : '';
          break;
        }

        case 'password': {
          msg = value.length < 6 ? '密码长度最短为 6 位' : '';
          break;
        }
        case 'email': {
          let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          msg = value.match(regex) == null ? '邮箱格式不正确' : '';
          break;
        }
      }

      let updatedState = {};
      updatedState[key + 'Error'] = msg;
      updatedState[key] = value;
      this.setState(updatedState);


    }

    this.getStepContent = () => {
      switch  (this.state.stepIndex) {
        case 0:
          return "注册协议";
        case 1:
          return (
            <InfoCard
              onChange={this.handleChildStateChange}
              passwordError={this.state.passwordError}
              usernameError={this.state.usernameError}
              emailError={this.state.emailError}
            />
          );
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
            <StepLabel>Step 1</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step 2</StepLabel>
          </Step>
          <Step>
            <StepLabel>Step 3</StepLabel>
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
                  <Paper>
                    {this.getStepContent()}
                  </Paper>

                  <div style={{marginTop: 12}}>
                    <FlatButton
                      label="Back"
                      onTouchTap={this.handlePrev}
                      style={{marginRight: 12}}
                      prinmary={true}
                    />
                    <RaisedButton
                      label={this.state.stepIndex === 2 ? 'Finish' : 'Next'}
                      disabled={
                        this.state.usernameError !== '' ||
                          this.state.passwordError !== '' ||
                          this.state.emailError !== ''
                      }
                      primary={true}
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
