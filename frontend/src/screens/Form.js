import React, { Component } from 'react';
import LoginScreen from './LoginScreen';

export class Form extends Component {
    state = {
        step: 1,
        email: '',
        password: '',
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
        const { email, password } = this.state;
        const values = {
            email,
            password,
        };

        switch (step) {
            case 1:
                return (
                    <LoginScreen
                        nextStep={this.nextStep}
                        inputChange={this.inputChange}
                        values={values}
                    />
                );
            default:
                return false;
        }
    }
}

export default Form;
