export const BASE_URL = "http://localhost:5000";

export const API_PATHS = {
  AUTH: {
    LOGIN: "api/auth/login",
    REGISTER: "api/auth/register",
    GET_USER_INFO: "api/auth/getUser",
  },
  DASHBOARD: {
    GET_DASHBOARD_DATA: "api/dashboard",
  },
  INCOME: {
    ADD_INCOME: "api/income/add",
    GET_ALL_INCOME: "api/income/getAll",
    DELETE_INCOME: (incomeId) => `api/income/delete/${incomeId}`
    ,
    DOWNLOAD_INCOME_EXCEL: "api/income/downloadIncomeExcel",
  },
  EXPENSE: {
    GET_EXPENSE: "api/expense/getAll",
    ADD_EXPENSE: "api/expense/add",
    DELETE_EXPENSE: (expenseId) => `api/expense/delete/${expenseId}`,
    DOWNLOAD_EXPENSE_EXCEL: "api/expense/downloadExpenseExcel",
  },
  IMAGE: {
    UPLOAD_IMAGE: "api/auth/upload-image",
    
  }
};