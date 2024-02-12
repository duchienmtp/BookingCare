import doctorService from "../services/doctorService";

let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await doctorService.getTopDoctorHome(+limit);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

let getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorService.getAllDoctors();
    return res.status(200).json(doctors);
  } catch (err) {
    console.error("Check error from getAllDoctors", err);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

let postInfoDoctors = async (req, res) => {
  try {
    let response = await doctorService.saveInfoDoctor(req.body);
    return res.status(200).json(response);
  } catch (err) {
    console.error("Check error from postInfoDoctors ", err);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

let getDetailDoctorById = async (req, res) => {
  try {
    let info = await doctorService.getDetailDoctorById(req.query.id);
    return res.status(200).json(info);
  } catch (err) {
    console.error("Check error from getDetailDoctorById ", err);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let bulkCreateSchedule = async (req, res) => {
  try {
    let info = await doctorService.bulkCreateSchedule(req.body);
    return res.status(200).json(info);
  } catch (err) {
    console.error("Check error from bulkCreateSchedule ", err);
    return res
      .status(200)
      .json({ errCode: -1, errMessage: "Error from the server" });
  }
};

let getScheduleByDate = async (req, res) => {
  try {
    let info = await doctorService.getScheduleByDate(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(info);
  } catch (err) {
    console.error("Check error from getScheduleByDate: ", err);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let getExtraInfoDoctorByID = async (req, res) => {
  try {
    let info = await doctorService.getExtraInfoDoctorByID(req.query.doctorId);
    return res.status(200).json(info);
  } catch (err) {
    console.error("Check error from getExtraInfoDoctorByID: ", err);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let getProfileDoctorByID = async (req, res) => {
  try {
    let info = await doctorService.getProfileDoctorByID(req.query.doctorId);
    return res.status(200).json(info);
  } catch (err) {
    console.error("Check error from getProfileDoctorByID: ", err);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let getListPatientForDoctor = async (req, res) => {
  try {
    let info = await doctorService.getListPatientForDoctor(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(info);
  } catch (err) {
    console.error("Check error from getListPatientForDoctor: ", err);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let sendRemedy = async (req, res) => {
  try {
    let info = await doctorService.sendRemedy(req.body);
    return res.status(200).json(info);
  } catch (err) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

module.exports = {
  getTopDoctorHome,
  getAllDoctors,
  postInfoDoctors,
  getDetailDoctorById,
  bulkCreateSchedule,
  getScheduleByDate,
  getExtraInfoDoctorByID,
  getProfileDoctorByID,
  getListPatientForDoctor,
  sendRemedy,
};
