import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
  createNewUserFromService,
  deleteUserFromService,
  getAllUsers,
  updateUserDataFromService,
} from "../../services/userService";
import "./userManage.scss";
import ModalUser from "./ModalUser";
import { create } from "lodash";
import { emitter } from "../../utils/emitter";
import ModalEditUser from "./ModalEditUser";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModal: false,
      isOpenEditModal: false,
      userEdit: {},
    };
  }

  handleAddNewUser = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };

  handleEditUser = (user) => {
    this.setState({
      isOpenEditModal: !this.state.isOpenEditModal,
      userEdit: user,
    });
  };

  createNewUser = async (data) => {
    try {
      let response = await createNewUserFromService(data);
      if (response && response.errCode === 0) {
        await this.getAllUsersFromReact();
      } else {
        alert(response.errMsg);
      }
      this.setState({ isOpenModal: false });
      emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
    } catch (err) {
      console.log(err);
    }
  };

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    let res = await getAllUsers("ALL");
    if (res && res.errCode === 0) {
      this.setState({
        arrUsers: res.users,
      });
    }
  };

  updateUserData = async (user) => {
    try {
      let res = await updateUserDataFromService(user);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenEditModal: false,
        });
        this.getAllUsersFromReact();
      } else {
        alert(res.errMsg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUserFromService(user.id);
      if (res && res.errCode === 0) {
        await this.getAllUsersFromReact();
      } else {
        alert(res.errMsg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <>
        <div className="users-container">
          <div className="title text-center">Manage users</div>
          <div className="mx-1">
            <button
              type="button"
              className="btn btn-primary px-3"
              onClick={() => this.handleAddNewUser()}
            >
              <i className="fas fa-plus-circle"></i>
              <span className="d-inline-block ms-2">Add new user</span>
            </button>
          </div>
          <div className="users-table mt-3 mx-1">
            <table id="customers">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {arrUsers &&
                  arrUsers.length &&
                  arrUsers.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td>
                          <button
                            className="btn-edit"
                            onClick={() => this.handleEditUser(item)}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => this.handleDeleteUser(item)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <ModalUser
            isOpen={this.state.isOpenModal}
            handleAddNewUser={this.handleAddNewUser}
            createNewUser={this.createNewUser}
          />
          {this.state.isOpenEditModal && (
            <ModalEditUser
              isOpen={this.state.isOpenEditModal}
              handleEditUser={this.handleEditUser}
              currentUser={this.state.userEdit}
              updateUserData={this.updateUserData}
            />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
