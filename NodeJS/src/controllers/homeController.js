import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", { data: JSON.stringify(data) });
  } catch (err) {
    console.log(err);
  }
};

let getCRUD = async (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  try {
    await CRUDService.createNewUser(req.body);
    return res.redirect("/get-crud");
  } catch (err) {
    console.log(err);
  }
};

let displayCRUD = async (req, res) => {
  try {
    let data = await CRUDService.getAllUsers();
    return res.render("displayCRUD.ejs", { data });
  } catch (err) {
    console.log(err);
  }
};

let editCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserById(userId);
    return res.render("editCRUD.ejs", { data: userData });
  } else {
    return res.send("User not found!");
  }
};

let putCRUD = async (req, res) => {
  try {
    const users = await CRUDService.updateUserData(req.body);
    return res.render("displayCRUD.ejs", { data: users });
  } catch (err) {
    console.log(err);
  }
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDService.deleteUser(id);
    return res.send("Hello from delete CRUD");
  } else {
    return res.send("User not found!");
  }
};

module.exports = {
  getHomePage,
  getCRUD,
  postCRUD,
  displayCRUD,
  editCRUD,
  putCRUD,
  deleteCRUD,
};
