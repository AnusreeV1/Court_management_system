import { SETC_ID, SETL_ID, SETJ_ID, SETA_ID, FILE_CASE } from "./Action";

const initialState = {
  clientId: 11,
  lawyerId: false,
  judgeId: false,
  adminId: false,
  details: {
    client_id: "",
    court_id: "",
    case_title: "",
    case_desc: "",
    case_type: "civil",
    def_client_name: "",
    def_client_email: "",
  },
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SETC_ID:
      return { ...state, clientId: action.id };
    case SETL_ID:
      return { ...state, lawyerId: action.id };
    case SETJ_ID:
      return { ...state, judgeId: action.id };
    case SETA_ID:
      return { ...state, adminId: action.id };
    case FILE_CASE:
      return {
        ...state,
        details: {
          ...state.details,
          client_id: action.details.client_id
            ? action.details.client_id
            : state.details.client_id,
          court_id: action.details.court_id
            ? action.details.court_id
            : state.details.court_id,
          case_title: action.details.case_title
            ? action.details.case_title
            : state.details.case_title,
          case_desc: action.details.case_desc
            ? action.details.case_desc
            : state.details.case_desc,
          case_type: action.details.case_type
            ? action.details.case_type
            : state.details.case_type,
          def_client_name: action.details.def_client_name
            ? action.details.def_client_name
            : state.details.def_client_name,
          def_client_email: action.details.def_client_email
            ? action.details.def_client_email
            : state.details.def_client_email,
        },
      };
    default:
      return state;
  }
};

export default Reducer;
