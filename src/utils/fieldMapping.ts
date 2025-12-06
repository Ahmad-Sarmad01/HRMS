import { EmployeeFormData } from "../types/employee";

// Map form field names to API field names
export const fieldNameMapping: Record<string, keyof EmployeeFormData> = {
  // Primary Form Fields
  staffCode: "staff_Code",
  staffName: "staff_Name",
  status: "status",
  branch: "branch",
  joiningDate: "joining_Date",
  designation: "designation",
  subStatus: "sub_Status",
  department: "department",
  employeeCategory: "employee_Category",
  nationality: "nationality",
  uaeMobileNo: "uaE_Mobile_No",
  personalEmail: "personal_Email",
  officialEmail: "official_Email",
  arabicName: "arabic_Name",
  uploadPhotoName: "upload_Photo_Name",
  
  // Official Form Fields
  dateOfBirth: "date_Of_Birth",
  age: "age",
  gender: "gender",
  visaType: "visa_Type",
  section: "section",
  visaSponsor: "visa_Sponsor",
  employmentType: "employment_Type",
  lineManager1: "line_Manager1",
  lineManager2: "line_Manager2",
  probationDays: "probation_Days",
  probationEndDate: "probation_End_Date",
  visaDesignation: "visa_Designation",
  resignationDate: "resignation_Date",
  noticePeriod: "notice_Period",
  lastWorkingDate: "last_Working_Date",
  adekStatus: "adeK_Status",
  adekDesignation: "adeK_Designation",
  currentGrade: "current_Grade",
  contractExpiryDate: "contract_Expiry_Date",
  modifiedBy: "modified_By",
  modifiedDate: "modified_Date",
  labourCardStatus: "labour_Card_Status",
  speciality: "specialty",
  position: "position",
  additionalResponsibility: "add_Responsibility",
  rfid: "rfid",
  religion: "religion",
  emiratesIdNo: "emiratesID_No",
  emiratesIdExpiryDate: "emiratesID_Expiry_Date",
  moeRegistrationNo: "moE_Registration_No",
  approvedFor: "approved_For",
  tlsStatus: "tlS_Status",
  tlsExpiryDate: "tlS_Expiry_Date",
  seniorityNo: "seniority_No",
  actualJoiningDate: "actual_Joining_Date",
  remarks: "remarks",
  signature: "signature",
  idCard: "iD_Card",
  companyID: "companyID",
};

// Convert form data to API format
export const convertToAPIFormat = (formData: Record<string, any>): Partial<EmployeeFormData> => {
  const apiData: any = {};
  
  Object.entries(formData).forEach(([key, value]) => {
    const apiKey = fieldNameMapping[key] || key;
    // Only include fields that have values
    if (value !== undefined && value !== null && value !== "") {
      apiData[apiKey] = value;
    }
  });
  
  return apiData;
};

// Get default values for the form
export const getDefaultFormValues = (): Partial<Record<keyof typeof fieldNameMapping, string>> => {
  return {
    staffCode: "",
    staffName: "",
    status: "",
    branch: "",
    joiningDate: "",
    designation: "",
    subStatus: "",
    department: "",
    employeeCategory: "",
    nationality: "",
    uaeMobileNo: "",
    personalEmail: "",
    officialEmail: "",
    arabicName: "",
    uploadPhotoName: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    visaType: "",
    section: "",
    visaSponsor: "",
    employmentType: "",
    lineManager1: "",
    lineManager2: "",
    probationDays: "",
    probationEndDate: "",
    visaDesignation: "",
    resignationDate: "",
    noticePeriod: "",
    lastWorkingDate: "",
    adekStatus: "",
    adekDesignation: "",
    currentGrade: "",
    contractExpiryDate: "",
    modifiedBy: "",
    modifiedDate: "",
    labourCardStatus: "",
    speciality: "",
    position: "",
    additionalResponsibility: "",
    rfid: "",
    religion: "",
    emiratesIdNo: "",
    emiratesIdExpiryDate: "",
    moeRegistrationNo: "",
    approvedFor: "",
    tlsStatus: "",
    tlsExpiryDate: "",
    seniorityNo: "",
    actualJoiningDate: "",
    remarks: "",
    signature: "",
    idCard: "",
    companyID: "",
  };
};
