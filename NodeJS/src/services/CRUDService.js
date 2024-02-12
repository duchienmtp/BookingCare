import db from "../models/index";
import bcrypt from "bcryptjs";
var salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashedPassword = await bcrypt.hashSync(password, salt);
      resolve(hashedPassword);
    } catch (err) {
      reject(err);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashedPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashedPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        image: data.image,
        roleId: data.roleId,
        positionId: data.positionId,
      });

      resolve("Created user successfully!");
    } catch (err) {
      reject(err);
    }
  });
};

let getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (err) {
      reject(err);
    }
  });
};

let getUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });

      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (err) {
      reject(err);
    }
  });
};

let updateUserData = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userData.id },
      });
      if (user) {
        user.firstName = userData.firstName;
        user.lastName = userData.lastName;
        user.address = userData.address;
        user.phoneNumber = userData.phoneNumber;

        await user.save();
        let users = await db.User.findAll();
        resolve(users);
      } else {
        resolve("Update user data failed!");
      }
    } catch (err) {
      reject(err);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });

      if (user) {
        await user.destroy();
      }

      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  createNewUser,
  getAllUsers,
  getUserById,
  updateUserData,
  deleteUser,
};
