import clinicService from "../services/clinicService";

let createClinic = async (req, res) => {
  try {
    let info = await clinicService.createClinic(req.body);
    return res.status(200).json(info);
  } catch (err) {
    console.error("Check error from createClinic: ", err);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let getAllClinic = async (req, res) => {
  try {
    let info = await clinicService.getAllClinic();
    return res.status(200).json(info);
  } catch (err) {
    console.error("Check error from getAllClinic: ", err);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let getDetailClinicById = async (req, res) => {
  try {
    let info = await clinicService.getDetailClinicById(req.query.id);
    return res.status(200).json(info);
  } catch (err) {
    console.error("Check error from getDetailClinicById: ", err);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

module.exports = { createClinic, getAllClinic, getDetailClinicById };
