import actionTypes from "./actionTypes";
import * as userService from "../../services/userService";
import { toast } from "react-toastify";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await userService.getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (err) {
      dispatch(fetchGenderFailed());
      console.error(err);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  payload: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ROLE_START });
      let res = await userService.getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (err) {
      dispatch(fetchRoleFailed());
      console.error(err);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  payload: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_POSITION_START });
      let res = await userService.getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (err) {
      dispatch(fetchPositionFailed());
      console.error(err);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  payload: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.createNewUserFromService(data);
      if (res && res.errCode === 0) {
        toast.success("Create user successfully!");
        dispatch(createNewUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(createNewUserFailed());
      }
    } catch (err) {
      dispatch(createNewUserFailed());
      console.error(err);
    }
  };
};

export const createNewUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const createNewUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        toast.error("Fetch all users failed!");
        dispatch(fetchAllUsersFailed());
      }
    } catch (err) {
      dispatch(fetchAllUsersFailed());
      console.error(err);
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  payload: data,
});

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.updateUserDataFromService(data);
      if (res && res.errCode === 0) {
        toast.success("Update user successfully");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Update user failed!");
        dispatch(editUserFailed());
      }
    } catch (err) {
      toast.error("Update user failed!");
      dispatch(editUserFailed());
      console.error(err);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const deleteUser = (userID) => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.deleteUserFromService(userID);
      if (res && res.errCode === 0) {
        toast.success("Delete user successfully");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Delete user failed!");
        dispatch(deleteUserFailed());
      }
    } catch (err) {
      toast.error("Delete user failed!");
      dispatch(deleteUserFailed());
      console.error(err);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.getTopDoctorFromService("");
      if (res && res.errCode === 0) {
        dispatch(fetchTopDoctorsSuccess(res.data));
      } else {
        dispatch(fetchTopDoctorsFailed());
      }
    } catch (err) {
      dispatch(fetchTopDoctorsFailed());
    }
  };
};

export const fetchTopDoctorsSuccess = (data) => ({
  type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
  payload: data,
});

export const fetchTopDoctorsFailed = () => ({
  type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
});

export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.getAllDoctorsFromService();
      if (res && res.errCode === 0) {
        dispatch(fetchAllDoctorsSuccess(res.data));
      } else {
        dispatch(fetchAllDoctorsFailed());
      }
    } catch (err) {
      dispatch(fetchAllDoctorsFailed());
    }
  };
};

export const fetchAllDoctorsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
  payload: data,
});

export const fetchAllDoctorsFailed = () => ({
  type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
});

export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.saveDetailDoctor(data);
      console.log("Check res on saveDetailDoctor ", res);
      if (res && res.errCode === 0) {
        toast.success("Save doctor's detail info succeed!");
        dispatch(saveDetailDoctorSuccess());
      } else {
        toast.error("Save doctor's detail info failed!");
        dispatch(saveDetailDoctorFailed());
      }
    } catch (err) {
      toast.error("Save doctor's detail info failed!");
      dispatch(saveDetailDoctorFailed());
    }
  };
};

export const saveDetailDoctorSuccess = (data) => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
});

export const saveDetailDoctorFailed = () => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
});

export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await userService.getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch(fetchAllScheduleTimeSuccess(res.data));
      } else {
        dispatch(fetchAllScheduleTimeFailed());
      }
    } catch (err) {
      dispatch(fetchAllScheduleTimeFailed());
    }
  };
};

export const fetchAllScheduleTimeSuccess = (data) => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
  payload: data,
});

export const fetchAllScheduleTimeFailed = () => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
});

export const fetchRequiredDoctorInfo = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START });
      let resPrice = await userService.getAllCodeService("PRICE");
      let resPayment = await userService.getAllCodeService("PAYMENT");
      let resProvince = await userService.getAllCodeService("PROVINCE");
      let resSpecialty = await userService.getAllSpecialty();
      let resClinic = await userService.getAllClinic();

      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0 &&
        resClinic &&
        resClinic.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data,
        };
        dispatch(fetchRequiredDoctorInfoSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorInfoFailed());
      }
    } catch (err) {
      dispatch(fetchRequiredDoctorInfoFailed());
    }
  };
};

export const fetchRequiredDoctorInfoSuccess = (data) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
  payload: data,
});

export const fetchRequiredDoctorInfoFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED,
});
