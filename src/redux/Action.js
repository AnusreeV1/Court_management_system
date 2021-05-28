export const SETC_ID = "SETC_ID";
export const SETL_ID = "SETL_ID";
export const SETJ_ID = "SETJ_ID";
export const SETA_ID = "SETA_ID";
export const FILE_CASE = "FILE_CASE ";
export const file_case = (details) => {
  return { type: FILE_CASE, details: details };
};
export const setC_id = (id) => {
  return { type: SETC_ID, id: id };
};

export const setL_id = (id) => {
  return { type: SETL_ID, id: id };
};

export const setJ_id = (id) => {
  return { type: SETJ_ID, id: id };
};

export const setA_id = (id) => {
  return { type: SETA_ID, id: id };
};
