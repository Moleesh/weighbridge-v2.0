import React, { Component } from "react";

const INITIAL_URL = "";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ""
    };
  }

  render() {
    const { password } = this.state;
    return (
      <div class="LoginForm">
        <h1>Validated Login Form</h1>
        <form action={INITIAL_URL + "/loginForm"} method="get">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={this.handleChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

}

export default LoginForm;
