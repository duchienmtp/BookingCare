import userService from "../services/userService";

let handleLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).json({
        errCode: 1,
        message: "Missing email or password!",
      });
    }

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json({
      errCode: userData.errCode,
      message: userData.errMsg,
      user: userData.user ? userData.user : {},
    });
  } catch (err) {
    console.error(err);
  }
};

let handleGetAllUsers = async (req, res) => {
  try {
    let id = req.query.id; //ALL, id
    if (!id) {
      return res.status(200).json({
        errCode: 1,
        errMsg: "Missing required parameter",
        users: [],
      });
    }

    let users = await userService.getAllUsers(id);

    return res.status(200).json({
      errCode: 0,
      errMsg: "Ok",
      users,
    });
  } catch (err) {
    console.log(err);
  }
};

let handleCreateNewUser = async (req, res) => {
  try {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
  } catch (err) {
    console.log(err);
  }
};

let handleEditUser = async (req, res) => {
  try {
    let data = req.body;
    let message = await userService.updateUser(data);
    return res.status(200).json(message);
  } catch (err) {
    console.log(err);
  }
};

let handleDeleteUser = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(200).json({
        errCode: 1,
        errMsg: "Missing required parameter",
      });
    }

    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
  } catch (err) {
    console.log(err);
  }
};

let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (err) {
    console.log("Get all code error: ", err);
    return res.status(500).json({
      errCode: -1,
      errMsg: "Error from server",
    });
  }
};

module.exports = {
  handleLogin,
  handleGetAllUsers,
  handleCreateNewUser,
  handleEditUser,
  handleDeleteUser,
  getAllCode,
};
