import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../appLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import EmployeeRegistration from "../pages/employee/Registration";
import StaffAppointment from "../pages/employee/StaffAppointment";
import DocumentRegister from "../pages/documents/DocumentRegister";
import NewDocument from "../pages/documents/NewDocument";
import DocumentSummary from "../pages/documents/DocumentSummary";
import DocumentUpdate from "../pages/documents/DocumentUpdate";
import StaffDetails from "../pages/hr/StaffDetails";
import VisaPassport from "../pages/hr/VisaPassport";
import Timesheet from "../pages/hr/Timesheet";
import Payroll from "../pages/hr/Payroll";
import LeaveManagement from "../pages/hr/LeaveManagement";
import SalaryReports from "../pages/hr/SalaryReports";
import WPSFiles from "../pages/hr/WPSFiles";
import FinalSettlement from "../pages/hr/FinalSettlement";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Employees Routes */}
          <Route path="/employees/new" element={<EmployeeRegistration />} />
          <Route path="/employees/appointment" element={<StaffAppointment />} />
          
          {/* Documents Routes */}
          <Route path="/documents/register" element={<DocumentRegister />} />
          <Route path="/documents/new" element={<NewDocument />} />
          <Route path="/documents/summary" element={<DocumentSummary />} />
          <Route path="/documents/update" element={<DocumentUpdate />} />
          
          {/* HR & Payroll Routes */}
          <Route path="/hr/staff" element={<StaffDetails />} />
          <Route path="/hr/visa-passport" element={<VisaPassport />} />
          <Route path="/hr/timesheet" element={<Timesheet />} />
          <Route path="/hr/payroll" element={<Payroll />} />
          <Route path="/hr/leave-management" element={<LeaveManagement />} />
          <Route path="/hr/salary-reports" element={<SalaryReports />} />
          <Route path="/hr/wps" element={<WPSFiles />} />
          <Route path="/hr/final-settlement" element={<FinalSettlement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
