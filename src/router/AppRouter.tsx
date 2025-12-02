import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../appLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import EmployeeRegistration from "../pages/employee/Registration";
import StaffAppointment from "../pages/employee/StaffAppointment";
import DocumentRegister from "../pages/documents/DocumentRegister";
import NewDocument from "../pages/documents/NewDocument";
import DocumentSummary from "../pages/documents/DocumentSummary";
import DocumentUpdate from "../pages/documents/DocumentUpdate";
import StaffDetails from "../pages/reports/StaffDetails";
import Timesheet from "../pages/attendance/Timesheet";
import Payroll from "../pages/payroll/Payroll";
import LeaveManagement from "../pages/leave/LeaveManagement";
import SalaryReports from "../pages/wages/SalaryReports";
import WPSFiles from "../pages/reports/WPSFiles";
import FinalSettlement from "../pages/payroll/FinalSettlement";
import DayMaster from "../pages/dayMaster/DayMaster";
import SubMaster from "../pages/subMaster/SubMaster";
import Tools from "../pages/tools/Tools";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Employee Routes */}
          <Route path="/employees/new" element={<EmployeeRegistration />} />
          <Route path="/employees/appointment" element={<StaffAppointment />} />
          
          {/* Document Routes */}
          <Route path="/documents/register" element={<DocumentRegister />} />
          <Route path="/documents/new" element={<NewDocument />} />
          <Route path="/documents/summary" element={<DocumentSummary />} />
          <Route path="/documents/update" element={<DocumentUpdate />} />
          
          {/* Leave Routes */}
          <Route path="/hr/leave-management" element={<LeaveManagement />} />
          
          {/* Attendance Routes */}
          <Route path="/hr/timesheet" element={<Timesheet />} />
          
          {/* Payroll Routes */}
          <Route path="/hr/payroll" element={<Payroll />} />
          <Route path="/hr/final-settlement" element={<FinalSettlement />} />
          
          {/* Wages Routes */}
          <Route path="/hr/salary-reports" element={<SalaryReports />} />
          
          {/* Reports Routes */}
          <Route path="/hr/staff" element={<StaffDetails />} />
          <Route path="/hr/wps" element={<WPSFiles />} />
          
          {/* Day Master */}
          <Route path="/day-master" element={<DayMaster />} />
          
          {/* Sub Master */}
          <Route path="/sub-master" element={<SubMaster />} />
          
          {/* Tools */}
          <Route path="/tools" element={<Tools />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
