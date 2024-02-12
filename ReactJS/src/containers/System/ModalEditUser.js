import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";
import { emitter } from "../../utils/emitter";
import _ from "lodash";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backdrop: true,
      keyboard: true,
      firstName: "",
      lastName: "",
      address: "",
      email: "",
      password: "",
      phoneNumber: "",
    };

    this.listenToEmitter();
  }

  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        password: "",
        phoneNumber: "",
      });
    });
  };

  componentDidMount() {
    let { currentUser } = this.props;
    if (currentUser && !_.isEmpty(currentUser)) {
      this.setState({
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        address: currentUser.address,
        email: currentUser.email,
        password: "",
        phoneNumber: currentUser.phoneNumber,
      });
    }
  }

  toggle = () => {
    this.props.handleEditUser();
  };

  //   Way 1:
  //     handleOnChangeInput = (event) => {
  //       console.log(event.target);
  //       switch (event.target.id) {
  //         case "inputFirstName":
  //           this.setState({ firstName: event.target.value });
  //           break;
  //         case "inputLastName":
  //           this.setState({ lastName: event.target.value });
  //           break;
  //         case "inputAddress":
  //           this.setState({ address: event.target.value });
  //           break;
  //         case "inputEmail":
  //           this.setState({ email: event.target.value });
  //           break;
  //         case "inputPassword":
  //           this.setState({ password: event.target.value });
  //           break;
  //         default:
  //           this.setState({ phoneNumber: event.target.value });
  //       }
  //     };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({ ...copyState });
  };

  validateInputData = () => {
    let isValid = true;
    let arrInput = ["firstName", "lastName", "address", "email", "phoneNumber"];

    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }

    return isValid;
  };

  handleSaveUser = () => {
    let isValid = this.validateInputData();
    if (isValid) {
      this.props.updateUserData(this.state);
    }
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          toggle={this.toggle}
          className={this.props.className}
          backdrop={this.state.backdrop}
          keyboard={this.state.keyboard}
          size="lg"
          //   centered
        >
          <ModalHeader toggle={this.toggle}>Update user's data</ModalHeader>
          <ModalBody>
            <div className="container">
              <form className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="inputFirstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputFirstName"
                    placeholder="Peter"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "firstName")
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputLastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputLastName"
                    placeholder="Parker"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "lastName")
                    }
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="inputAddress" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="123 St. Louis"
                    name="address"
                    value={this.state.address}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "address")
                    }
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="inputEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail"
                    placeholder="example@example.com"
                    name="email"
                    value={this.state.email}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "email")
                    }
                    disabled
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="inputPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    name="password"
                    value={this.state.password}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "password")
                    }
                    disabled
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputPhoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="inputPhoneNumber"
                    name="phoneNumber"
                    value={this.state.phoneNumber}
                    onChange={(event) =>
                      this.handleOnChangeInput(event, "phoneNumber")
                    }
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputGender" className="form-label">
                    Gender
                  </label>
                  <select
                    id="inputGender"
                    className="form-select"
                    name="gender"
                  >
                    <option defaultValue={"Gender"}>Gender</option>
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="inputRole" className="form-label">
                    Role
                  </label>
                  <select id="inputRole" className="form-select" name="roleId">
                    <option defaultValue={"Role"}>Role</option>
                    <option value="1">Admin</option>
                    <option value="2">Doctor</option>
                    <option value="3">Patient</option>
                  </select>
                </div>
              </form>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="px-3"
              onClick={this.handleSaveUser}
            >
              Save Change
            </Button>
            <Button color="secondary" className="px-3" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ModalEditUser.propTypes = {
  className: PropTypes.string,
};

export default ModalEditUser;
