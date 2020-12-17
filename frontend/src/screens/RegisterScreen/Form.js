import React, { Component } from 'react';
import AccountSetup from './AccountSetup';
import SecurityQuestion from './SecurityQuestion1';
import Confirm from './Confirm';

export class Form extends Component {
    state = {
        step: 1,
        fullName: '',
        email: '',
        password: '',
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
        const { fullName, email, password, question, answer } = this.state;
        const values = {
            fullName,
            email,
            password,
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
                    <Confirm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        values={values}
                    />
                );
            default:
                return false;
        }
    }
}

export default Form;
