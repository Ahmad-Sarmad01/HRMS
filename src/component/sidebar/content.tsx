import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BadgeIcon from "@mui/icons-material/Badge";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ListAltIcon from "@mui/icons-material/ListAlt";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import PaymentsIcon from "@mui/icons-material/Payments";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PaidIcon from "@mui/icons-material/Paid";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const menuSections = [
  {
    title: "HR",
    icon: <PeopleAltIcon />,
    key: "hr",
    children: [
      {
        title: "Dashboard",
        icon: <DashboardIcon />,
        route: "/dashboard",
        key: "dashboard",
      },
      {
        title: "Employees",
        icon: <PeopleIcon />,
        key: "employees",
        children: [
          { 
            title: "New Employee Registration", 
            icon: <PersonAddIcon />,
            route: "/employees/new",
            key: "new-registration"
          },
          { 
            title: "Staff Appointment", 
            icon: <BadgeIcon />,
            route: "/employees/appointment",
            key: "staff-appointment"
          },
        ],
      },
      {
        title: "Documents",
        icon: <DescriptionIcon />,
        key: "documents",
        children: [
          { 
            title: "Document Register", 
            icon: <FolderIcon />,
            route: "/documents/register",
            key: "doc-register"
          },
          { 
            title: "New Document Registration", 
            icon: <NoteAddIcon />,
            route: "/documents/new",
            key: "doc-new"
          },
          { 
            title: "Document Summary", 
            icon: <ListAltIcon />,
            route: "/documents/summary",
            key: "doc-summary"
          },
          { 
            title: "Document Update Details", 
            icon: <EditDocumentIcon />,
            route: "/documents/update",
            key: "doc-update"
          },
        ],
      },
      {
        title: "HR & Payroll",
        icon: <PaymentsIcon />,
        key: "hr-payroll",
        children: [
          { 
            title: "Staff Details", 
            icon: <PeopleIcon />,
            route: "/hr/staff",
            key: "staff-details"
          },
          { 
            title: "Visa & Passport", 
            icon: <CreditCardIcon />,
            route: "/hr/visa-passport",
            key: "visa-passport"
          },
          { 
            title: "Timesheet", 
            icon: <QueryBuilderIcon />,
            route: "/hr/timesheet",
            key: "timesheet"
          },
          { 
            title: "Payroll & Wages", 
            icon: <PaymentsIcon />,
            route: "/hr/payroll",
            key: "payroll"
          },
          { 
            title: "Leave Management", 
            icon: <CalendarMonthIcon />,
            route: "/hr/leave-management",
            key: "leave-management"
          },
          { 
            title: "Salary Reports", 
            icon: <AssessmentIcon />,
            route: "/hr/salary-reports",
            key: "salary-reports"
          },
          { 
            title: "WPS Files", 
            icon: <InsertDriveFileIcon />,
            route: "/hr/wps",
            key: "wps-files"
          },
          { 
            title: "Final Settlement", 
            icon: <PaidIcon />,
            route: "/hr/final-settlement",
            key: "final-settlement"
          },
        ],
      },
    ],
  },
];

export { menuSections };