// Types for different card data
export interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
  joinDate: string;
  status: 'Active' | 'On Leave' | 'Inactive';
}

export interface ExpiredDocument {
  id: number;
  docName: string;
  employee: string;
  expiryDate: string;
  status: 'Critical' | 'Expiring Soon' | 'Normal';
}

export interface VisaExpiry {
  id: number;
  employee: string;
  visaType: string;
  issueDate: string;
  expiryDate: string;
  status: 'Critical' | 'Expiring Soon' | 'Normal';
}

export interface LeaveRequest {
  id: number;
  employee: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  days: number;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface PayrollPending {
  id: number;
  employee: string;
  department: string;
  amount: string;
  month: string;
  status: 'Pending' | 'Processing' | 'Completed';
}

export interface WPSFile {
  id: number;
  fileName: string;
  month: string;
  employees: number;
  totalAmount: string;
  status: 'Pending' | 'Processing' | 'Submitted';
}

// Dummy data for Total Employees
export const totalEmployeesData: Employee[] = [
  {
    id: 1,
    name: "John Doe",
    department: "Engineering",
    position: "Senior Developer",
    joinDate: "2023-01-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    department: "HR",
    position: "HR Manager",
    joinDate: "2022-06-20",
    status: "Active",
  },
  {
    id: 3,
    name: "Ahmed Hassan",
    department: "Finance",
    position: "Accountant",
    joinDate: "2023-03-10",
    status: "Active",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    department: "Marketing",
    position: "Marketing Specialist",
    joinDate: "2023-08-05",
    status: "On Leave",
  },
  {
    id: 5,
    name: "Michael Brown",
    department: "Operations",
    position: "Operations Manager",
    joinDate: "2022-11-12",
    status: "Active",
  },
  {
    id: 6,
    name: "Emily Davis",
    department: "Engineering",
    position: "Junior Developer",
    joinDate: "2024-02-01",
    status: "Active",
  },
  {
    id: 7,
    name: "David Lee",
    department: "Sales",
    position: "Sales Executive",
    joinDate: "2023-05-18",
    status: "Active",
  },
  {
    id: 8,
    name: "Lisa Chen",
    department: "Finance",
    position: "Financial Analyst",
    joinDate: "2023-09-25",
    status: "Active",
  },
];

// Dummy data for Documents Expiring Soon
export const expiredDocumentsData: ExpiredDocument[] = [
  {
    id: 1,
    docName: "Passport",
    employee: "John Doe",
    expiryDate: "2025-02-15",
    status: "Expiring Soon",
  },
  {
    id: 2,
    docName: "Work Visa",
    employee: "Jane Smith",
    expiryDate: "2025-01-20",
    status: "Critical",
  },
  {
    id: 3,
    docName: "Medical Certificate",
    employee: "Ahmed Hassan",
    expiryDate: "2025-03-10",
    status: "Expiring Soon",
  },
  {
    id: 4,
    docName: "Emirates ID",
    employee: "Sarah Wilson",
    expiryDate: "2025-02-28",
    status: "Expiring Soon",
  },
  {
    id: 5,
    docName: "Travel Permit",
    employee: "Michael Brown",
    expiryDate: "2025-01-15",
    status: "Critical",
  },
  {
    id: 6,
    docName: "Labor Card",
    employee: "Emily Davis",
    expiryDate: "2025-04-05",
    status: "Expiring Soon",
  },
  {
    id: 7,
    docName: "Driving License",
    employee: "David Lee",
    expiryDate: "2025-01-25",
    status: "Critical",
  },
];

// Dummy data for Visa Expiry This Month
export const visaExpiryData: VisaExpiry[] = [
  {
    id: 1,
    employee: "Jane Smith",
    visaType: "Employment Visa",
    issueDate: "2023-01-20",
    expiryDate: "2025-01-20",
    status: "Critical",
  },
  {
    id: 2,
    employee: "Michael Brown",
    visaType: "Employment Visa",
    issueDate: "2023-01-15",
    expiryDate: "2025-01-15",
    status: "Critical",
  },
  {
    id: 3,
    employee: "David Lee",
    visaType: "Work Permit",
    issueDate: "2023-01-10",
    expiryDate: "2025-01-10",
    status: "Critical",
  },
  {
    id: 4,
    employee: "Ahmed Hassan",
    visaType: "Employment Visa",
    issueDate: "2022-12-28",
    expiryDate: "2024-12-28",
    status: "Critical",
  },
  {
    id: 5,
    employee: "Lisa Chen",
    visaType: "Residence Visa",
    issueDate: "2022-12-25",
    expiryDate: "2024-12-25",
    status: "Critical",
  },
];

// Dummy data for Pending Leave Requests
export const leaveRequestsData: LeaveRequest[] = [
  {
    id: 1,
    employee: "Sarah Wilson",
    leaveType: "Annual Leave",
    fromDate: "2025-01-10",
    toDate: "2025-01-20",
    days: 10,
    status: "Pending",
  },
  {
    id: 2,
    employee: "John Doe",
    leaveType: "Sick Leave",
    fromDate: "2025-01-05",
    toDate: "2025-01-07",
    days: 3,
    status: "Pending",
  },
  {
    id: 3,
    employee: "Emily Davis",
    leaveType: "Annual Leave",
    fromDate: "2025-02-01",
    toDate: "2025-02-14",
    days: 14,
    status: "Pending",
  },
  {
    id: 4,
    employee: "Ahmed Hassan",
    leaveType: "Emergency Leave",
    fromDate: "2025-01-08",
    toDate: "2025-01-10",
    days: 3,
    status: "Pending",
  },
  {
    id: 5,
    employee: "David Lee",
    leaveType: "Annual Leave",
    fromDate: "2025-03-15",
    toDate: "2025-03-25",
    days: 10,
    status: "Pending",
  },
  {
    id: 6,
    employee: "Lisa Chen",
    leaveType: "Maternity Leave",
    fromDate: "2025-02-01",
    toDate: "2025-04-30",
    days: 90,
    status: "Pending",
  },
];

// Dummy data for Payroll Pending
export const payrollPendingData: PayrollPending[] = [
  {
    id: 1,
    employee: "Michael Brown",
    department: "Operations",
    amount: "AED 15,000",
    month: "December 2024",
    status: "Pending",
  },
  {
    id: 2,
    employee: "Jane Smith",
    department: "HR",
    amount: "AED 12,500",
    month: "December 2024",
    status: "Processing",
  },
  {
    id: 3,
    employee: "Ahmed Hassan",
    department: "Finance",
    amount: "AED 10,800",
    month: "December 2024",
    status: "Pending",
  },
];

// Dummy data for WPS Pending Files
export const wpsPendingFilesData: WPSFile[] = [
  {
    id: 1,
    fileName: "WPS_December_2024.csv",
    month: "December 2024",
    employees: 248,
    totalAmount: "AED 2,850,000",
    status: "Pending",
  },
  {
    id: 2,
    fileName: "WPS_November_2024.csv",
    month: "November 2024",
    employees: 245,
    totalAmount: "AED 2,800,000",
    status: "Processing",
  },
  {
    id: 3,
    fileName: "WPS_October_2024_Revised.csv",
    month: "October 2024",
    employees: 240,
    totalAmount: "AED 2,750,000",
    status: "Pending",
  },
  {
    id: 4,
    fileName: "WPS_September_2024.csv",
    month: "September 2024",
    employees: 238,
    totalAmount: "AED 2,720,000",
    status: "Submitted",
  },
];

// Card type mapping
export type CardType = 
  | "Total Employees"
  | "Documents Expiring Soon"
  | "Visa Expiry This Month"
  | "Pending Leave Requests"
  | "Payroll Pending"
  | "WPS Pending Files";

// Data getter function
export const getCardData = (cardTitle: CardType) => {
  switch (cardTitle) {
    case "Total Employees":
      return totalEmployeesData;
    case "Documents Expiring Soon":
      return expiredDocumentsData;
    case "Visa Expiry This Month":
      return visaExpiryData;
    case "Pending Leave Requests":
      return leaveRequestsData;
    case "Payroll Pending":
      return payrollPendingData;
    case "WPS Pending Files":
      return wpsPendingFilesData;
    default:
      return [];
  }
};
