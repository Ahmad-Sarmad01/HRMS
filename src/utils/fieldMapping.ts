import { EmployeeFormData } from "../types/employee";

// Map frontend form fields to backend API fields
export const fieldNameMapping: Record<string, keyof EmployeeFormData> = {
  // Primary Info
  employeeName: "staff_Name",
  staffCode: "staff_Code",
  branch: "branch",
  department: "department",
  personalEmail: "personal_Email",
  nationalityCountry: "nationality",
  religion: "religion",
  maritalStatus: "sub_Status",
  uaeMobileNo: "uaE_Mobile_No",

  // Official Info
  designation: "designation",
  joiningDate: "joining_Date",
  employeeCategory: "employee_Category",
  officialEmail: "official_Email",
  status: "status",
  employmentType: "employment_Type",
  probationDays: "probation_Days",
  resignationDate: "resignation_Date",
  adekStatus: "adeK_Status",
  adekDesignation: "adeK_Designation",
  contractExpiryDate: "contract_Expiry_Date",
  labourCardStatus: "labour_Card_Status",
  addResponsibility: "add_Responsibility",
  lineManager1: "line_Manager1",
  lineManager2: "line_Manager2",
  probationEndDate: "probation_End_Date",
  noticePeriod: "notice_Period",
  currentGrade: "current_Grade",
  position: "position",
  specialty: "specialty",
  rfid: "rfid",

  // Personal Info
  arabicName: "arabic_Name",
  uploadPhotoName: "upload_Photo_Name",
  idCard: "iD_Card",
  dateOfBirth: "date_Of_Birth",
  emiratesIdNo: "emiratesID_No",
  emiratesIdExpiryDate: "emiratesID_Expiry_Date",
  actualJoiningDate: "actual_Joining_Date",
  gender: "gender",
  visaSponsor: "visa_Sponsor",
  visaDesignation: "visa_Designation",
  lastWorkingDate: "last_Working_Date",
  modifiedBy: "modified_By",
  modifiedDate: "modified_Date",
  tlsStatus: "tlS_Status",
  tlsExpiryDate: "tlS_Expiry_Date",
  remarks: "remarks",
  signature: "signature",
  moeRegistrationNo: "moE_Registration_No",
  companyID: "companyID",
  age: "age",
  visaType: "visa_Type",
  section: "section",
  approvedFor: "approved_For",
  seniorityNo: "seniority_No",
};

// Converts frontend form data to backend API format
export const convertToAPIFormat = (formData: Record<string, any>): any => {
  const apiData: any = {};

  const flatten = (obj: any) => {
    Object.entries(obj).forEach(([key, value]) => {
      const apiKey = fieldNameMapping[key] || key;

      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        flatten(value);
      } else {
        apiData[apiKey] = value ?? "";
      }
    });
  };

  flatten(formData);

  // Ensure all API keys exist
  for (const apiKey of Object.values(fieldNameMapping)) {
    if (!(apiKey in apiData)) {
      apiData[apiKey] = "";
    }
  }

  return apiData;
};

// Default values for the form
export const getDefaultFormValues = (): Partial<Record<keyof typeof fieldNameMapping, string>> => {
  return {
    employeeName: "",
    staffCode: "",
    branch: "",
    department: "",
    personalEmail: "",
    nationalityCountry: "",
    religion: "",
    maritalStatus: "",
    uaeMobileNo: "",
    designation: "",
    joiningDate: "",
    employeeCategory: "",
    officialEmail: "",
    status: "",
    employmentType: "",
    probationDays: "",
    resignationDate: "",
    adekStatus: "",
    adekDesignation: "",
    contractExpiryDate: "",
    labourCardStatus: "",
    addResponsibility: "",
    lineManager1: "",
    lineManager2: "",
    probationEndDate: "",
    noticePeriod: "",
    currentGrade: "",
    position: "",
    specialty: "",
    rfid: "",
    arabicName: "",
    uploadPhotoName: "",
    idCard: "",
    dateOfBirth: "",
    emiratesIdNo: "",
    emiratesIdExpiryDate: "",
    actualJoiningDate: "",
    gender: "",
    visaSponsor: "",
    visaDesignation: "",
    lastWorkingDate: "",
    modifiedBy: "",
    modifiedDate: "",
    tlsStatus: "",
    tlsExpiryDate: "",
    remarks: "",
    signature: "",
    moeRegistrationNo: "",
    companyID: "",
    age: "",
    visaType: "",
    section: "",
    approvedFor: "",
    seniorityNo: "",
  };
};
