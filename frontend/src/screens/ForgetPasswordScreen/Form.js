import React, { Component } from 'react';
import AccountSetup from './AccountSetup';
import SecurityQuestion from './SecurityQuestion';
import Confirm from './Confirm';
import ChangePassword from './ChangePassword';
import LoginScreen from '../LoginScreen';
export class Form extends Component {
    state = {
        step: 1,
        email: '',
        password: '',
        confirmPassword: '',
        question: '',
        answer: '',
    };

    nextStep = () => {
        const { step } = this.state;
        this.setState({ step: step + 1 });
    };

    prevStep = () => {
        const { step } = this.state;
        this.setState({ step: step - 1 });
    };

    inputChange = (input) => (e) => {
        this.setState({
            [input]: e.target.value,
        });
    };

    render() {
        const { step } = this.state;
        const {
            email,
            password,
            confirmPassword,
            question,
            answer,
        } = this.state;
        const values = {
            email,
            password,
            confirmPassword,
            question,
            answer,
        };

        switch (step) {
            case 1:
                return (
                    <AccountSetup
                        nextStep={this.nextStep}
                        inputChange={this.inputChange}
                        values={values}
                    />
                );
            case 2:
                return (
                    <SecurityQuestion
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        inputChange={this.inputChange}
                        values={values}
                    />
                );
            case 3:
                return (
                    <ChangePassword
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        inputChange={this.inputChange}
                        values={values}
                    />
                );
            case 4:
                return <LoginScreen />;
            default:
                return false;
        }
    }
}

export default Form;
