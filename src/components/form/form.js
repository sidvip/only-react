import React from 'react';
import './form.css';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';

export default class CafeteriaForm extends React.Component {

    
    render() {
        return (
            <div>
                <RegisterForm Visibility={this.props.isVisible} hideFormDiv={this.props.overlaidId} showPopUp={this.props.showPopUpFunc}/>
                <LoginForm Visibility={this.props.isVisible} hideFormDiv={this.props.overlaidId} showPopUp={this.props.showPopUpFunc}/>
            </div>
        );
    }
}
