import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import FlagIcon from "@mui/icons-material/Flag";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import GroupIcon from "@mui/icons-material/Group";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BuildIcon from "@mui/icons-material/Build";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import BadgeIcon from "@mui/icons-material/Badge";
import FolderIcon from "@mui/icons-material/Folder";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import ListAltIcon from "@mui/icons-material/ListAlt";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PaidIcon from "@mui/icons-material/Paid";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import DescriptionIcon from "@mui/icons-material/Description";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const menuSections = [
  {
    title: "HRMS",
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
        title: "Employee",
        icon: <PeopleIcon />,
        key: "employee",
        children: [
          {
            title: "New Employee Registration",
            icon: <PersonAddIcon />,
            route: "/employees/new",
            key: "new-registration",
          },
          {
            title: "Employee Register",
            icon: <ListAltIcon />,
            route: "/employees/list",
            key: "employee-list",
          },
          {
            title: "Staff Appointment",
            icon: <BadgeIcon />,
            route: "/employees/appointment",
            key: "staff-appointment",
          },
          {
            title: "Appointment Register",
            icon: <ListAltIcon />,
            route: "/employees/appointment-list",
            key: "staff-appointment-list",
          },
        ],
      },
      {
        title: "Document",
        icon: <FlagIcon />,
        key: "document",
        children: [
          {
            title: "Document Register",
            icon: <FolderIcon />,
            route: "/documents/register",
            key: "doc-register",
          },
          {
            title: "New Document Registration",
            icon: <NoteAddIcon />,
            route: "/documents/new",
            key: "doc-new",
          },
          {
            title: "Document Summary",
            icon: <ListAltIcon />,
            route: "/documents/summary",
            key: "doc-summary",
          },
          {
            title: "Document Update Details",
            icon: <EditDocumentIcon />,
            route: "/documents/update",
            key: "doc-update",
          },
        ],
      },
      {
        title: "Leave",
        icon: <EventAvailableIcon />,
        key: "leave",
        children: [
          {
            title: "Leave Management",
            icon: <BeachAccessIcon />,
            route: "/hr/leave-management",
            key: "leave-management",
          },
        ],
      },
      {
        title: "Attendance",
        icon: <GroupIcon />,
        key: "attendance",
        children: [
          {
            title: "Timesheet",
            icon: <AccessTimeIcon />,
            route: "/hr/timesheet",
            key: "timesheet",
          },
        ],
      },
      {
        title: "Payroll",
        icon: <PaymentsIcon />,
        key: "payroll",
        children: [
          {
            title: "Payroll & Wages",
            icon: <MonetizationOnIcon />,
            route: "/hr/payroll",
            key: "payroll",
          },
          {
            title: "Final Settlement",
            icon: <PaidIcon />,
            route: "/hr/final-settlement",
            key: "final-settlement",
          },
        ],
      },
      {
        title: "Wages",
        icon: <AccountBalanceWalletIcon />,
        key: "wages",
        children: [
          {
            title: "Salary Reports",
            icon: <ReceiptLongIcon />,
            route: "/hr/salary-reports",
            key: "salary-reports",
          },
        ],
      },
      {
        title: "Reports",
        icon: <AssessmentIcon />,
        key: "reports",
        children: [
          {
            title: "Staff Details",
            icon: <DescriptionIcon />,
            route: "/hr/staff",
            key: "staff-details",
          },
          {
            title: "WPS Files",
            icon: <InsertDriveFileIcon />,
            route: "/hr/wps",
            key: "wps-files",
          },
        ],
      },
      {
        title: "Day Master",
        icon: <CalendarTodayIcon />,
        route: "/day-master",
        key: "day-master",
      },
      {
        title: "Sub Master",
        icon: <BuildIcon />,
        route: "/sub-master",
        key: "sub-master",
      },
      {
        title: "Tools",
        icon: <SettingsIcon />,
        route: "/tools",
        key: "tools",
      },
    ],
  },
];

export { menuSections };
