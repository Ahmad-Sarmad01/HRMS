import { EmployeeFormData } from "../types/employee";

// Map frontend form fields to backend API fields
export const fieldNameMapping: Record<string, keyof EmployeeFormData> = {
  // ======== Primary Info Form ========
  staffName: "staff_Name",
  staffCode: "staff_Code",
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

  // ======== Official Info Form ========
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
  specialty: "specialty",
  position: "position",
  addResponsibility: "add_Responsibility",
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

  // ======== Personal Info Form ========
  // Address
  flatNoBuildingName: "flat_No_Building_Name",
  streetName: "street_Name",
  uaePhoneNo: "uaE_Phone_No",
  area: "area",
  emirates: "emirates",
  poBox: "poBox",
  isApprover: "isApprover",

  // Home Country Address
  homeAddress1: "address1",
  homeAddress2: "address2",
  homeCountry: "country",
  homeContactName: "home_Contact_Name",
  homeCountryContact: "home_Country_Contact",

  // Emergency Contact
  emergencyName: "emergency_Name",
  emergencyMobile: "emergency_Mob",
  emergencyAddress: "emergency_Address",
  emergencyRelation: "emergency_Relation",

  // Additional Information
  maritalStatus: "marital_Status",
  bloodGroup: "blood_Group",
  placeOfBirth: "place_Of_Birth",
  countryOfBirth: "country_Of_Birth",

  // Provisioning
  gratuityAs: "gratuity_A_c",
  gratuityStartDate: "gratuity_Start_Date",
  gratuityEndDate: "gratuity_End_Date",
  leaveSalaryAs: "leave_Salary_A_c",
  insuranceAs: "insurance_A_c",
  ticketAs: "ticket_A_c",

  // ======== Finance Form ========
  paymentType: "payment_Type",
  paymentMode: "payment_Mode",
  bankSwiftCode: "bank_Swift_Code",
  molNumber: "moL_Number",
  routingCode: "routing_Code",
  salaryMode: "salary_Mode",
  leaveSalary: "leave_Salary",
  leavePerYear: "leave_Per_Year",
  ticketEligibility: "ticket_Eligibility",
  loanAccount: "loan_Account",
  accountGroup: "account_Group",
  ticketPaymentMode: "ticket_payment_Mode",
  financialRemarks: "financial_Remarks",
  excludeFromPayroll: "exclude_From_Payroll",

  // ======== Payroll Form ========
  // Salary
  basicSalary: "basic_Salary",
  ministrySalary: "ministry_Salary",
  grossSalary: "gross_Salary",

  // ======== Others Form ========
  // Extra Details
  staffNameAsPerPassport: "staff_Name_AS_Per_Passport",
  firstName: "first_Name",
  middleName: "middle_Name",
  lastName: "last_Name",
  terminalBenefitsNominee: "terminal_Benefit_Nominees",
  contractType: "contract_Type",
  nomineeRelation: "nominee_Relation",
  leaveCategory: "leave_Category",
  rateIncrementByPercent: "rate_Increment_By_Percent",
  periodsPerWeek: "period_Per_Week",
  childTuition: "child_Tution",
  memo: "memo",
  machineId: "machine_ID",
  attendanceShift: "attendance_Shift",
  employeeBranch: "employee_Branch",
  specialRecognition: "special_Recognition",
  airTicketSector: "air_Ticket_Sector",
  ticketCount: "ticket_Count",
  directReportingTo: "direct_Reporting",
  noOfChildrenForTuition: "no_of_Child_for_Tution",
  replacement: "replacement",
  programLeader: "program_Leader",
  equivalency: "equlvalency",

  // Benefits
  transportation: "transportation",
  insuranceEligibility: "insurance_Eligibility",
  insuranceProvider: "insurance_Provider",
  schoolAccommodationProvided: "accomodation_Provided",
  insuranceCategory: "insurance_Category",
  ticketAmount: "ticket_Amount",
  insuranceAmount: "insurance_Amount",
  pensionAccount: "pension_Account",
  pensionCategory: "pension_Category",
  pension: "pension",
  iloeDetails: "iloE_details",
  insuranceNo: "insurance_No",
  insuranceExpDate: "insurance_Expiry_Date",

  // Cancellation Details
  visaCancelled: "visa_Cancelled",
  labourCardCancelled: "labour_Card_Cancelled",
  visaCancelledDate: "visa_Cancellation_Date",
  labourCardCancelledDate: "labour_Card_Cancellation_Date",

  // Remaining fields
  idCard: "iD_Card",
  companyID: "companyID",
};

// Converts frontend form data to backend API format
export const convertToAPIFormat = (formData: Record<string, any>): any => {
  const apiData: any = {};

  const flatten = (obj: any) => {
    Object.entries(obj).forEach(([key, value]) => {
      const apiKey = fieldNameMapping[key] || key;

      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value) &&
        !(value instanceof File) // Don't flatten File objects
      ) {
        flatten(value);
      } else {
        // Convert boolean values to "Yes"/"No" strings
        if (typeof value === "boolean") {
          apiData[apiKey] = value ? "Yes" : "No";
        } else if (value instanceof File) {
          // Handle File objects separately
          apiData.uploadPhotoFile = value;
          apiData[apiKey] = value.name;
        } else {
          apiData[apiKey] = value ?? "";
        }
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

  // Add required 'request' field
  apiData.request = "employee_registration";

  return apiData;
};

// Converts backend API data to frontend form format
export const convertFromAPIFormat = (apiData: any): Record<string, any> => {
  const formData: Record<string, any> = {};
  const reverseMapping: Record<string, string> = {};

  Object.entries(fieldNameMapping).forEach(([frontend, backend]) => {
    reverseMapping[backend as string] = frontend;
  });

  Object.entries(apiData).forEach(([key, value]) => {
    const frontendKey = reverseMapping[key] || key;

    // Convert "Yes"/"No" strings back to boolean
    if (value === "Yes" || value === "No") {
      formData[frontendKey] = value === "Yes";
    } else {
      formData[frontendKey] = value ?? "";
    }
  });

  return formData;
};

// Fields that should have "0.00" as default (numeric and ID fields)
const numericFields = [
  // Numeric fields
  "age",
  "probationDays",
  "basicSalary",
  "ministrySalary",
  "grossSalary",
  "leavePerYear",
  "rateIncrementByPercent",
  "periodsPerWeek",
  "ticketCount",
  "noOfChildrenForTuition",
  "transportation",
  "ticketAmount",
  "insuranceAmount",
  "pension",
  "noticePeriod",
  "seniorityNo",

  // ID and code fields
  "staffCode",
  "uaeMobileNo",
  "uaePhoneNo",
  "rfid",
  "emiratesIdNo",
  "moeRegistrationNo",
  "molNumber",
  "routingCode",
  "machineId",
  "insuranceNo",
  "companyID",
];

// Returns default form values with numeric/ID fields set to "0.00" and others (including dates) to empty strings
export const getDefaultFormValues = (): Record<string, any> => {
  const defaults: Record<string, any> = {};
  Object.keys(fieldNameMapping).forEach((key) => {
    defaults[key] = numericFields.includes(key) ? "0.00" : "";
  });
  // Add file field with null default
  defaults.uploadPhotoFile = null;
  return defaults;
};
