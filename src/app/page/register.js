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
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import Paper from 'material-ui/Paper'
import call from '../api'

const styles = {
  step: {
    width: "100%",
    height: "100%",
  },
  radioButton: {
    marginBottom: 16,
  },
  position: {
      marginLeft: "50%",
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
        <CardText>
          <TextField
              id='telephone'
              floatingLabelText='电话'
              errorText={this.props.telephoneError}
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
      stepIndex: 0,
      finished: false,
      agree: false,
    }

    this.handleNext = () => {
      const {stepIndex} = this.state;
      let finished = stepIndex >= 2;
      this.setState({
        stepIndex: stepIndex + 1,
        finished
      });
      if (finished) {
        call('register', {
          name: this.state.username,
          password: this.state.password,
          email: this.state.email,
          phone: this.state.telephone,
          sex: 'M'
        }, (data, err) => {
          if (data && data.status == 'success') {
            window.alert('Register success');
          } else {
            window.alert(data.message ? data.message : "Register failed");
          }
        })
      }
    };

    this.handlePrev = () => {
      const {stepIndex} = this.state;

      if (stepIndex > 0) {
        this.setState({
          stepIndex: stepIndex - 1,
        });
      }
      else {
        this.props.history.goBack();
        this.setState({
          stepIndex: 0,
          finished: false,
        });
      }
    };

    this.handleChange = () => {
      this.setState({
        agree: !this.state.agree,
      })
    }


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
        case 'telephone': {
          let regex = /[0-9]{11}/;
          msg = value.match(regex) ==null ? '电话格式不正确' : '';
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
          return(
          <div>
              <div style={styles.position}>User Agreement</div>
              <div>
              <p> This User Agreement, the User Privacy Notice, the Mobile Devices Terms, and all policies posted on our sites set out the terms on which eBay offers you access to and use of our sites, services, applications and tools (collectively "Services"). You can find an overview of our policies here. All policies, the Mobile Devices Terms, and the User Privacy Notice are incorporated into this User Agreement. You agree to comply with all of the above when accessing or using our Services.</p>
              <p>The entity you are contracting with is eBay Inc., 2065 Hamilton Ave., San Jose, CA 95125 if you reside in the United States. It is eBay Europe S.à r.l., 22-24 Boulevard Royal, L-2449 Luxembourg if you reside in the European Union; eBay India Private Limited, 14th Floor, North Block, R-Tech Park, Western Express Highway, Goregaon (East), Mumbai 400063, Maharashtra if you reside in India; and eBay International AG, Helvetiastrasse 15/17, 3005, Bern, Switzerland if you reside in any other country.</p>
              <p>Please be advised that this User Agreement contains provisions that govern how claims you and we have against each other are resolved (see Disclaimer of Warranties; Limitation of Liability and Legal Disputes provisions below). It also contains an Agreement to Arbitrate, which will, with limited exception, require you to submit claims you have against us to binding and final arbitration, unless you opt out of the Agreement to Arbitrate (see Legal Disputes, Section B ("Agreement to Arbitrate")). Unless you opt out: (1) you will only be permitted to pursue claims against us on an individual basis, not as a plaintiff or class member in any class or representative action or proceeding and (2) you will only be permitted to seek relief (including monetary, injunctive, and declaratory relief) on an individual basis.</p>
              </div>
              <RadioButtonGroup  defaultSelected="light" onChange={this.handleChange}>
                <RadioButton value="not_light" label="Agree" style={styles.radioButton} />
                <RadioButton value="light" label="Disagree" style={styles.radioButton} />
              </RadioButtonGroup>
          </div>
          );
        case 1:
          return (
            <InfoCard
              onChange={this.handleChildStateChange}
              passwordError={this.state.passwordError}
              usernameError={this.state.usernameError}
              emailError={this.state.emailError}
              telephoneError={this.state.telephoneError}
            />
          );
        case 2:
          return "Registering...";
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
                    disabled= {
                      (() => {
                        switch(this.state.stepIndex) {
                        case 0: {return !this.state.agree}
                        case 1: {return (
                          this.state.stepIndex == 1?(
                          this.state.usernameError !== '' ||
                          this.state.passwordError !== '' ||
                          this.state.emailError !== ''||
                          this.state.telephoneError !== ''
                          ): false)}
                        case 2:{return false}
                        }
                      })()
                    }
                    primary={true}
                    onTouchTap={this.handleNext}
                  />
                </div>
              </div>
          }
        </div>
      </div>
    );
  }
}
;
export default Register
