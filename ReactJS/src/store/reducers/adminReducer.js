import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topDoctors: [],
  allDoctors: [],
  allScheduleTime: [],
  allRequiredDoctorInfo: [],
  isLoadingGender: false,
  isLoadingRole: false,
  isLoadingPosition: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      return {
        ...state,
        isLoadingGender: true,
      };

    case actionTypes.FETCH_GENDER_SUCCESS:
      return {
        ...state,
        genders: action.payload,
        isLoadingGender: false,
      };

    case actionTypes.FETCH_GENDER_FAILED:
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLE_START:
      return {
        ...state,
        isLoadingRole: true,
      };

    case actionTypes.FETCH_ROLE_SUCCESS:
      return {
        ...state,
        roles: action.payload,
        isLoadingRole: false,
      };

    case actionTypes.FETCH_ROLE_FAILED:
      return {
        ...state,
      };

    case actionTypes.FETCH_POSITION_START:
      return {
        ...state,
        isLoadingPosition: true,
      };

    case actionTypes.FETCH_POSITION_SUCCESS:
      return {
        ...state,
        positions: action.payload,
        isLoadingPosition: false,
      };

    case actionTypes.FETCH_POSITION_FAILED:
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };

    case actionTypes.FETCH_ALL_USERS_FAILED:
      return {
        ...state,
      };

    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
      return {
        ...state,
        topDoctors: action.payload,
      };

    case actionTypes.FETCH_TOP_DOCTORS_FAILED:
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      return {
        ...state,
        allDoctors: action.payload,
      };

    case actionTypes.FETCH_ALL_DOCTORS_FAILED:
      return {
        ...state,
      };

    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      return {
        ...state,
        allScheduleTime: action.payload,
      };

    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
      return {
        ...state,
      };

    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
      return {
        ...state,
        allRequiredDoctorInfo: action.payload,
      };

    case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
