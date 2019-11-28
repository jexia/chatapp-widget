import React from "react";
import { connect } from "react-redux";
import * as styled from './styles';
import history from "../../history";
import { ChatLogo } from "../../consts/images";
import * as color from '../../consts/colors';
import { createToken, requestAdminLogin, requestLogin } from "../../store/actionsCreators/actions";
import ModalError from "./ErrorModal";

class LoginPage extends React.Component {

  state = {
    email: "",
    password: "",
    showError: false,
  };

  componentWillUnmount() {
    this.setState({
      showError: false,
    })
  }

  handleInput = ( {target: { value, name } } ) => {
    this.setState({
      [name]: value,
    });
  };

  handleAuth = () => {
    const { email, password } = this.state;
    let admin = {
      email,
      password,
    };
    if(!email || !password) {
      this.setState({
        showError: true,
      });
    } else {
      this.setState({
        showError: false,
      });
      this.props.createToken(admin);
      history.push('/chat');
    }

  };

  onKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      this.handleAuth();
    }
  };

  closeModal = () => {
    this.setState({
      showError: false
    })
  };

  render() {
    const { user_name, password, showError } = this.state;
    return (
      <styled.LoginWrapper>
        { showError && <ModalError error={"Email or password incorrect"} closeModal={this.closeModal}/> }
          <styled.LoginAdmin
            color={color.mainColor}
          >
            <img
              src={ChatLogo}
              alt="message"
            />
            <span>
              Login to Admin
            </span>
          </styled.LoginAdmin>
          <styled.InputWrapper>
            <styled.CostumeInput
              type="text"
              name="email"
              placeholder="User name"
              value={user_name}
              onChange={this.handleInput}
            />
            <styled.CostumeInput
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleInput}
              onKeyDown={this.onKeyDown}
            />
          </styled.InputWrapper>
        <styled.AuthButton
          color={color.mainColor}
          onClick={this.handleAuth}
        >
          Login
        </styled.AuthButton>
      </styled.LoginWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  admin: state.adminData.admin,
  isLoginError: state.adminData.isLoginError,
});

const mapDispatchToProps = (dispatch) => ({
  createToken: (email, password) => dispatch(createToken(email, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);