import specialtyService from "../services/specialtyService";

let createSpecialty = async (req, res) => {
  try {
    let info = await specialtyService.createSpecialty(req.body);
    return res.status(200).json(info);
  } catch (err) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let getAllSpecialty = async (req, res) => {
  try {
    let info = await specialtyService.getAllSpecialty();
    return res.status(200).json(info);
  } catch (err) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let getDetailDoctorById = async (req, res) => {
  try {
    let info = await specialtyService.getDetailDoctorById(
      req.query.id,
      req.query.location
    );
    return res.status(200).json(info);
  } catch (err) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

module.exports = {
  createSpecialty,
  getAllSpecialty,
  getDetailDoctorById,
};
