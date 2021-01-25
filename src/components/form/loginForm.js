import React from 'react';
import PageLabel from '../label/label';

export default class LoginForm extends React.Component {


    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(event) {
        this.props.hideFormDiv();
        this.props.showPopUp('Logged in successfully !', false);
        event.preventDefault();
    }

    render() {
        return (
            <div>
            <form className="cafe-form" id="login-form" style={this.props.Visibility ? {display: 'none'} : {display: 'block'}} onSubmit={this.handleLogin}>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <table>
                    <tbody>
                    <tr>
                        <td><PageLabel labelValue={"Employee ID "} type="sub-heading" /></td>
                        <td><input type="text" placeholder="Enter Employee ID" /></td>
                    </tr>

                    <tr>
                        <td><PageLabel labelValue={"Passoword "} type="sub-heading" /></td>
                        <td><input type="password" placeholder="Enter Password"/></td>
                    </tr>

                    </tbody>
                </table>

                <input className="form-button" value="Login" type="submit"/>
            </form>
            </div>
        );
    }
}